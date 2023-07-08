import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";
import {useNavigate} from 'react-router-dom';

const StyledDivider = styled(Divider)({
  backgroundColor: "#455260",
  width: "100%",
});

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  paddingLeft: 24,
  paddingRight: 24,
  cursor: 'pointer'
});

const LogoTypography = styled(Typography)({
  padding: 8,
  color: "#ffffff",
});

const Logo = () => {
  const navigate = useNavigate();

  const handleGoMain = () => {
    navigate('/notes')
  }

  return (
    <>
      <LogoContainer onClick={handleGoMain}>
        <img
          src="https://img.icons8.com/office/40/null/logo.png"
          alt="Logo"
          width="40"
          height="40"
        />
        <LogoTypography variant="h6" noWrap>
          Creative Notes
        </LogoTypography>
      </LogoContainer>
      <StyledDivider />
    </>
  );
};

export default Logo;
