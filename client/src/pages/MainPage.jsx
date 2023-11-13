import React from "react";
import { styled } from "@mui/system";
import Header from "../components/Header/Header";
import NotesList from "../components/Notes/NotesList";

const FlexContainer = styled("div")(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  background: theme.palette.primary.cream,
  height: "100%",
}));

const MainPage = () => {
  return (
    <FlexContainer>
      <Header />
      <NotesList />
    </FlexContainer>
  );
};

export default MainPage;
