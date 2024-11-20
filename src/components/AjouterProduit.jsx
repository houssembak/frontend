import React, { useState } from "react";
import axios from "axios";
import './AjouterProduit.css';

const AddProduct = () => {
  const [nomProduit, setNomProduit] = useState("");
  const [typeProduit, setTypeProduit] = useState("");
  const [prix, setPrix] = useState("");
  const [imageProduit, setImageProduit] = useState(null);
  const [description, setDescription] = useState("");  // Nouveau champ pour la description
  const [reference, setReference] = useState("");  // Nouveau champ pour la référence
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setImageProduit(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupérer le token du localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Vous devez être connecté pour ajouter un produit.');
      return;
    }

    const formData = new FormData();
    formData.append("nomProduit", nomProduit);
    formData.append("typeProduit", typeProduit);
    formData.append("prix", prix);
    formData.append("imageProduit", imageProduit); 
    formData.append("description", description);  // Ajouter la description
    formData.append("reference", reference);  // Ajouter la référence

    try {
      // Send the request to the backend
      const response = await axios.post("http://localhost:3000/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}` // If you have authentication
        }
      });

      // Si le produit est ajouté avec succès
      setSuccess('Produit ajouté avec succès!');
      setError('');

      // Réinitialiser les champs du formulaire
      setNomProduit('');
      setTypeProduit('');
      setPrix('');
      setDescription('');  // Réinitialiser la description
      setReference('');  // Réinitialiser la référence
      setImageProduit(null);

      console.log(response.data);
    } catch (error) {
      setError('Erreur lors de l\'ajout du produit : ' + (error.response?.data?.message || error.message));
      setSuccess('');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Ajouter un nouveau produit</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du produit :</label>
          <input
            type="text"
            value={nomProduit}
            onChange={(e) => setNomProduit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type de produit :</label>
          <input
            type="text"
            value={typeProduit}
            onChange={(e) => setTypeProduit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prix du produit :</label> 
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description du produit :</label>
          <input
          type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Référence du produit :</label>  {/* Nouveau champ pour la référence */}
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image du produit :</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Ajouter le produit</button>
      </form>
    </div>
  );
};

export default AddProduct;
