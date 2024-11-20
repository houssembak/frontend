// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { CartProvider } from './components/CartContext';
import Cart from './components/Cart';
import SuperadminDashboard from './components/SuperadminDashboard';
import Payment from "./components/Payment";
import ListProducts from "./components/ListProducts";
import AjouterProduit from "./components/AjouterProduit";
import ProductDetail from "./components/ProductDetail";
import ProductsList from './components/Product';
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import UpdateProductForm from "./components/UpdateProductForm";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./components/AuthContext";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <AuthProvider>
           <CartProvider> {/* Envelopper avec CartProvider */}
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/ajouterproduit" element={<AjouterProduit />} /> 
            <Route path="/listproduit" element={<ProductsList />} />
            <Route path="/listproducts" element={<ListProducts/>}/>
            <Route path="/product/:name" element={<ProductDetail />} />
            <Route path ="/updateproduct" element={<UpdateProductForm/>}/>
            <Route path="/superadmin/dashboard" element={<SuperadminDashboard />} />
            <Route path="/cart" element={<Cart />} /> {/* Ajouter le chemin pour le panier */}

            <Route path="/" element={
              <>
                <Header data={landingPageData.Header} />
                <About data={landingPageData.About} />
                <Services data={landingPageData.Services} />
                <Gallery data={landingPageData.Gallery} />
                <Testimonials data={landingPageData.Testimonials} />
                <Team data={landingPageData.Team} />
                <Contact data={landingPageData.Contact} />
              </>
            } />
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
