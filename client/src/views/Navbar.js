import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Drawer, Divider, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@material-ui/core";
import { ChevronRight, ChevronLeft, Inbox, Mail, ExitToApp} from "@material-ui/icons";

import { login } from '../queries/queries'
import {setCookie} from "../helpers/functions";

const Toolbar = styled.div`

`;

const Nav = styled(Drawer)`
  & > div {
    right: ${(props) => props.open ? '0': '-115px'};
    width: 170px;
    transition: right .3s ease-out;
  }
  
`;

const Navbar = (props) => {
  const [navStatus, setNavStatus] = useState(false);
  const handleDrawerToggle = () => { setNavStatus(!navStatus); };

  const handleLogin = () => {
    props.login({ variables: {
        email: 'pkonefal@pgs-soft.com',
        password: 'Fa8a22aC!'
      }}).then(({ data }) => setCookie('access_token', data.login.token, 7))
  };

  return (
    <Nav
      variant="permanent"
      open={navStatus}
      anchor="right"
    >
      <Toolbar>
        <IconButton onClick={handleDrawerToggle}>
          {navStatus  ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
          <ListItem button onClick={handleLogin}>
            <ListItemIcon><ExitToApp/></ListItemIcon>
            <ListItemText primary="Zaloguj" />
          </ListItem>
      </List>
    </Nav>
  )
};

export default graphql(login, { name: "login" })(Navbar);
