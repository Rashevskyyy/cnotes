import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Box,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useMutation } from "react-query";
import { deleteNoteApi, fetchNotesByUser } from "../../api/routes";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const DescriptionTypography = styled(Typography)({
  height: "3em",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
});

const Note = ({ tag, title, description, firstName, date, idNote, href }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTagColor = (tag) => {
    switch (tag) {
      case "Management":
        return "#f44336";
      case "Development":
        return "#2196f3";
      case "Design":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const tagColor = getTagColor(tag);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: handleDelete } = useMutation(() => deleteNoteApi(idNote), {
    onSuccess: () => {
      handleClose();
      dispatch(fetchNotesByUser());
      toast.success("Заметка удалена");
    },
    onError: (error) => {
      console.log("e", error);
    },
  });

  const handleCardClick = () => {
    navigate(`/notes/${idNote}`);
  };

  return (
    <Card sx={{ borderRadius: "8px" }}>
      <CardHeader
        avatar={<div style={{ backgroundColor: "red", borderRadius: "50%" }} />}
        title={
          <Typography
            onClick={handleCardClick}
            variant="subtitle1"
            component="span"
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              color: tagColor,
              fontWeight: "bold",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: tagColor,
                marginRight: "12px",
              }}
            ></span>
            {tag}
          </Typography>
        }
        style={{ paddingBottom: 0, paddingTop: 16, paddingLeft: 0 }}
      />
      <CardContent style={{ cursor: "pointer" }} onClick={handleCardClick}>
        <Typography variant="h5" component="div" style={{ paddingBottom: 8 }}>
          {title}
        </Typography>
        <DescriptionTypography variant="body2" color="text.secondary">
          {description}
        </DescriptionTypography>
      </CardContent>
      <Divider sx={{ width: "85%", mx: "auto" }} />
      <Box p={2}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar />
              </Grid>
              <Grid item>
                <Typography variant="body2">{firstName}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">{date}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {href === "/notes" && (
            <Grid item>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete}>Удалить</MenuItem>
              </Menu>
            </Grid>
          )}
        </Grid>
      </Box>
    </Card>
  );
};

export default Note;
