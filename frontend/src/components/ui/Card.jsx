export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image ? `http://localhost:5000${recipe.image}` : "/default-recipe.jpg"} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.cuisine}</p>
      <p>{recipe.difficulty}</p>
    </div>
  );
}
