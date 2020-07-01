import * as React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

export interface NavigationProps {
  home: string
  links: string
}

export const Navigation: React.FC<NavigationProps> = props => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">redux-ts Starter</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={location.hash}>
          <Nav.Link href={props.home}>Home</Nav.Link>
          <Nav.Link href={props.links}>Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)
