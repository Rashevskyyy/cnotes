import React from "react";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import {Search, SearchIconWrapper, StyledAppBar, StyledInputBase} from './HeaderStyle';

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Search>
          <StyledInputBase
            placeholder="Поиск…"
            inputProps={{ "aria-label": "search" }}
          />
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "rgba(39,48,58,0.7)", zIndex: "2" }} />
          </SearchIconWrapper>
        </Search>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
