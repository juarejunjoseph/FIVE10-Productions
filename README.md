# Five10 Productions Website

A static multi-page website built with HTML, CSS, and JavaScript. It publishes directly to GitHub Pages; no Node.js install or build command is required.

## Design source

`FIVE10Production(1).html`, supplied as the design reference, is the source of truth for the overall visual style, especially the shared header and footer. The current implementation keeps that page structure and the same visual sequence while moving reusable styles, content data, and shared header/footer/modal markup into separate files for easier editing.

The homepage order is: white header with the Five10 logo and navigation, burgundy headline hero, wide image slideshow area, centered Featured Projects carousel with side arrows and the red See All Events badge, gray client-logo marquee, spacious white contact call-to-action, and the burgundy three-column footer.

## Files

- `index.html` — homepage.
- `about.html` — About page.
- `project.html` — projects listing.
- `powermac.html` — Power Mac Center case-study page.
- `contact.html` — Contact page.
- `404.html` — GitHub Pages not-found page.
- `assets/css/styles.css` — responsive styling and animations, including the shared reference header and footer.
- `assets/js/components.js` — shared header, footer, contact modal, and project-detail modal markup.
- `assets/js/site-data.js` — shared project, contact, and gallery data.
- `assets/js/main.js` — carousels, logo marquee, filters, modal behavior, image flips, scroll reveals, and responsive navigation.
- `assets/images/` — logo strips and image assets.

## Header and footer logos

- Header: `assets/images/five10-logo-dark.png`
- Footer: `assets/images/five10-logo-white.png`

Keep both transparent PNG files at these paths to preserve consistent brand appearance on all pages.

## Client-logo marquee

The “WHO WE HAVE WORKED WITH” section uses these two uploaded logo strips:

- `assets/images/client-logos-row-1.png`
- `assets/images/client-logos-row-2.png`

The JavaScript duplicates the strips so the CSS animation can move continuously from right to left. Replace the PNGs at the same paths to update the artwork without changing the code. The animation pauses when the pointer hovers over the strip.

## Images and slideshows

The wide slideshow below the homepage hero and the Featured Projects carousel are powered by Swiper.js. The slide list and project details are in `assets/js/site-data.js`.

- To replace a slideshow photo, add the approved photo to `assets/images/` and update its `image` value in the `heroGallerySlides` array.
- To replace a featured project photo, update the matching project's `image` and `secondaryImage` values.
- To change which projects appear in the homepage carousel, edit the `featuredSlides` array.
- The first AirAsia photo is a crop from the supplied `PROJECTS.png` design reference because a separate high-resolution source photo was not provided. Replace it with the original event photograph when available.

Power Mac Center image pairs are defined in `powerMacSections` and automatically switch to their secondary photo on hover or focus; the on-page button supports touch devices.

## Contact form

The contact modal validates the required fields and opens the visitor's default email application with a message prepared. GitHub Pages does not provide form processing by itself, so the visitor must send the prepared email. Verify `contactEmail` in `assets/js/site-data.js` before publishing.

## Publish to GitHub Pages

1. Download and extract the ZIP archive.
2. Create a GitHub repository for the website.
3. Upload the **contents** of the `five10-website` folder to the repository root so that `index.html` is at the root and `assets/` is alongside it.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
6. Open the published URL shown in Settings → Pages.

Swiper.js and font files are loaded from CDNs and the wide slideshow currently uses Unsplash placeholder photos. Replace those photos with approved local images before launch if the published site should not depend on external image URLs.


## Typography and Featured Projects update

The homepage now uses **Inter** for the reference typography. Featured Projects uses the supplied `featured project.zip` assets, stored under `assets/images/` (`featured-airasia.png`, `featured-performer-2.png`, `featured-performer-3.png`, chevrons, map pin, and event badge). Desktop targets: hero display 128px, Featured Projects 48px, contact heading 48px, contact copy 20px, footer text 16px; responsive sizes scale down on smaller screens.

### Featured Projects sizing
The Featured Projects image frame uses an 800 × 533 aspect ratio (max-width 800px). The event ribbon is 200 × 200px on desktop with 24px bold text and scales down on smaller screens. The location label uses `assets/images/map-pin.png`.

# FIVE10-Productions
