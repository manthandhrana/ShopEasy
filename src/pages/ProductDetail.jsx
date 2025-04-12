import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { FaShoppingCart, FaDollarSign } from 'react-icons/fa';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [count, setCount] = useState(0); // Count how many times item added

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setCount(prev => prev + 1);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} />
      <div className="product-detail-info">
        <h2>{product.title}</h2>
        <p className="price">
          <FaDollarSign style={{ marginRight: '6px', color: 'green' }} />
          {product.price}
        </p>
        <p className="desc">{product.description}</p>
        <button className="shoppingCard" onClick={handleAddToCart}>
          <FaShoppingCart style={{ marginRight: '6px' }} />
          Add to Cart
        </button>

        {showSuccess && (
          <div className="success-box">
            {count} item added to your cart
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
