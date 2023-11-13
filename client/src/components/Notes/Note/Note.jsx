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
import {StyledCardHeader, StyledTypography, StyledAvatar, StyledSpan, DescriptionTypography, CardStyled, TagsContainer, StyledChip} from './NoteStyled';
import ReactAvatar from 'react-avatar';

export const tags = {
    work: "work",
    personal: "personal",
    education: "education",
    hobbies: "hobbies",
    finance: "finance",
    technology: "technology",
    family: "family",
    travel: "travel",
};

const Note = ({ tag, title, description, firstName, lastName, date, idNote, href }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState(null);

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
    <CardStyled>
        <StyledCardHeader
            avatar={<StyledAvatar />}
            title={
                <div>
                    <TagsContainer>
                        {tag.map((tag, index) => (
                            <StyledChip key={index} label={t(`${tag}`)} />
                        ))}
                    </TagsContainer>
                </div>
            }
        />
      <Divider sx={{ width: "100%", mx: "auto" }} />
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
                  <ReactAvatar name={firstName + " " + lastName} size="40" round={true} />
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
