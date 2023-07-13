
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../style/trylogo.png'

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
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/songs/list" className="nav-link">
                                List Song
                            </Link>
                        </Item>
                        {localStorage.getItem('isAuthenticated') && (<Item>
                            <Link to="/community" className="nav-link">
                                Community 
                            </Link>
                        </Item>)}
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
                                Preferite
                            </Link>
                        </Item>
                        )}
                        
                        {localStorage.getItem('isAuthenticated') && (<Item>
                            <Link to="/statistiche" className="nav-link">
                                Statistiche
                            </Link>
                        </Item>
                        )}


                        {localStorage.getItem('isAuthenticated') && (<Item>
                            <Link to="/logout" className="nav-link">
                                Logout
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