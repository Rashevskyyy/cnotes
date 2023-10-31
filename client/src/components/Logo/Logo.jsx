import React from "react";
import { useNavigate } from "react-router-dom";
import {LogoContainer, LogoTypography, StyledDivider} from './LogoStyle';

const Logo = () => {
  const navigate = useNavigate();

  const handleGoMain = () => {
    navigate("/notes");
  };

  return (
    <>
      <LogoContainer onClick={handleGoMain}>
        <img
          src="https://www.svgrepo.com/show/212454/note-notepad.svg"
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
