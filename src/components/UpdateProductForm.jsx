import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProductForm.css';  // Assurez-vous d'inclure le CSS pour ce formulaire

const UpdateProductForm = ({ productId }) => {
  const [product, setProduct] = useState({
    nomProduit: '',
    typeProduit: '',
    description: '',
    reference: '',
    imageProduit: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Charger les données du produit à partir du backend
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageProduit: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('nomProduit', product.nomProduit);
    formData.append('typeProduit', product.typeProduit);
    formData.append('description', product.description);
    formData.append('reference', product.reference);
    if (product.imageProduit) {
      formData.append('imageProduit', product.imageProduit);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/${productId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessage('Produit mis à jour avec succès');
      setProduct(response.data);
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du produit');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-product-form">
      <h2>Mettre à jour le produit</h2>
      {message && <p className="message">{message}</p>}
      {loading ? <p>Chargement...</p> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom du produit :</label>
            <input
              type="text"
              name="nomProduit"
              value={product.nomProduit}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Type de produit :</label>
            <input
              type="text"
              name="typeProduit"
              value={product.typeProduit}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description :</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Référence :</label>
            <input
              type="text"
              name="reference"
              value={product.reference}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Image du produit (optionnel) :</label>
            <input
              type="file"
              name="imageProduit"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Mise à jour en cours...' : 'Mettre à jour le produit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProductForm;
