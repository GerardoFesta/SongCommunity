import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { SongList, SongUpdate, SongInsert} from '../pages'
import Register from '../pages/Register';
import Login from '../pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css'
import AreaPersonale from '../pages/AreaPersonale';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/songs/list" element={<SongList />} />
                <Route path="/songs/create" element={<SongInsert />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/songs/update/:id"
                    element={<SongUpdate />}
                />
                <Route path="/areaPersonale" element={<AreaPersonale />} />
            </Routes>
        </Router>
    )
}

export default App