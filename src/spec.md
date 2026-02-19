# Specification

## Summary
**Goal:** Replace checkbox-based progress tracking with manual slider controls for milestones.

**Planned changes:**
- Remove all checkbox completion controls from milestone and task components
- Add a slider control (0-100%) to each milestone card for manual progress adjustment
- Add progress field to backend Milestone model and implement updateMilestoneProgress method
- Create React Query mutation hook to sync slider changes with backend
- Update progress calculations to use manually set milestone percentages instead of task completion counts
- Remove all task completion state management and related event handlers

**User-visible outcome:** Users can directly adjust milestone progress using sliders instead of marking individual tasks complete. Phase and overall progress bars update based on the manually set milestone percentages.
