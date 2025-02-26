'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonMove {
  move: {
    name: string;
  };
}

interface PokemonSprites {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  sprites: PokemonSprites;
}

// Utility functions
const formatStatName = (statName: string): string => {
  return statName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export default function PokemonDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setError('Failed to load Pokemon details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPokemonDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading Pokemon data...</div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error || 'Pokemon not found'}</div>
      </div>
    );
  }

  const pokemonImage = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{capitalize(pokemon.name)} | Pokemon Explorer</title>
        <meta name="description" content={`Details about ${pokemon.name}`} />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <div>
            {numericId > 1 && (
              <Link href={`/pokemon/${numericId - 1}`}>
                <button className="text-blue-500 hover:underline">&larr; Previous</button>
              </Link>
            )}
          </div>
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              &larr; Back to Home
            </button>
          </Link>
          <Link href={`/pokemon/${numericId + 1}`}>
            <button className="text-blue-500 hover:underline">Next &rarr;</button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with image and basic info */}
          <PokemonHeader pokemon={pokemon} pokemonImage={pokemonImage} />

          {/* Content sections */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <PokemonStats stats={pokemon.stats} />
            <PokemonAbilities abilities={pokemon.abilities} />
            <PokemonMoves moves={pokemon.moves} />
          </div>
        </div>
      </main>
    </div>
  );
}

// Component for Pokemon header section
function PokemonHeader({ pokemon, pokemonImage }: { pokemon: PokemonDetail, pokemonImage: string }) {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
        <img
          src={pokemonImage}
          alt={pokemon.name}
          className="w-64 h-64 object-contain"
        />
      </div>
      <div className="text-white">
        <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm font-semibold bg-white bg-opacity-30"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-75">Height</p>
            <p className="text-xl font-semibold">{pokemon.height / 10} m</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Weight</p>
            <p className="text-xl font-semibold">{pokemon.weight / 10} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for Pokemon stats
function PokemonStats({ stats }: { stats: PokemonStat[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stats</h2>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">
                {formatStatName(stat.stat.name)}
              </span>
              <span className="font-semibold">{stat.base_stat}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component for Pokemon abilities
function PokemonAbilities({ abilities }: { abilities: PokemonAbility[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Abilities</h2>
      <ul className="list-disc pl-5 space-y-2">
        {abilities.map((ability, index) => (
          <li key={index} className="capitalize">
            {ability.ability.name}
            {ability.is_hidden && <span className="text-gray-500 text-sm ml-2">(Hidden)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component for Pokemon moves
function PokemonMoves({ moves }: { moves: PokemonMove[] }) {
  return (
    <div className="md:col-span-2">
      <h2 className="text-2xl font-bold mb-4">Moves</h2>
      <div className="flex flex-wrap gap-2">
        {moves.slice(0, 20).map((move, index) => (
          <span
            key={index}
            className="bg-gray-200 px-3 py-1 rounded-lg text-sm capitalize"
          >
            {move.move.name}
          </span>
        ))}
        {moves.length > 20 && (
          <span className="text-gray-500 text-sm self-center">
            +{moves.length - 20} more moves
          </span>
        )}
      </div>
    </div>
  );
}