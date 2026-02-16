# VRAMora Known Issues

## Active Issues

### Mobile Pinch-to-Zoom Not Working Properly
**Status:** 🔧 In Progress  
**Reported:** 2026-02-16  
**Platform:** iOS Safari (iPhone)

**Symptom:**  
Pinch-to-zoom on mobile only works for zooming OUT, not IN. User can spread fingers to zoom out but pinching in doesn't zoom into the chart.

**Investigation so far:**

1. **Initial state** — Scroll wheel zoom was enabled, hijacking page scroll on desktop AND causing confusion on mobile. Pinch zoom was enabled via chartjs-plugin-zoom v2.0.1 + Hammer.js.

2. **First fix attempt (commit 20a9649):**
   - Disabled wheel zoom entirely
   - Added explicit +/- zoom buttons in toolbar
   - Kept pinch zoom enabled
   - Result: Desktop fixed, mobile pinch-in still broken

3. **Second fix attempt (commit d70674c):**
   - Added `threshold: 10` to pan config to reduce accidental triggers
   - Cleaned up `onPanStart` logic — explicit mouse vs touch handling
   - Adjusted zoom limits to match actual data ranges:
     - Bubble chart: X 0-20000, Y 0-600
     - Hardware chart: X 0.5-500, Y 0-300
   - Reduced `minRange` values
   - Result: TBD

**Hypotheses:**

1. **Touch event conflict** — `onPanStart` returning `false` for touch might interfere with pinch recognition since both are touch events. Hammer.js distinguishes pinch (2-finger) from pan (1-finger), but Chart.js zoom plugin might not handle this cleanly.

2. **Initial zoom level** — Chart might start at "max zoom out" state, making further zoom-out work but zoom-in hit some internal limit.

3. **Hammer.js pinch recognition** — Pinch-in gesture might not be recognized at all. Need to verify Hammer.js is actually firing pinch events.

4. **iOS Safari quirk** — Safari has aggressive touch handling for system gestures. Might need `touch-action: none` on canvas.

**Next steps to try:**

- [ ] Add `touch-action: none` CSS to canvas element
- [ ] Test on Android to isolate iOS-specific issues
- [ ] Add console logging to verify Hammer.js pinch events fire
- [ ] Try removing `onPanStart` entirely to see if it's the culprit
- [ ] Check if `scaleMode` or other zoom plugin options affect behavior
- [ ] Consider using drag-to-zoom box as alternative for mobile

**Relevant code locations:**
- `app.js:256-280` — Bubble chart zoom config
- `app.js:655-680` — Hardware chart zoom config
- `index.html:21-22` — Hammer.js + zoom plugin script tags

---

## Resolved Issues

*(none yet)*
