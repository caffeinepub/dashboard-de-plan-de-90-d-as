# Specification

## Summary
**Goal:** Replace status dropdowns with ON/OFF checkboxes for milestone tasks and make notes always visible.

**Planned changes:**
- Replace the status dropdown in TaskCard with a functional checkbox that toggles between completed (ON) and not completed (OFF)
- Update backend Task status model to support binary completion tracking (completed vs not completed)
- Update progress calculation logic to work with binary checkbox completion status
- Remove collapsible behavior from notes section so notes are always visible and editable

**User-visible outcome:** Users can track task completion with simple ON/OFF checkboxes instead of dropdowns, and can immediately add or edit notes without expanding the notes section.
