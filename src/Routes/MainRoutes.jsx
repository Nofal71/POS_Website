import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';
import DefaultRoute from '../Sections/DefaultRoute';
import Search from '../Sections/SearchPage/Search';


const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DefaultRoute />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </Router>
  )
}

export default MainRoutes
