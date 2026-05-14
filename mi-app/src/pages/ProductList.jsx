import { useState } from "react";
import "../App.css";

import Product from "../components/Product";
import RandomPokemons from "../components/Pokemon";

export default function ProductList() {
  const [cart, setCart] = useState([]);
  const products = [
    {
      id: 1,
      name: "Producto 1",
      price: "$10",
      image: "/images/product.jpg",
    },
    {
      id: 2,
      name: "Producto 2",
      price: "$20",
      image: "/images/product.jpg",
    },
    {
      id: 3,
      name: "Producto 3",
      price: "$30",
      image: "/images/product.jpg",
    },
    {
      id: 4,
      name: "Producto 4",
      price: "$40",
      image: "/images/product.jpg",
    },
    {
      id: 5,
      name: "Producto 5",
      price: "$50",
      image: "/images/product.jpg",
    },
  ];

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div>
      <h2>Tienda Pokémon</h2>

      <RandomPokemons onAddToCart={handleAddToCart} />

      <h3>Carrito</h3>

      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}