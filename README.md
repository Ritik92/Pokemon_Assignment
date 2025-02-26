# Pokemon Explorer

A web application built with Next.js that uses the PokeAPI to display Pokemon information.

## Features
- Browse Pokemon with images and basic info
- Search Pokemon by name
- View detailed Pokemon information
- Responsive design

## Technologies
- Next.js
- TypeScript
- TailwindCSS
- PokeAPI

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/Ritik92/Pokemon_Assignment.git
cd Pokemon_Assignment
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
```
my-app/
├── app/              # Next.js pages
│   ├── page.tsx      # Homepage
│   ├── pokemon/      # Pokemon pages
│   │   └── [id].tsx  # Dynamic route for Pokemon details
├── public/           # Static assets
├── styles/           # CSS styles
├── tailwind.config.js
└── package.json
```

## Build
```bash
npm run build
npm start
```

## Future Improvements
- Add pagination
- Implement filtering
- Add compare feature
- Create favorites system

## Acknowledgments
- Data from [PokeAPI](https://pokeapi.co/)
- Built as a coding assignment
