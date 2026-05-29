ADORNME — EMAIL FOOTER UPDATE
==============================

WHAT THIS DOES:
Makes the footer email (hello@adornme.ai) a CLICKABLE mailto: link
on all pages. Currently it's plain text — this change makes it tappable
on mobile, which opens the user's email app with the address pre-filled.

The address stays as hello@adornme.ai (confirmed working via alias forwarding
to mira@adornme.ai).

FILES TO UPLOAD (8 total):
  index.html                       (homepage)
  trinity-collection.html          (gallery)
  product.html                     (product detail)
  our-story.html                   (story page)
  journal.html                     (journal page)
  for-him.html                     (for him page)
  jewelry-designer/index.html      (customize page)
  assets/mobile-menu.js            (mobile menu drawer)

HOW TO UPLOAD:
1. Go to: https://github.com/Adornmejewelry/adornme-site
2. Click "Add file" -> "Upload files"
3. From the unzipped folder, drag:
   - All 6 HTML files at the top level
   - The assets folder (contains updated mobile-menu.js)
   - The jewelry-designer folder (contains updated index.html)
4. Commit message: "Make footer email a clickable mailto link"
5. Replace existing files when asked
6. Wait ~60 seconds, then check on adornme.ai (incognito or Cmd+Shift+R)

VERIFY:
- Open any page on adornme.ai
- Scroll to footer
- Tap/click "hello@adornme.ai"
- Your email app should open with a new message to hello@ ready to send
