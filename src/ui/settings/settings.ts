import { App, Modal, Setting } from "obsidian";
import type { SettingValues } from "./settings_store";
import {
	VisibilityOption,
	ScopeOption,
	defaultSettings,
} from "../settings/settings_store";
import { z } from "zod";
import { DEFAULT_DONE_STATUS_MARKERS, DEFAULT_IGNORED_STATUS_MARKERS, validateDoneStatusMarkers, validateIgnoredStatusMarkers } from "../tasks/task";

const VisibilityOptionSchema = z.nativeEnum(VisibilityOption);
const ScopeOptionSchema = z.nativeEnum(ScopeOption);

/**
 * Validates a folder path for exclusion
 * @param folderPath The folder path to validate
 * @returns Error message if invalid, null if valid
 */
function validateFolderPath(folderPath: string): string | null {
	if (!folderPath || folderPath.trim().length === 0) {
		return null; // Empty is allowed, will be handled by "Add Folder" button
	}

	const trimmed = folderPath.trim();

	// Check for invalid characters
	if (trimmed.includes('..') || trimmed.includes('\\')) {
		return "Folder path cannot contain '..' or backslashes";
	}

	// Check for leading/trailing slashes (we'll normalize them)
	if (trimmed.startsWith('/') || trimmed.endsWith('/')) {
		// This is OK, we'll normalize it
	}

	// Check for extremely long paths
	if (trimmed.length > 255) {
		return "Folder path is too long (max 255 characters)";
	}

	// Check for reserved names (Windows)
	const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];
	const nameParts = trimmed.toUpperCase().split('/');
	for (const part of nameParts) {
		if (reservedNames.includes(part)) {
			return `Cannot exclude reserved folder name: ${part}`;
		}
	}

	return null; // Valid
}

export class SettingsModal extends Modal {
	constructor(
		app: App,
		private settings: SettingValues,
		private readonly onSubmit: (newSettings: SettingValues) => void
	) {
		super(app);
	}

