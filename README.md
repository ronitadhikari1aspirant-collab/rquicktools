# Rquicktools

Create a modern, responsive utility web application called QUICKTOOLS.



TAGLINE:

Everything You Need. One Place.



PROJECT GOAL:

Build an all-in-one everyday digital tools platform that works beautifully on desktop, tablets and mobile phones.



DESIGN SYSTEM:



- Minimal and clean visual design.

- Light theme as the default.

- Optional dark theme with a theme toggle.

- White backgrounds, navy text and subtle blue accents.

- Modern typography.

- Rounded cards with subtle borders.

- Consistent spacing and polished hover effects.

- Avoid excessive gradients, glassmorphism and unnecessary animations.



MAIN LAYOUT:



1. Header:



- QuickTools logo and name.

- Home navigation.

- All Tools navigation.

- About navigation.

- Light/dark theme toggle.



2. Hero:



- Heading: "Everything You Need. One Place."

- Subtitle: "Simple, useful digital tools for everyday life."

- Search bar with a functional search interaction.



3. Tools dashboard:

   Create eight individual tool cards:



- QR Code Generator

- Word Counter

- Text Case Converter

- Percentage Calculator

- Age Calculator

- Unit Converter

- Text Reverser

- Image Resizer



Each card must have an icon, title, short description and working Open Tool interaction.



4. Tool interfaces:

   Each utility should have its own dedicated view or route, with a consistent design and navigation back to the dashboard.



5. Footer:



- About QuickTools

- Privacy Policy

- Contact

- Copyright notice



TECHNICAL REQUIREMENTS:



- Use React and TypeScript with a maintainable component structure.

- Use browser-side processing wherever possible.

- Do not require authentication.

- Do not add a paid API or unnecessary backend.

- Store theme preference locally.

- Ensure mobile responsiveness.

- Include proper input validation and error states.

- Every visible button must perform its intended action.



PWA FOUNDATION:

Prepare the application for installation as a Progressive Web App.

Include:



- Web app manifest.

- Appropriate application name and icons.

- Service worker.

- Installability support.

- A useful offline fallback page.



IMPORTANT:

First build the complete application structure and polished dashboard.

Implement the eight tools as separate components.

Do not use fake functionality or placeholder buttons.

Keep the source code clean and easy to modify.



Do not publish the application yet.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rquicktools.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/27451c6b-34f4-4034-a956-bdf412884915).

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
