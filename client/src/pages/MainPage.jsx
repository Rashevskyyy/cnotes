import React from "react";
import { styled } from "@mui/system";
import Header from "../components/Header";
import NotesList from "../components/NotesList";

const FlexContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  background: "#f5f6f7",
  height: "100vh",
});

const MainPage = () => {
  return (
    <FlexContainer>
      <Header />
      <NotesList />
    </FlexContainer>
  );
};

export default MainPage;
