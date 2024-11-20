import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListProducts.css'; // Créez un fichier CSS pour ajouter du style au tableau
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importez les icônes de modification et suppression

const ListProducts = () => {
    const [products, setProducts] = useState([]);

    // Récupérer la liste des produits via l'API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products/listproducts');
                setProducts(response.data);  // Mettre à jour l'état avec les produits récupérés
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); // Le tableau vide [] signifie que l'effet se lance une seule fois au montage du composant

    // Fonction pour supprimer un produit
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            setProducts(products.filter(product => product.id !== id));  // Supprimer le produit du state
            alert("Produit supprimé avec succès");
        } catch (error) {
            console.error('Error deleting product:', error);
            alert("Une erreur s'est produite lors de la suppression du produit.");
        }
    };

    // Fonction pour modifier un produit (redirige vers la page de modification)
    const handleEdit = (id) => {
        // Ici, on peut rediriger l'utilisateur vers une page de modification
        // Par exemple : /edit-product/{id}
        window.location.href = `/edit-product/${id}`; // Vous pouvez adapter cela si vous utilisez react-router
    };

    return (
        <div className="products-list-container">
            <h1>Liste des Produits</h1>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Nom du Produit</th>
                        <th>Type</th>
                        <th>Prix</th>
                        <th>Description</th>
                        <th>Référence</th>
                        <th>Image</th>
                        <th>Actions</th> {/* Nouvelle colonne pour les boutons */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.nomProduit}</td>
                            <td>{product.typeProduit}</td>
                            <td>{product.prix} $</td>
                            <td>{product.description}</td>
                            <td>{product.reference}</td>
                            <td><img src={`http://localhost:3000/uploads/${product.images_produit}`} alt={product.nomProduit} width="50" height="50" /></td>
                            <td className="actions">
                                {/* Boutons de modification et suppression */}
                                <button onClick={() => handleEdit(product.id)} className="edit-btn">
                                    <FaEdit size={20} />
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="delete-btn">
                                    <FaTrash size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProducts;
