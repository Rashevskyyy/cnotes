import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import Sidebar from "./Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../store/slices/userSlice";

const FullHeightGrid = styled(Grid)(({ theme }) => ({
  minHeight: "100vh",
}));

const PrivateRoutes = () => {
  const isAuthenticated = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserInfo());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <FullHeightGrid container>
      <Grid item xs={4} md={3} lg={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} md={9} lg={10}>
        <Outlet />
      </Grid>
    </FullHeightGrid>
  );
};

export default PrivateRoutes;