	onOpen() {
		this.contentEl.createEl("h1", { text: "Settings" });

		new Setting(this.contentEl)
			.setName("Columns")
			.setDesc('The column names separated by a comma ","')
			.setClass("column")
			.addText((text) => {
				text.setValue(this.settings.columns.join(", "));
				text.onChange((value) => {
					this.settings.columns = value
						.split(",")
						.map((column) => column.trim());
				});
			});

		new Setting(this.contentEl)
			.setName("Folder scope")
			.setDesc("Where should we try to find tasks for this Kanban?")
			.addDropdown((dropdown) => {
				dropdown.addOption(ScopeOption.Folder, "This folder");
				dropdown.addOption(ScopeOption.Everywhere, "Every folder");
				dropdown.setValue(this.settings.scope);
				dropdown.onChange((value) => {
					const validatedValue = ScopeOptionSchema.safeParse(value);
					this.settings.scope = validatedValue.success
						? validatedValue.data
						: defaultSettings.scope;
				});
			});

		new Setting(this.contentEl)
			.setName("Show filepath")
			.setDesc("Show the filepath on each task in Kanban?")
			.addToggle((toggle) => {
				toggle.setValue(this.settings.showFilepath ?? true);
				toggle.onChange((value) => {
					this.settings.showFilepath = value;
				});
			});

		new Setting(this.contentEl)
			.setName("Uncategorized column visibility")
			.setDesc("When to show the Uncategorized column")
			.addDropdown((dropdown) => {
				dropdown
					.addOption(VisibilityOption.AlwaysShow, "Always show")
					.addOption(VisibilityOption.Auto, "Hide when empty")
					.addOption(VisibilityOption.NeverShow, "Never show")
					.setValue(
						this.settings.uncategorizedVisibility ??
							VisibilityOption.Auto
					)
					.onChange((value) => {
						const validatedValue =
							VisibilityOptionSchema.safeParse(value);
						this.settings.uncategorizedVisibility =
							validatedValue.success
								? validatedValue.data
								: defaultSettings.uncategorizedVisibility;
					});
			});

		new Setting(this.contentEl)
			.setName("Done column visibility")
			.setDesc("When to show the Done column")
			.addDropdown((dropdown) => {
				dropdown
					.addOption(VisibilityOption.AlwaysShow, "Always show")
					.addOption(VisibilityOption.Auto, "Hide when empty")
					.addOption(VisibilityOption.NeverShow, "Never show")
					.setValue(
						this.settings.doneVisibility ?? VisibilityOption.Auto
					)
					.onChange((value) => {
						const validatedValue =
							VisibilityOptionSchema.safeParse(value);
						this.settings.doneVisibility = validatedValue.success
							? validatedValue.data
							: defaultSettings.doneVisibility;
					});
			});

		new Setting(this.contentEl)
			.setName("Consolidate tags")
			.setDesc(
				"Consolidate the tags on each task in Kanban into the footer?"
			)
			.addToggle((toggle) => {
				toggle.setValue(this.settings.consolidateTags ?? false);
				toggle.onChange((value) => {
					this.settings.consolidateTags = value;
				});
			});

		new Setting(this.contentEl)
			.setName("Done status markers")
			.setDesc(
				"Characters that mark a task as done (e.g., 'xX' for [x] and [X]). Each character should be a single Unicode character without spaces."
			)
			.addText((text) => {
				text.setValue(this.settings.doneStatusMarkers ?? DEFAULT_DONE_STATUS_MARKERS);
				text.onChange((value) => {
					// Validate the input and provide immediate feedback
					const errors = validateDoneStatusMarkers(value);
					if (errors.length > 0) {
						text.inputEl.style.borderColor = "var(--text-error)";
						text.inputEl.title = `Invalid: ${errors.join(', ')}`;
					} else {
						text.inputEl.style.borderColor = "";
						text.inputEl.title = "Valid done status markers";
						this.settings.doneStatusMarkers = value;
					}
				});
			});

		new Setting(this.contentEl)
			.setName("Ignored status markers")
			.setDesc(
				"Characters that mark tasks to be completely ignored by the kanban (e.g., '-' for [-] cancelled tasks). Leave empty to process all task-like strings. Each character should be a single Unicode character without spaces."
			)
			.addText((text) => {
				text.setValue(this.settings.ignoredStatusMarkers ?? DEFAULT_IGNORED_STATUS_MARKERS);
				text.onChange((value) => {
					// Validate the input and provide immediate feedback
					const errors = validateIgnoredStatusMarkers(value);
					if (errors.length > 0) {
						text.inputEl.style.borderColor = "var(--text-error)";
						text.inputEl.title = `Invalid: ${errors.join(', ')}`;
					} else {
						text.inputEl.style.borderColor = "";
						text.inputEl.title = "Valid ignored status markers";
						this.settings.ignoredStatusMarkers = value;
					}
				});
			});

		// Excluded folders setting - only show when scope is "Everywhere"
		let excludedFoldersContainer: HTMLElement | null = null;
		let excludedFoldersSetting: Setting | null = null;

		// Create the setting but initially hide it
		excludedFoldersSetting = new Setting(this.contentEl)
			.setName("Excluded folders")
			.setDesc("Folders to exclude when showing tasks from every folder. Only applies when folder scope is set to 'Every folder'.")
			.addText((text) => {
				text.setPlaceholder("Enter folder path...");
				text.inputEl.addEventListener('input', (e) => {
					// Store the current value for adding when button is clicked
					const target = e.target as HTMLInputElement;
					const folderPath = target.value.trim();

					// Validate folder path
					const validationError = validateFolderPath(folderPath);
					if (validationError) {
						target.style.borderColor = "var(--text-error)";
						target.title = validationError;
					} else {
						target.style.borderColor = "";
						target.title = "";
					}

					target.setAttribute("data-folder-to-add", folderPath);
				});
			})
			.addButton((btn) => {
				btn.setButtonText("Add Folder");
				btn.buttonEl.addEventListener('click', () => {
					const textInput = excludedFoldersSetting?.controlEl.querySelector('input[type="text"]') as HTMLInputElement;
					const folderToAdd = textInput?.getAttribute("data-folder-to-add")?.trim();

					if (folderToAdd && folderToAdd.length > 0) {
						// Validate the folder path before adding
						const validationError = validateFolderPath(folderToAdd);
						if (validationError) {
							// Show validation error to user
							textInput.style.borderColor = "var(--text-error)";
							textInput.title = validationError;
							return;
						}

						// Normalize folder path (remove leading/trailing slashes, deduplicate)
						const normalizedFolder = folderToAdd.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');

						if (normalizedFolder && !this.settings.excludedFolders?.includes(normalizedFolder)) {
							this.settings.excludedFolders = [...(this.settings.excludedFolders ?? []), normalizedFolder];
							if (textInput) {
								textInput.value = "";
								textInput.removeAttribute("data-folder-to-add");
								textInput.style.borderColor = "";
								textInput.title = "";
							}
							updateExcludedFoldersList();
						}
					}
				});
			});

		// Container for the list of excluded folders
		excludedFoldersContainer = document.createElement("div");
		excludedFoldersContainer.className = "excluded-folders-list";
		excludedFoldersContainer.style.marginTop = "10px";
		this.contentEl.appendChild(excludedFoldersContainer);

		function updateExcludedFoldersList() {
			if (!excludedFoldersContainer) return;

			excludedFoldersContainer.innerHTML = "";
			const excludedFolders = this.settings.excludedFolders ?? [];

			if (excludedFolders.length === 0) {
				const emptyDiv = document.createElement("div");
				emptyDiv.textContent = "No folders excluded";
				emptyDiv.className = "excluded-folders-empty";
				excludedFoldersContainer.appendChild(emptyDiv);
				return;
			}

			excludedFolders.forEach((folder: string, index: number) => {
				const folderItem = document.createElement("div");
				folderItem.className = "excluded-folder-item";
				folderItem.style.display = "flex";
				folderItem.style.alignItems = "center";
				folderItem.style.marginBottom = "5px";
				folderItem.style.padding = "5px";
				folderItem.style.backgroundColor = "var(--background-primary)";
				folderItem.style.borderRadius = "4px";

				const pathSpan = document.createElement("span");
				pathSpan.textContent = folder;
				pathSpan.className = "excluded-folder-path";
				folderItem.appendChild(pathSpan);

				const removeBtn = document.createElement("span");
				removeBtn.textContent = "×";
				removeBtn.style.marginLeft = "auto";
				removeBtn.style.cursor = "pointer";
				removeBtn.style.color = "var(--text-error)";
				removeBtn.style.fontWeight = "bold";
				removeBtn.addEventListener('click', () => {
					this.settings.excludedFolders = excludedFolders.filter((_, i) => i !== index);
					updateExcludedFoldersList();
				});
				folderItem.appendChild(removeBtn);

				excludedFoldersContainer.appendChild(folderItem);
			});
		}

		// Initial update of the excluded folders list
		updateExcludedFoldersList();

		// Show/hide excluded folders setting based on scope
		const updateVisibility = () => {
			const isEverywhere = this.settings.scope === ScopeOption.Everywhere;
			if (excludedFoldersSetting?.settingEl) {
				excludedFoldersSetting.settingEl.style.display = isEverywhere ? "block" : "none";
			}
			if (excludedFoldersContainer) {
				excludedFoldersContainer.style.display = isEverywhere ? "block" : "none";
			}
		};

		// Initial visibility check
		updateVisibility();

		new Setting(this.contentEl).addButton((btn) =>
			btn.setButtonText("Save").onClick(() => {
				this.close();
				this.onSubmit(this.settings);
			})
		);
	}

	onClose() {
		// Clean up any event listeners or resources if needed
	}
}
