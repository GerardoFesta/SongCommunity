import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})``

const StyledNavbar = styled.nav`
  &.navbar {
    border-radius: 20px; /* Arrotonda i bordi */
    padding: 2px; /* Riduci la dimensione */

    /* Aggiungi altri stili se necessario */
  }
`;

class NavBar extends Component {
  render() {
    return (
      <Container>
        <StyledNavbar className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Logo />
          <Links />
        </StyledNavbar>
      </Container>
    );
  }
}








export default NavBar