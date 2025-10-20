<!--
SYNC IMPACT REPORT - Task List Kanban Constitution v1.0.0

Version change: [NONE - Initial Creation] → 1.0.0
- This is the initial creation of the constitution for the Task List Kanban project
- No previous version existed, establishing governance framework for Obsidian plugin development

Modified principles: [N/A - Initial Creation]
- I. Obsidian Integration (NEW)
- II. Performance First (NEW)
- III. Data Integrity (NEW)
- IV. User Experience (NEW)
- V. Code Quality (NEW)

Added sections:
- Plugin Compatibility & Standards (NEW)
- Development Workflow & Quality Gates (NEW)
- Complete Governance framework (NEW)

Removed sections: [N/A - Initial Creation]

Templates requiring updates:
- ✅ .specify/templates/plan-template.md - No updates needed (generic template compatible)
- ✅ .specify/templates/spec-template.md - No updates needed (generic template compatible)
- ✅ .specify/templates/tasks-template.md - No updates needed (generic template compatible)
- ✅ .specify/templates/commands/ - Directory empty, no updates needed

Follow-up TODOs:
- None - All placeholders resolved with appropriate values for Task List Kanban project
- Consider updating .github/ contribution guidelines to reference constitution principles
- Consider adding constitution compliance checklist to PR template if one exists
-->

# Task List Kanban Constitution

## Core Principles

### I. Obsidian Integration
Every feature must integrate seamlessly with Obsidian's API and ecosystem. Plugin functionality must respect Obsidian's file system events, workspace APIs, and plugin lifecycle. Features must be compatible with Obsidian's architecture and not interfere with other plugins or core functionality.

### II. Performance First
All kanban operations must be fast and responsive. Task parsing, UI updates, and file synchronization must complete within 100ms for typical workloads. Large vaults with thousands of tasks must remain performant through efficient parsing algorithms and reactive state management.

### III. Data Integrity
Task data must remain consistent between files and kanban view. All changes made in the kanban interface must be accurately reflected in the original markdown files, and vice versa. File system events must be handled reliably to prevent data loss or corruption during concurrent edits.

### IV. User Experience
Interface must follow Obsidian's design patterns and be intuitive. The kanban view must integrate naturally with Obsidian's UI conventions, provide clear visual feedback, and offer drag-and-drop functionality that feels native to the platform. Task management operations must be discoverable and efficient.

### V. Code Quality
Code must be maintainable, testable, and well-documented. All new features require comprehensive unit and integration tests. Code must follow the existing modular architecture with clear separation between parsing, UI, and business logic layers. TypeScript types must be used extensively for reliability.

## Plugin Compatibility & Standards

**Obsidian API Compatibility**: All features must support the minimum supported Obsidian version specified in manifest.json. Breaking changes to the Obsidian API must be handled gracefully with appropriate version checks and user notifications.

**Plugin Ecosystem**: Features must not interfere with other Obsidian plugins. Shared resources like file watchers and workspace events must be managed cooperatively to prevent conflicts.

**Accessibility**: UI components must meet basic accessibility standards with proper ARIA labels, keyboard navigation support, and color contrast ratios that work with Obsidian's theming system.

**Mobile Compatibility**: Features must work reliably on Obsidian's mobile platforms, accounting for touch interactions and smaller screen sizes.

## Development Workflow & Quality Gates

**Testing Requirements**: All new features must include unit tests for core logic and integration tests for file system interactions. Test coverage must not fall below 90% for new code. Task parsing edge cases and UI interactions must be thoroughly tested.

**Code Review Process**: All changes require review by maintainers. Reviews must verify adherence to core principles, test coverage, performance impact, and Obsidian API compatibility. Complex features may require architectural review.

**Documentation Updates**: README.md, architecture documentation, and inline code comments must be updated to reflect new features. User-facing changes require updates to the plugin's documentation and help text.

**Version Management**: Follow semantic versioning with proper tagging and release notes. Version bumps must update manifest.json, package.json, and versions.json consistently.

## Governance

This constitution establishes the foundational principles for Task List Kanban development and supersedes all other practices. All contributions, features, and architectural decisions must comply with these core principles.

**Amendment Process**: Changes to this constitution require:
1. Detailed proposal documenting the rationale and impact
2. Review and approval by maintainers
3. Migration plan for any breaking changes
4. Version bump following semantic versioning rules

**Compliance Verification**: All pull requests and reviews must verify compliance with these principles. Features that violate core principles must be redesigned or rejected. Complexity must be justified against the core principles.

**Runtime Development Guidance**: Use `.specify/templates/` for development workflows. Follow the established patterns in `src/parsing/`, `src/ui/`, and `src/entry.ts` for new features.

**Version**: 1.0.0 | **Ratified**: 2025-10-20 | **Last Amended**: 2025-10-20
