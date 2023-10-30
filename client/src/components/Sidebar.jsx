import React from "react";
import { Drawer } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "./Logo";
import Profile from "./Profile";
import NavigationLinks from "./NavigationLinks";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  width: "100%",
  "& .MuiDrawer-paper": {
    maxWidth: "100%",
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    position: "unset",
  },
  height: "100vh",
  minHeight: "100%",
}));

const Sidebar = () => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Logo />
      <Profile />
      <NavigationLinks />
    </StyledDrawer>
  );
};

export default Sidebar;
