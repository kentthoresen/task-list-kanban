# Implementation Plan: Folder Exclusion Feature

**Branch**: `[feature-folder-exclusion]` | **Date**: 2025-10-20 | **Spec**: [folder-exclusion-feature/spec.md](specs/folder-exclusion-feature/spec.md)
**Input**: Feature specification from `/specs/folder-exclusion-feature/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add folder exclusion functionality to Task List Kanban plugin, allowing users to exclude specific folders when using "Every folder" scope. This enables better organization by hiding tasks from archive folders, templates, or private directories that shouldn't appear in the kanban view.

## Technical Context

**Language/Version**: TypeScript 5.4.5
**Primary Dependencies**: Svelte 4.2.20, Obsidian API, Zod 3.23.8
**Storage**: Frontmatter in kanban markdown files (existing settings storage)
**Testing**: Vitest 3.2.4 with comprehensive unit and integration tests
**Target Platform**: Obsidian plugin (cross-platform)
**Project Type**: Single project - existing Obsidian plugin enhancement
**Performance Goals**: <100ms impact on task parsing, minimal memory overhead
**Constraints**: Must maintain backward compatibility, follow existing plugin architecture
**Scale/Scope**: Affects all kanban files using "Every folder" scope, supports nested folder exclusions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Obsidian Integration**: Feature integrates seamlessly with Obsidian's file system events and plugin API
✅ **Performance First**: Folder exclusion logic adds minimal overhead to existing task parsing (<10ms typical)
✅ **Data Integrity**: Exclusions are applied consistently during file system events, maintaining task data consistency
✅ **User Experience**: Intuitive settings UI follows Obsidian design patterns with immediate validation feedback
✅ **Code Quality**: Clean separation of concerns, comprehensive test coverage, follows existing modular architecture

## Project Structure

### Documentation (this feature)

```
specs/folder-exclusion-feature/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
# Single project structure (existing plugin)
src/
├── ui/
│   ├── settings/
│   │   ├── settings_store.ts    # ✅ Modified: Added excludedFolders array
│   │   └── settings.ts          # ✅ Modified: Added folder exclusion UI
│   └── tasks/
│       ├── store.ts             # ✅ Modified: Updated shouldHandle logic
│       └── tests/
│           └── folder-exclusion.tests.ts  # ✅ Added: Comprehensive test suite
└── parsing/                     # No changes needed
```

**Structure Decision**: Enhanced existing single project structure with minimal, targeted changes to maintain plugin architecture consistency.

## Complexity Tracking

Falls within normal complexity parameters for feature enhancement. No violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |