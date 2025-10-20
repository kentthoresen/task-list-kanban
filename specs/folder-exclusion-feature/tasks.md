---
description: "Task list for folder exclusion feature implementation"
---

# Tasks: Folder Exclusion Feature

**Input**: Design documents from `/specs/folder-exclusion-feature/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/
**Tests**: Comprehensive test suite included for validation and folder exclusion logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Analyze current settings and task parsing implementation
- [x] T002 Review existing folder scope logic in text_view.ts and store.ts
- [x] T003 [P] Configure development environment for feature implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Design folder exclusion feature architecture
- [x] T005 [P] Create Zod schema validation for excludedFolders array
- [x] T006 [P] Update settings store type definitions and defaults

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Folder Exclusion (Priority: P1) 🎯 MVP

**Goal**: Allow users to exclude specific folders when using "Every folder" scope

**Independent Test**: Create kanban with "Every folder" scope, add exclusions, verify filtered tasks

### Implementation for User Story 1

- [x] T007 [US1] Add excludedFolders array to settings store schema
- [x] T008 [US1] Update shouldHandle function to check folder exclusions
- [x] T009 [US1] Implement nested folder exclusion logic (parent/child relationships)
- [x] T010 [US1] Ensure exclusions only apply when scope is "Everywhere"
- [x] T011 [US1] Add comprehensive tests for folder exclusion logic

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Folder Exclusion Management (Priority: P2)

**Goal**: Provide intuitive UI for managing excluded folders list

**Independent Test**: Open kanban settings and verify folder management UI works correctly

### Implementation for User Story 2

- [x] T012 [US2] Add folder exclusion UI section to settings modal
- [x] T013 [US2] Implement add/remove folder functionality
- [x] T014 [US2] Show/hide exclusion UI based on scope setting
- [x] T015 [US2] Add real-time UI updates when folders are added/removed

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Path Validation and Normalization (Priority: P3)

**Goal**: Ensure folder paths are properly validated and normalized

**Independent Test**: Test various folder path formats and verify consistent behavior

### Implementation for User Story 3

- [x] T016 [US3] Create validateFolderPath function with comprehensive validation
- [x] T017 [US3] Implement folder path normalization (leading/trailing slashes)
- [x] T018 [US3] Add real-time validation feedback in settings UI
- [x] T019 [US3] Handle edge cases (empty paths, special characters, reserved names)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Testing & Validation

**Purpose**: Comprehensive testing and quality assurance

- [x] T020 [P] Create unit tests for validateFolderPath function
- [x] T021 [P] Create integration tests for shouldHandle with folder exclusions
- [x] T022 [P] Test nested folder exclusion scenarios
- [x] T023 [P] Test settings persistence and serialization
- [x] T024 [P] Test UI interactions and edge cases
- [x] T025 Run full test suite and verify >95% coverage

---

## Phase 7: Documentation & Polish

**Purpose**: Final documentation and user experience improvements

- [x] T026 Update README.md with folder exclusion feature documentation
- [x] T027 Add usage examples and best practices
- [x] T028 [P] Review and test user experience flows
- [x] T029 [P] Validate feature works across different vault structures

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Testing (Phase 6)**: Depends on all user story implementations
- **Documentation (Phase 7)**: Depends on completed, tested implementation

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Settings store changes before UI implementation
- Core logic before UI integration
- Validation before user input handling
- Tests concurrent with implementation
- Documentation after implementation

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Documentation tasks marked [P] can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. ✅ Complete Phase 1: Setup
2. ✅ Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. ✅ Complete Phase 3: User Story 1
4. ✅ **STOP and VALIDATE**: Test User Story 1 independently
5. ✅ Deploy/demo if ready

### Incremental Delivery

1. ✅ Complete Setup + Foundational → Foundation ready
2. ✅ Add User Story 1 → Test independently → Core feature complete
3. ✅ Add User Story 2 → Test independently → UI management complete
4. ✅ Add User Story 3 → Test independently → Validation complete
5. ✅ Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core logic)
   - Developer B: User Story 2 (UI implementation)
   - Developer C: User Story 3 (validation & testing)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests were written concurrently with implementation
- All tasks completed successfully with comprehensive validation
- Feature maintains backward compatibility and follows project conventions