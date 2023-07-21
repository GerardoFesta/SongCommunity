import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { SongList} from '../pages'
import Register from '../pages/Register';
import Login from '../pages/Login';
import CommunityPage from '../pages/CommunityPage'
import StatisticsPage from '../pages/StatisticsPage'
import SongDetails from '../pages/SongDetails';

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
                <Route path="/songs/:id" element={<SongDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/areaPersonale" element={<AreaPersonale />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/statistiche" element={<StatisticsPage />} />
                <Route path="" element={<Home />} />
                <Route path="/logout" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App