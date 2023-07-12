import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { SongList, SongUpdate} from '../pages'
import Register from '../pages/Register';
import Login from '../pages/Login';
import CommunityPage from '../pages/CommunityPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import AreaPersonale from '../pages/AreaPersonale';
import Home from '../pages/Home';
import { NavbarBrand } from 'react-bootstrap';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/songs/list" element={<SongList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/songs/update/:id"
                    element={<SongUpdate />}
                />
                <Route path="/areaPersonale" element={<AreaPersonale />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App