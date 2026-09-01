# Arte Livre Galeria

Create a single-page website (HTML + CSS + JS in one file, no frameworks) 

for a college assignment: an art social network called "ArtLivre", where 

artists post paintings, follow each other, and have their own profile.



IMPORTANT: All visible text on the site (headings, buttons, labels, bio, 

captions, everything) must be written in Brazilian Portuguese (pt-BR). 

Only these build instructions are in English — the output website itself 

must be 100% in Portuguese.



VISUAL THEME

- Palette: red and black. Slightly warm near-black background (not pure 

  black), cards in a bit lighter black, a vibrant red as the accent color, 

  and a darker wine red for gradients and shadows.

- Typography: an elegant serif (like "Fraunces" or "Playfair Display") for 

  headings, and a clean sans-serif (like "Inter") for the rest of the text.

- Buttons should be fully rounded (pill-shaped), with a "spring" hover 

  effect (lifts up, scales slightly, gains a red glow) and shrink on click.

- Cards and image corners should be well rounded, nothing sharp/square.



PAGE STRUCTURE

1. Sticky header with logo, nav menu, and a "Publicar obra" button.

2. Hero section: large headline (with one word in italic that has an 

   animated red shimmer effect moving across it), subtitle, two buttons, 

   and two blurred red circles slowly drifting in the background (CSS only).

3. A horizontally scrollable row of category chips: "Todos", "Pinturas mais 

   famosas", "Novas", "Clássicos", "Em alta", "Favoritas da semana". The 

   scrolling must be done with CSS only (overflow-x: auto + scroll-snap), 

   no JavaScript mouse-drag logic.

4. An art gallery in an organized, EXPLICIT GRID (not random masonry): 

   manually define one large featured card plus medium/wide cards around 

   it, all images uniformly cropped (object-fit: cover). Use famous, 

   public-domain artworks (e.g. The Starry Night, The Great Wave off 

   Kanagawa, The Kiss by Klimt, Water Lilies by Monet, Girl with a Pearl 

   Earring, The Birth of Venus). On hover, each card reveals a "museum 

   plaque" sliding up from the bottom with the artwork's title, artist, 

   year, and location — but written in Portuguese.

5. A featured-artist profile section using a real, famous artist (e.g. 

   Vincent van Gogh), with a cover image using one of his paintings with a 

   red/black overlay, his real profile photo (self-portrait), name, stats 

   (works, followers, following), a short bio, and a small 4-image grid of 

   "liked" works. All labels and bio text in Portuguese.

6. Simple footer.



ANIMATIONS

- Hero elements fade and rise in on page load.

- Gallery cards enter with a slight bounce as the user scrolls to them 

  (IntersectionObserver).

- Card hover: lifts up, gains a red shadow glow, and the image zooms in 

  slightly.

- The logo has a small red dot pulsing like a "live" indicator.

- Respect "prefers-reduced-motion" by disabling animations for users who 

  request it.



TECHNICAL REQUIREMENTS

- Single HTML file with embedded CSS and JS.

- Fully responsive (mobile, tablet, desktop).

- Use real, public-domain images (e.g. via Wikimedia Commons).

- Remember: every piece of visible text must be in Brazilian Portuguese.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1fead4b8-ac85-4c29-bbb0-6c2d7842218b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
