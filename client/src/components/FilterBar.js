import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  Grid,
} from "@mui/material";

const FilterBar = () => {
  const handleFilterClick = (filter) => {
    console.log(`Фильтрация по: ${filter}`);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ minHeight: "100px !important" }}>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div">
              Notes
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ ml: 2 }}>
              <Button
                variant="outlined"
                onClick={() => handleFilterClick("filter1")}
              >
                Фильтр 1
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleFilterClick("filter2")}
                sx={{ ml: 1 }}
              >
                Фильтр 2
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
      <Divider sx={{ width: "85%", mx: "auto" }} />
    </AppBar>
  );
};

export default FilterBar;
