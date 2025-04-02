# TASK.md

This document tracks ongoing and planned tasks for the CVIc project.

**Legend:**
- `[ ]` To Do
- `[/]` In Progress
- `[x]` Done
- `[-]` Won't Do / Obsolete

---

## Current Tasks

## Future Considerations / Backlog

- `[ ]` Add support for other input formats (e.g., GeoJSON, KML).
- `[ ]` Allow users to define custom parameters.
- `[ ]` Implement data export functionality (e.g., CSV, GeoJSON with CVI scores) from results page.
- `[ ]` Add persistence for map view state (zoom/center).
- `[ ]` User accounts and cloud storage (requires real Firebase integration beyond auth, e.g., Firestore).
- `[ ]` Add unit/integration tests for core logic (calculations, value assignment, segmentation).
- `[ ]` Add end-to-end tests.
- `[ ]` Internationalization (i18n) support.
- `[ ]` Create a Results page to display final CVI scores and map visualization.

## Discovered During Work

*(Add items here as they are discovered)*
- `[ ]` **Type Consistency:** Verify consistent handling of `ShorelineSegment.parameters` vs `ShorelineSegment.properties.parameters` throughout the app. (Ref: `useParameterAssignmentData`, `valueAssignmentLogic`)
- `[ ]` **Error Handling:** Enhance error handling and user feedback in data loading, processing, and calculation functions/hooks.
- `[ ]` **Component Structure:** Clean up unused directories (`src/components/parameters/ParameterList`, `src/components/results`).
- `[ ]` **State Management:** Evaluate if state complexity in `ParameterAssignmentPage` warrants a more centralized solution (Context/Zustand).
- `[ ]` **Map Interaction:** Robustly test polygon selection logic (`handleSelectionCreate` in `ParameterAssignmentPage`).
- `[ ]` **Navigation/Workflow:** Ensure proper handling of missing prerequisites when navigating between steps.
- `[ ]` **ParameterValuePanel Refactor:** Refactor option generation in `ParameterValuePanel` to be less brittle and rely more on parameter definitions.
- `[ ]` **Typings:** Review/clean up `src/types/leaflet.d.ts`.

---
*Self-Correction: Updated Task #2 status to Done. Added verification note to Task #4 regarding map clearing.*