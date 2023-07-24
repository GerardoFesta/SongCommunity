import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../style/trylogo.png'
import { connect } from 'react-redux';

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends React.Component {
    render() {
        const { isAuthenticated } = this.props;

        return (
            <React.Fragment>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/songs/list" className="nav-link">
                                List Song
                            </Link>
                        </Item>
                        {isAuthenticated && (
                            <Item>
                                <Link to="/community" className="nav-link">
                                    Community
                                </Link>
                            </Item>
                        )}
                        {!isAuthenticated && (
                            <Item>
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </Item>
                        )}
                        {!isAuthenticated && (
                            <Item>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </Item>
                        )}
                        {isAuthenticated && (
                            <Item>
                                <Link to="/areaPersonale" className="nav-link">
                                    Preferite
                                </Link>
                            </Item>
                        )}

                        {isAuthenticated && (
                            <Item>
                                <Link to="/statistiche" className="nav-link">
                                    Statistiche
                                </Link>
                            </Item>
                        )}

                        {isAuthenticated && (
                            <Item>
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

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user, // Se lo stato contiene l'utente, allora l'utente è autenticato
});

export default connect(mapStateToProps)(Links);
