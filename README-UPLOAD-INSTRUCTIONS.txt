ADORNME MOBILE HAMBURGER MENU — UPLOAD INSTRUCTIONS
====================================================

This package adds a mobile hamburger menu to your site.
On desktop, your site looks the same. On mobile (phones), 
the nav links collapse into a ☰ icon that opens a slide-in menu.

FILES IN THIS PACKAGE
---------------------
1 NEW FILE:
  assets/mobile-menu.js   (the menu code)

7 UPDATED FILES (just have 1 new script tag added near </body>):
  index.html
  trinity-collection.html
  product.html
  our-story.html
  journal.html
  for-him.html
  jewelry-designer/index.html

HOW TO UPLOAD TO GITHUB
-----------------------

EASIEST METHOD - Upload the whole folder at once:

1. Go to: https://github.com/Adornmejewelry/adornme-site
2. Click "Add file" (top right) → "Upload files"
3. In Finder, open the unzipped "mobile-menu-files" folder
4. Select ALL files inside (Cmd+A): the assets folder, jewelry-designer folder, 
   and the 6 .html files at the top level (NOT this README file)
5. Drag them all into GitHub's upload area
6. GitHub will preserve the folder structure
7. Commit message: "Add mobile hamburger menu"
8. Click "Commit changes"
9. GitHub may ask to confirm overwriting existing files - say YES (replace them)

Vercel will auto-deploy in about 60 seconds.

TESTING
-------
After deploy, test on YOUR phone (open https://adornme.ai on your iPhone):
- You should see a ☰ icon in the top-right corner
- The "Gallery / Customize / Story / For Him" links should be hidden
- Tapping ☰ should slide in a clean menu from the left
- Tapping any link in the menu should navigate AND close the menu
- Tapping ☰ (now an X) should close the menu

On desktop the site looks exactly the same as before.
