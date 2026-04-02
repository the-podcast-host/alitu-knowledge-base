# KB GIF Capture Patterns

Use this reference only when you are actively capturing a KB asset.

## Best-Fit Cases

Good GIF targets:

- one click causes a visible state change
- a panel opens or closes
- a file appears in a list
- a control changes mode

Better as screenshots:

- mostly static settings pages
- long forms
- multi-branch workflows
- anything that depends on a native OS dialog

## Cursor Pattern

Playwright screenshots do not show the real OS cursor.

Use an in-page overlay instead:

- one synthetic cursor element
- one click pulse element
- move them with page coordinates during the scripted action

The practical pattern is:

1. inject CSS for the cursor and pulse
2. inject small helpers such as `window.__kbSetCursor` and `window.__kbPulse`
3. move the Playwright mouse and the overlay together
4. capture a frame before the click
5. trigger the pulse
6. capture one click frame
7. perform the real action
8. capture the post-action state

## Upload Flow Pattern

For upload flows:

1. load a fresh upload page
2. capture the empty state
3. move the synthetic cursor to `Click to upload`
4. capture the click state
5. if the native chooser gap feels confusing, show a short handoff overlay such as `Choose a file from your computer`
6. keep that overlay visible long enough to read, usually about `0.8` to `1.2` seconds
7. set the file on the page input
8. capture the row once the uploaded file appears

Do not try to show the native chooser.

## Noise Hiding

Common UI to hide before capture:

- Intercom launcher and iframes
- notification regions
- incidental tooltips

Hide only what is not part of the instructional point.

## Review Checklist

Before finalizing, check:

1. Can the reader see what changed?
2. Is the cursor visible at the important moment?
3. Is the click target obvious?
4. Is there distracting UI noise?
5. Would two screenshots be clearer than this GIF?
