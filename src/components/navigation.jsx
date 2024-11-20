import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./navigation.css";
export const Navigation = () => {
  const { isAuthenticated, username, logout } = useContext(AuthContext); // Ajoutez `role` ici
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
  };
  return (
    <nav id="menu" className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          SMART ELECTROMANAGER
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
            </li>
            <li className="nav-item">
              <Link to="/listproduit" className="nav-link">Product</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={`Welcome, ${username}`}
                    className="nav-link"
                  >
                    <Dropdown.Item>Profil</Dropdown.Item>     
                      <Dropdown.Item>
                        <Link to="/ajouterproduit">Ajouter Produit</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/listproducts">list des  Produits</Link>
                      </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </DropdownButton>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
