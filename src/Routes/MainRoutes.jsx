import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom"
import DefaultRoute from '../Sections/DefaultRoute';
import Search from '../Sections/SearchPage/Search';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import ProductDisplay from '../Components/ProductDisplay';

const RouterSetup = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<DefaultRoute />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product" element={<ProductDisplay />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const MainRoutes = () => {
  return (
    <>
      <Router>
        <RouterSetup />
      </Router>
    </>
  )
}

export default MainRoutes;
