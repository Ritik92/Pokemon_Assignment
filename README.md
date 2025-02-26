# Pokemon Explorer

A responsive web application built with Next.js that allows users to browse and search for Pokemon using data from the PokeAPI.

## Features

- Browse a list of Pokemon with images and basic info
- Search for Pokemon by name
- View detailed information about each Pokemon including stats, abilities, and moves
- Responsive design for all screen sizes
- Performance optimized with Server-Side Rendering (SSR) and Static Site Generation (SSG)

## Technologies Used

- Next.js
- TypeScript
- TailwindCSS
- PokeAPI

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Ritik92/Pokemon_Assignment.git
cd pokemon-explorer
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
my-app/
├── app/              # Next.js pages
│   ├── page.tsx       # Homepage with Pokemon list (Homepage Component is imported from Components folder)
│   ├── pokemon/        # Pokemon-specific pages
│   │   └── [id].tsx    # Dynamic route for Pokemon details
├── public/             # Static assets
├── styles/             # CSS styles
├── tailwind.config.js  # TailwindCSS configuration
└── package.json        # Project dependencies and scripts
```

## Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To run the production build locally:

```bash
npm start
# or
yarn start
```

## Future Improvements

- Add pagination or infinite scrolling for the Pokemon list
- Implement more advanced filtering (by type, abilities, etc.)
- Add a compare feature to compare stats between Pokemon
- Create a favorites system using local storage


## Acknowledgments

- Data provided by [PokeAPI](https://pokeapi.co/)
- Built as part of a coding assignment
