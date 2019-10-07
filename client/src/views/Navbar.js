import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import {ChevronRight, ChevronLeft, ExitToApp, PostAdd} from "@material-ui/icons";
import {UserDataContext} from "../hoc/Authentication";
import {NavLink} from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import AddIdeaDialog from "../components/AddIdeaDialog";

const Toolbar = styled.div`

`;

const Nav = styled(Drawer)`
  & > div {
    right: ${(props) => props.open ? '0' : '-115px'};
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
  const [addIdeaModal, setAddIdeaModal] = useState(false);
  const handleDrawerToggle = () => {
    setNavStatus(!navStatus);
  };
  const {content, handleLogout} = useContext(UserDataContext);

  const handleIdeaSubmit = (data) => {
    console.log(data);
    setAddIdeaModal(false);
  }

  const loginLink = !content._id && (
    <Link to="/login">
      <ListItem button>
        <ListItemIcon><ExitToApp/></ListItemIcon>
        <ListItemText primary="Zaloguj"/>
      </ListItem>
    </Link>
  );

  const userHeader = content.name && (
    <Link to="/profile">
      <ListItem button>
        <ListItemIcon><UserAvatar type={`${content.gender}-${content.imgNumber}`}/></ListItemIcon>
        <ListItemText primary={content.name.split(' ')[0]}/>
      </ListItem>
    </Link>
  );

  const logOutButton = content._id && (
    <ListItem button onClick={handleLogout}>
      <ListItemIcon><ExitToApp/></ListItemIcon>
      <ListItemText primary="Wyloguj"/>
    </ListItem>
  );

  const addIdea = content._id && (
    <ListItem button onClick={() => setAddIdeaModal(true)}>
      <ListItemIcon><PostAdd/></ListItemIcon>
      <ListItemText primary="Dodaj pomysł"/>
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
          {navStatus ? <ChevronRight/> : <ChevronLeft/>}
        </IconButton>
      </Toolbar>
      <Divider/>
      <List>
        {loginLink}
        {userHeader}
        {addIdea}
        {logOutButton}
      </List>
      <AddIdeaDialog open={addIdeaModal} onClose={() => setAddIdeaModal(false)} onSubmit={handleIdeaSubmit}/>
    </Nav>
  )
};

export default Navbar;
