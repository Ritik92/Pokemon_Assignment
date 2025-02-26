'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        // Add ID to each Pokemon (extracted from URL)
        const pokemonsWithId = data.results.map((pokemon: Pokemon) => {
          const url = pokemon.url;
          const id = url.split('/')[6];
          return { ...pokemon, id };
        });
        
        setPokemons(pokemonsWithId);
        setFilteredPokemons(pokemonsWithId);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Pokemon Explorer</h1>
        
        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search Pokemon by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        {/* Pokemon List */}
        {isLoading ? (
          <div className="text-center text-xl">Loading Pokemon data...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemons.map((pokemon) => (
              <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
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
              </Link>
            ))}
          </div>
        )}
        
        {filteredPokemons.length === 0 && !isLoading && (
          <div className="text-center text-xl mt-8">
            No Pokemon found matching "{searchTerm}"
          </div>
        )}
      </main>
    </div>
  );
}