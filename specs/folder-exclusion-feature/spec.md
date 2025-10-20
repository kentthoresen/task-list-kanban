# Feature Specification: Folder Exclusion Feature

**Feature Branch**: `[feature-folder-exclusion]`
**Created**: 2025-10-20
**Status**: Implemented
**Input**: User description: "Add a function via the settings that allows me to exclude folders if I have selected all folders to be included in the Kanban task selection process."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Folder Exclusion (Priority: P1)

Allow users to exclude specific folders when using "Every folder" scope in kanban settings.

**Why this priority**: Core functionality requested by user, enables better organization of large vaults.

**Independent Test**: Can be fully tested by creating a kanban with "Every folder" scope, adding folder exclusions, and verifying tasks from excluded folders don't appear.

**Acceptance Scenarios**:

1. **Given** a kanban with "Every folder" scope, **When** I add a folder to exclusions, **Then** tasks from that folder should not appear in the kanban
2. **Given** a kanban with "Every folder" scope, **When** I add a parent folder to exclusions, **Then** tasks from all subfolders should also be excluded
3. **Given** a kanban with "This folder" scope, **When** I add folder exclusions, **Then** exclusions should be ignored (scope takes precedence)

---

### User Story 2 - Folder Exclusion Management (Priority: P2)

Provide intuitive UI for managing excluded folders list.

**Why this priority**: Essential for usability of the feature, users need easy way to add/remove exclusions.

**Independent Test**: Can be fully tested by opening kanban settings and verifying folder management UI works correctly.

**Acceptance Scenarios**:

1. **Given** kanban settings are open, **When** scope is "Every folder", **Then** folder exclusion UI should be visible
2. **Given** kanban settings are open, **When** scope is "This folder", **Then** folder exclusion UI should be hidden
3. **Given** folder exclusion UI is visible, **When** I enter invalid folder path, **Then** I should see validation error
4. **Given** folder exclusion UI is visible, **When** I add valid folder, **Then** it should appear in exclusion list
5. **Given** folders are in exclusion list, **When** I click remove button, **Then** folder should be removed from list

---

### User Story 3 - Path Validation and Normalization (Priority: P3)

Ensure folder paths are properly validated and normalized for consistent behavior.

**Why this priority**: Prevents user errors and ensures reliable functionality across different path formats.

**Independent Test**: Can be fully tested by testing various folder path formats and verifying consistent behavior.

**Acceptance Scenarios**:

1. **Given** folder exclusion input, **When** I enter path with leading/trailing slashes, **Then** it should be normalized automatically
2. **Given** folder exclusion input, **When** I enter path with invalid characters, **Then** I should see validation error
3. **Given** folder exclusion input, **When** I enter reserved folder name, **Then** I should see validation error
4. **Given** folder exclusion input, **When** I enter extremely long path, **Then** I should see validation error

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to specify folders to exclude from task scanning
- **FR-002**: System MUST only apply folder exclusions when scope is set to "Every folder"
- **FR-003**: System MUST exclude tasks from subfolders of excluded folders
- **FR-004**: System MUST validate folder paths and provide immediate feedback
- **FR-005**: System MUST normalize folder paths (handle leading/trailing slashes)
- **FR-006**: System MUST persist excluded folders in kanban file frontmatter
- **FR-007**: System MUST show/hide exclusion UI based on scope setting
- **FR-008**: System MUST maintain backward compatibility with existing kanban files

### Key Entities *(include if feature involves data)*

- **[ExcludedFolder]**: String representing folder path to exclude from task scanning
- **[KanbanSettings]**: Extended settings object including excludedFolders array
- **[ValidationError]**: Error message for invalid folder path input

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can exclude folders and see immediate filtering of tasks (response time <100ms)
- **SC-002**: Folder exclusion UI integrates seamlessly with existing settings (no UX disruption)
- **SC-003**: 100% backward compatibility - existing kanban files load without issues
- **SC-004**: Comprehensive test coverage (>95%) for all folder exclusion functionality
- **SC-005**: Clear documentation with examples enables users to use feature effectively