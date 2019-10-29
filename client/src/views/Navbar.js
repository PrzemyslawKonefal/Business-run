import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { ExitToApp, PostAdd} from "@material-ui/icons";
import {UserDataContext} from "../hoc/Authentication";
import {NavLink} from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import AddIdeaDialog from "../components/AddIdeaDialog";

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
  const [addIdeaModal, setAddIdeaModal] = useState(false);
  const {content, handleLogout} = useContext(UserDataContext);
  const loginLink = !content._id && (
    <Link to="/login">
      <ListItem button>
        <ListItemIcon><ExitToApp/></ListItemIcon>
        <ListItemText primary="Zaloguj"/>
      </ListItem>
    </Link>
  );

  const userHeader = content.name && (
    <Link to={`/profile/${content._id}`}>
      <ListItem button>
        <ListItemIcon><UserAvatar type={`${content.gender}-${content.imgNumber}`} small/></ListItemIcon>
        <ListItemText primary={content.name.split(' ')[0]}/>
      </ListItem>
    </Link>
  );

  const logOutButton = content._id && (
    <ListItem button onClick={handleLogout}>
      <ListItemText primary="Wyloguj" inset/>
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
      open={true}
      anchor="right"
    >
      <List>
        {loginLink}
        {userHeader}
        {addIdea}
        {logOutButton}
      </List>
      <AddIdeaDialog open={addIdeaModal} onClose={() => setAddIdeaModal(false)} onSubmit={() => setAddIdeaModal(false)}/>
    </Nav>
  )
};

export default Navbar;
