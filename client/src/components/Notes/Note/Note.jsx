import React from "react";
import {
  Card,
  CardContent,
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
import { deleteNoteApi, fetchNotesByUser } from "../../../api/routes";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {StyledCardHeader, StyledTypography, StyledAvatar, StyledSpan, DescriptionTypography, CardStyled} from './NoteStyled';

export const tagColors = {
    Management: "#f44336",
    Development: "#2196f3",
    Design: "#4caf50",
    Default: "#9e9e9e"
};

const Note = ({ tag, title, description, firstName, date, idNote, href }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState(null);

  const getTagColor = (tag) => {
      return tagColors[tag] || tagColors.Default;
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
      dispatch(fetchNotesByUser({}));
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
    <CardStyled sx={{ borderRadius: "8px" }}>
        <StyledCardHeader
            avatar={<StyledAvatar />}
            title={
                <StyledTypography
                    onClick={handleCardClick}
                    variant="subtitle1"
                    component="span"
                    tagColor={tagColor}
                >
                    <StyledSpan tagColor={tagColor} />
                    {t(`${tag.toLowerCase()}`)}
                </StyledTypography>
            }
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
                <MenuItem onClick={handleDelete}>{t('delete')}</MenuItem>
              </Menu>
            </Grid>
          )}
        </Grid>
      </Box>
    </CardStyled>
  );
};

export default Note;
