# Image assets

Keep all approved visual assets in this folder so they are easy to replace without hunting through page files.

## Five10 logos

- `five10-logo-dark.png` — header logo, on a white background.
- `five10-logo-white.png` — footer logo, on a maroon background.

These are the supplied transparent PNG files. Keep their names and transparent backgrounds to preserve consistency across every page.

## Partner logo strips

- `client-logos-row-1.png`
- `client-logos-row-2.png`

These are the two supplied horizontal PNG strips. The shared JavaScript duplicates them into a continuous marquee track. Replace a file at the same path to change the displayed artwork without editing HTML or JavaScript.

## Project and slideshow photos

- `airasia-fiesta-iloilo.jpg` — cropped from the provided `PROJECTS.png` design screenshot for the featured project image. Replace this with the original, higher-resolution event photo when it is available.
- The three wide homepage slideshow images and some case-study image pairs are currently configured as Unsplash placeholders in `assets/js/site-data.js`.

To add a local photo, copy it here and update the corresponding `image` or `secondaryImage` value in `assets/js/site-data.js`, for example `assets/images/event-wide-01.jpg`. A static GitHub Pages site does not automatically list new folder files, so each photo must be referenced in the central data file.
