import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaEye, FaDollarSign } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url =
        selectedCat === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${selectedCat}`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const data = await res.json();
      setCategories(['all', ...data]);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCat]);

  return (
    <div className="home-container">
      <h2><FaShoppingBag style={{ marginRight: '10px' }}/>Products</h2>

      <div className="filter-bar">
        <label>Filter by category:</label>
        <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p><FaDollarSign style={{ marginRight: '5px', color: 'green' }} /> {product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`}>
              <button><FaEye /> View</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
