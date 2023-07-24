import React from "react";
import { styled } from "@mui/system";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import { useParams } from "react-router-dom";

const FlexContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  background: "#f5f6f7",
  height: "100vh",
});

const MainPage = () => {
  let { id } = useParams();
  console.log("id", id);
  return (
    <FlexContainer>
      <Header />
      <NotesList />
    </FlexContainer>
  );
};

export default MainPage;
