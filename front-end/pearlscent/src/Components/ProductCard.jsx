import React from "react";
// 1. IMPORT the hook
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  // 2. INITIALIZE the function from your context
  const { addToCart } = useCart();

  const backendUrl = "http://localhost:5000";

  const discountedPrice =
    product.price - product.price * (product.discount / 100);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow">
      <img
        className="w-full h-48 object-cover"
        src={
          product.image
            ? encodeURI(`${backendUrl}${product.image}`)
            : "https://via.placeholder.com/300"
        }
        alt={product.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300?text=Image+Not+Found";
        }}
      />
      <div className="px-6 py-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-xl mb-2">{product.name}</h3>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            ★ {product.rating}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div>
      </div>

      <div className="px-6 pb-4">
        {/* 3. ADD the onClick event */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
