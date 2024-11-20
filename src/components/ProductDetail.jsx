import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import axios from 'axios';
import './ProductDetail.css'; // Assurez-vous de lier un fichier CSS pour le style
import { useCart } from './CartContext'; // Importer le hook pour le panier

const ProductDetail = () => {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, cart } = useCart(); // Ajouter le contexte du panier
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/products/name/${name}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details:', err);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        if (name) {
            fetchProductDetails();
        }
    }, [name, navigate]);

    if (!product) return <div>Loading...</div>;

    const imageUrl = `http://localhost:3000/uploads/${product.images_produit}`;

    const totalAmount = cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);

    return (
        <div className="product-detail-container">
            <button onClick={() => navigate('/')} className="back-btn">Retour</button>
            <div className="product-detail">
                <div className="product-image-container">
                    <img
                        className="product-image1"
                        src={imageUrl}
                        alt={product.nomProduit}
                    />
                </div>
                <div className="product-info">
                    <h2 className="product-title">{product.nomProduit}</h2>
                    <p className="product-price"><strong>Prix:</strong> {product.prix} $</p>
                    <p className="product-description"><strong>Description:</strong> {product.description}</p>
                    <p className="product-type"><strong>Type:</strong> {product.typeProduit}</p>
                    <p className="product-type"><strong>Référence:</strong> {product.reference}</p>
                    
                    {/* Ajouter le bouton "Ajouter au panier" */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product); // Ajouter au panier
                        }}
                        className="add-to-cart-btn"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>

            {/* Afficher l'icône du panier et total */}
            <div className="cart-icon" onClick={() => navigate('/cart')}>
                <FaShoppingCart size={30} />
                <span>{cart.length}</span>
                <span>{totalAmount.toFixed(2)} $</span>
            </div>
        </div>
    );
};

export default ProductDetail;
