# Specification

## Summary
**Goal:** Debug and fix the milestone progress slider persistence system to ensure updates flow correctly from frontend to backend and reflect in the UI.

**Planned changes:**
- Add comprehensive logging throughout the slider interaction flow (onChange → mutation → backend → response → cache invalidation → UI refresh)
- Debug and fix the backend updateMilestoneProgress method to correctly receive, process, and persist milestoneId and progress parameters
- Fix the updateMilestoneProgressMutation in useTasks.ts to correctly pass parameters to the backend actor
- Debug the slider onChange handler in MilestoneSection.tsx to properly trigger the mutation with milestone ID and progress value
- Verify HashMap storage correctly persists milestone progress values across updates
- Ensure React Query cache invalidation triggers after successful mutations to fetch fresh data
- Improve error handling to display clear Spanish error messages with specific details
- Test and fix the complete end-to-end slider flow until it works seamlessly

**User-visible outcome:** Users can move the milestone progress slider and see it persist correctly after page refresh, with clear error messages in Spanish if updates fail.
