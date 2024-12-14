import styled from 'styled-components';
import { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/img/LogoREDAtlasLabel.webp';

const DrawerContainer = styled(Box)`
  width: 250px;
  text-align: center;
  padding: 16px;
`;

const DrawerHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 10px;
`;

const Logo = styled.img`
  width: 11rem;
`;

const StyledIconButton = styled(IconButton)`
  margin-right: 2px;
`;

export default function BasicDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean | ((prevState: boolean) => boolean)) => () => {
    setDrawerOpen(newOpen);
  };

  const DrawerList = (
    <DrawerContainer role="presentation">
      <DrawerHeader>
        <IconButton
          size="large"
          color="inherit"
          aria-label="drawer"
          onClick={toggleDrawer(false)}
        >
          <MenuIcon />
        </IconButton>
        <Logo src={logo} alt="Placeholder" />
      </DrawerHeader>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon sx={{ minWidth: '34px' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Página Principal"  primaryTypographyProps={{
              sx: {
                textAlign: 'start',
                fontFamily: 'Avenir Next LT Pro, sans-serif',
                fontSize: '0.875rem',
                lineHeight: '1.75',
                fontWeight: 'bold',
              },
            }} />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerContainer>
  );

  return (
    <Box>
      <StyledIconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="drawer"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </StyledIconButton>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
