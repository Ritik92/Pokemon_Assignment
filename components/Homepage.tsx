'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

// Extracted components
function SearchBar({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search Pokemon by name..."
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="w-full flex justify-center mb-2">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="h-32 w-32"
        />
      </div>
      <div className="text-center">
        <p className="text-lg capitalize font-semibold text-gray-800">{pokemon.name}</p>
        <p className="text-sm text-gray-500">#{pokemon.id}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        
        // Extract ID from URL and add to each Pokemon
        const pokemonsWithId = data.results.map((pokemon: Omit<Pokemon, 'id'>) => {
          const id = extractIdFromUrl(pokemon.url);
          return { ...pokemon, id };
        });
        
        setPokemons(pokemonsWithId);
        setFilteredPokemons(pokemonsWithId);
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPokemons();
  }, []);

  // Filter pokemons based on search term
  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(results);
  }, [searchTerm, pokemons]);

  // Extract ID from Pokemon URL
  const extractIdFromUrl = (url: string): number => {
    const segments = url.split('/');
    return parseInt(segments[segments.length - 2], 10);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Render Pokemon grid or empty/loading states
  const renderPokemonContent = () => {
    if (isLoading) {
      return <div className="text-center text-xl">Loading Pokemon data...</div>;
    }
    
    if (filteredPokemons.length === 0) {
      return (
        <div className="text-center text-xl mt-8">
          No Pokemon found matching "{searchTerm}"
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPokemons.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Pokemon Explorer</title>
        <meta name="description" content="Explore Pokemon from the first generation" />
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Pokemon Explorer</h1>
        
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        
        {renderPokemonContent()}
      </main>
    </div>
  );
}