import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { SongList, SongUpdate, SongInsert } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/songs/list" element={<SongList />} />
                <Route path="/songs/create" element={<SongInsert />} />
                <Route
                    path="/songs/update/:id"
                    element={<SongUpdate />}
                />
            </Routes>
        </Router>
    )
}

export default App