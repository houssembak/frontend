// ProductsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import './Product.css';
import { useCart } from './CartContext';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { cart, addToCart } = useCart();
    const productsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products/listproducts');
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const totalAmount = cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);

    return (
        <div>
            <div className="cart-icon" onClick={() => navigate('/cart')}>
                <FaShoppingCart size={30} />
                <span>{cart.length}</span>
                <span>{totalAmount.toFixed(2)} $</span>
            </div>

            <div className="products-container">
                {currentProducts.map(product => (
                    <div className="product-card" key={product.id} onClick={() => navigate(`/product/${product.nomProduit}`)}>
                        <img className="product-image" src={product.images_produit} alt={product.nomProduit} />
                        <h3>{product.nomProduit}</h3>
                        <p>Type: {product.typeProduit}</p>
                        <p>Prix: {product.prix} $</p>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="add-to-cart-btn">
                            Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>

            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button 
                                onClick={() => paginate(number)} 
                                className="page-link"
                                style={{ fontWeight: currentPage === number ? 'bold' : 'normal' }}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ProductsList;
