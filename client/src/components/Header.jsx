import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/system';
import {Box, Typography} from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  display: 'flex'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '40ch',
      },
    },
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    borderColor: "#27303a40",
    borderWidth: 1,
    borderStyle: 'solid',
    color: "#455260",
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e0e0e0',
  boxShadow: 'unset'
}));

const Header = () => {

  return (
       <StyledAppBar position="static">
         <Toolbar>
           <Search>
             <StyledInputBase
                 placeholder="Поиск…"
                 inputProps={{ 'aria-label': 'search' }}
             />
             <SearchIconWrapper>
               <SearchIcon sx={{ color: "rgba(39,48,58,0.7)", zIndex: '2' }} />
             </SearchIconWrapper>
           </Search>
         </Toolbar>
       </StyledAppBar>
  );
};

export default Header;
