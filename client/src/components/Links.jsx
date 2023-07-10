
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    SongCommunity
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/songs/list" className="nav-link">
                                List Song
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/songs/create" className="nav-link">
                                Create 
                            </Link>
                        </Item>
                        {!localStorage.getItem('isAuthenticated') && (
                        <Item>
    
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </Item>
                        )}
                        {!localStorage.getItem('isAuthenticated') && (<Item>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </Item>
                        )}
                        {localStorage.getItem('isAuthenticated') && (<Item>
                            <Link to="/areaPersonale" className="nav-link">
                                Area Personale
                            </Link>
                        </Item>
                        )}
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links