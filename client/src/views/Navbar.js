import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Drawer, Divider, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@material-ui/core";
import { ChevronRight, ChevronLeft, ExitToApp} from "@material-ui/icons";
import { UserDataContext } from "../hoc/Authentication";

const Toolbar = styled.div`

`;

const Nav = styled(Drawer)`
  & > div {
    right: ${(props) => props.open ? '0': '-115px'};
    width: 170px;
    transition: right .3s ease-out;
  }
  
`;

const Navbar = () => {
  const [navStatus, setNavStatus] = useState(false);
  const handleDrawerToggle = () => { setNavStatus(!navStatus); };
  const userData = useContext(UserDataContext)

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
          <ListItem button>
            <ListItemIcon><ExitToApp/></ListItemIcon>
            <ListItemText primary="Zaloguj" />
          </ListItem>
      </List>
    </Nav>
  )
};

export default Navbar;
