import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    { name: "Men's Clothing", icon: "👔", slug: "mens-clothing" },
    { name: "Women's Clothing", icon: "👗", slug: "womens-clothing" },
    { name: "Jewelry", icon: "💎", slug: "jewelery" },
    { name: "Electronics", icon: "💻", slug: "electronics" },
  ];

  return (
    <div className="categories-page">
      <h1>Shop by Category</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="category-card"
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
