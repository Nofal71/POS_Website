import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';
import DefaultRoute from '../Sections/DefaultRoute';
import Search from '../Sections/SearchPage/Search';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Alert from '../Components/common/Alert';
import Modal from '../Components/common/Modal';


const MainRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Alert />
      <Modal />
      <Routes>
        <Route path='/' element={<DefaultRoute />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default MainRoutes
