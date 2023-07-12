import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../style/trylogo.png'



class Logo extends Component {
    render() {
        return (
            <div>
                <Link to="/Home" className="navbar-brand">
                    <img src={logo} width="110" height="100" />
                </Link>
                
            </div>
        )
    }
}

export default Logo