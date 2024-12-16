import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import logo from '../../assets/img/LogoREDAtlasLabel.webp';
import BasicDrawer from './BasicDrawer';

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #FAFAFA;
    box-shadow: none;
  }
`;

const Logo = styled.img`
  width: 11rem;
`;

const Title = styled.div`
  flex-grow: 1;
  font-family: 'Avenir Next LT Pro', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  margin-left: 16px;
  margin-top: 4px;
`;

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <BasicDrawer />
          <Logo src={logo} alt="logo" />
          <Title>VALUATIONS</Title>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

export default Header;
