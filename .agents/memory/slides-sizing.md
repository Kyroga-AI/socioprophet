---
name: slides professional-mode sizing
description: Why investor-memo / professional slide decks overflow at 16:9 and how to size them so the footer never clips.
---

Rule: when building a "professional"/investor-memo slide deck where the sizing
floor forbids anything below ~2.2vw, dense slides (4-5 bullets, or content +
image) will overflow a 16:9 viewport and push the footer below the fold even
though the slide "looks" designed.

**Why:** body text at ~2.7vw with line-height 1.4 plus 8vh top/bottom padding,
a 2-line title, and per-bullet gaps easily exceeds 100vh once several bullets
wrap to two lines. `marginTop:auto` on the footer only helps when there is spare
space — under overflow it slides past the bottom edge and `overflow-hidden`
clips it.

**How to apply:** budget vertical space up front. Working values that fit 4-5
dense bullets at 16:9: outer padding ~5.5vh, content marginTop ~2.5vh, title
margin-bottom ~2.5-3vh, bullet container gap ~1.7-1.9vh, body ~2.45vw /
line-height 1.32, footer paddingTop ~1.8vh. Keep the top rule's absolute `top`
in sync with the outer padding. Always screenshot EVERY dense slide (not just
one) at 16:9 and confirm the footer line is fully visible before presenting —
the cover/closing slides are never the problem, the text-heavy middle ones are.
