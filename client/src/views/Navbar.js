import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Drawer, Divider, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@material-ui/core";
import { ChevronRight, ChevronLeft, ExitToApp} from "@material-ui/icons";
import { UserDataContext } from "../hoc/Authentication";
import {NavLink} from "react-router-dom";
import UserAvatar from "../components/UserAvatar";

const Toolbar = styled.div`

`;

const Nav = styled(Drawer)`
  & > div {
    right: ${(props) => props.open ? '0': '-115px'};
    width: 170px;
    transition: right .3s ease-out;
  }
`;

const Link = styled(NavLink)`
  &&, &:hover, &:focus, &:visited {
    color: inherit;
    text-decoration: none;
  }
`

const Navbar = () => {
  const [navStatus, setNavStatus] = useState(false);
  const handleDrawerToggle = () => { setNavStatus(!navStatus); };
  const { content, handleLogout } = useContext(UserDataContext)

  const loginLink = !content._id && (
    <ListItem button>
      <ListItemIcon><ExitToApp/></ListItemIcon>
      <Link to="/login"><ListItemText primary="Zaloguj" /></Link>
    </ListItem>
  );

  const userHeader = content.name && (
    <ListItem button>
      <ListItemIcon><UserAvatar type={`${content.gender}-${content.imgNumber}`} /></ListItemIcon>
      <Link to="/profile"><ListItemText primary={content.name.split(' ')[0]} /></Link>
    </ListItem>
  );

  const logOutButton = content._id && (
    <ListItem button onClick={handleLogout}>
      <ListItemIcon><ExitToApp/></ListItemIcon>
      <ListItemText primary="Wyloguj" />
    </ListItem>
  );

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
        {loginLink}
        {userHeader}
        {logOutButton}
      </List>
    </Nav>
  )
};

export default Navbar;
