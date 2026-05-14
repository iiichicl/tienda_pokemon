import { useState, useEffect } from "react";
import "./Pokemon.css";

export default function RandomPokemons({ onAddToCart }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const ids = [];

        while (ids.length < 10) {
          const randomId = Math.floor(Math.random() * 151) + 1;

          if (!ids.includes(randomId)) {
          ids.push(randomId);
          }
        }

        const results = await Promise.all(
          ids.map((id) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
              .then((res) => res.json())
          )
        );

        setPokemons(results);

      } catch (error) {
        console.error("Error cargando Pokémon:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <h1>Cargando Pokémon...</h1>;
  }

  return (
    <div className="container">
      {pokemons.map((pokemon) => (
        <div className="card" key={pokemon.id}>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <h3>
            {pokemon.name.charAt(0).toUpperCase() +
              pokemon.name.slice(1)}
          </h3>

          <p>Pokédex #{pokemon.id}</p>

          <div className="types">
            {pokemon.types.map((type) => (
              <span key={type.type.name}>
                {type.type.name}
              </span>
            ))}
          </div>

          <h3>{pokemon.id * 3} €</h3>

          <button onClick={() => onAddToCart({
            id: pokemon.id,
            name: pokemon.name,
            price: pokemon.id * 3,
            image: pokemon.sprites.front_default
            })}>
            Comprar
          </button>

        </div>
      ))}
    </div>
  );
}