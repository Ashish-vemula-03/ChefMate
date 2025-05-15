// src/components/DashboardSidebar/Favorites.jsx
import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div>
          {favorites.map((recipe) => (
            <div key={recipe._id} style={{ marginBottom: "1rem" }}>
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
              />
              <span style={{ marginLeft: 10 }}>{recipe.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
