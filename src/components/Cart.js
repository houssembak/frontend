import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le panier

const Cart = () => {
    const { cart, removeFromCart, clearCart,increaseQuantity, decreaseQuantity } = useCart();
    const totalAmount = cart.reduce((acc, product) => acc + product.prix * product.quantity, 0);
    const navigate=useNavigate();
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Votre panier est vide, vous ne pouvez pas valider les achats.");
        } else {
            // Redirection vers une page de paiement ou de confirmation (exemple ici: "/checkout")
            navigate('/payment');
        }
    };


    return (
        <div className="cart-container">
            <h2 className="cart-title">Listes d'achats</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Votre panier est vide.</p>
            ) : (
                <div className="cart-items">
                    <ul>
                        {cart.map((product) => (
                            <li key={product.id} className="cart-item">
                                <div className="cart-item-details">
                                    <img 
                                        src={product.images_produit} 
                                        alt={product.nomProduit} 
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <p className="cart-item-name">{product.nomProduit}</p>
                                        <p className="cart-item-quantity">Quantité : {product.quantity}</p>
                                        <p className="cart-item-price">
                                            {product.prix} $ x {product.quantity} = {product.prix * product.quantity} $
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => increaseQuantity(product.id)} 
                                    className="add-item-btn"
                                >
                                  +
                                </button>
                                <button 
                                    onClick={() => decreaseQuantity(product.id)} 
                                    className="delete-item-btn"
                                >
                                   -
                                </button>
                                <button 
                                    onClick={() => removeFromCart(product.id)} 
                                    className="remove-item-btn"
                                >
                                    Retirer
                                </button>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="cart-total">
                <h3>Total : {totalAmount.toFixed(2)} $</h3>
                <button onClick={clearCart} className="clear-cart-btn">Vider le panier</button>
                <button onClick={handleCheckout} className="clear-cart1-btn">Valider mes achats</button>

            </div>
        </div>
    );
};

export default Cart;
