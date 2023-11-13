import React, {useEffect, useState} from "react";
import {
    Box, Chip,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useSelector} from 'react-redux';
import ValidationError from '../../ValidationError/ValidationError';
import {
    AddCommentButton,
    BackButton,
    GridStyled,
    SaveButton,
    TypographyStyled,
    TagTypography,
    TagIndicator
} from './NoteDetailStyle';
import {tags} from '../Note/Note';
import {useTranslation} from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useMutation} from "react-query";
import {likeNoteApi} from "../../../api/routes";
import ReactAvatar from "react-avatar";

function getLikesText(count, lang) {
    if (lang === 'en') {
        return count === 1 ? 'like' : 'likes';
    } else if (lang === 'ua') {
        if (count === 1) {
            return 'вподобайка';
        } else if (count >= 2 && count <= 4) {
            return 'вподобайки';
        } else {
            return 'вподобайок';
        }
    }
}

const NoteDetail = (props) => {
    const {t, i18n} = useTranslation()
    const {selectedNote, handleBack, handleCreateComment, handleUpdateNote} = props;
    const user = useSelector((state) => state.user);
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [likes, setLikes] = useState(selectedNote?.likes?.length || 0);
    const [isLiked, setIsLiked] = useState(selectedNote.likes ? selectedNote.likes.includes(user?.user?._id) : false);
    const isAuthor = user && selectedNote ? user?.user?._id === selectedNote?.userId : false
    const isPublished = selectedNote ? selectedNote.isPublished : false

    const {formState: {errors, isDirty}, setValue, register, handleSubmit, reset, control} = useForm({
        mode: 'onBlur',
        defaultValues: {
            title: selectedNote.title || "",
            tag: selectedNote.tag || [],
            description: selectedNote.description || "",
        },
    });

    const onSubmit = (data) => {
        handleUpdateNote(data);
    };

    const onSubmitComment = (data) => {
        handleCreateComment({commentText: data.commentText});
        reset();
    };

    const handleInputClick = () => {
        setIsInputClicked(true);
    };

    const handleLikeClick = () => {
        handleLikeNote();
    };

    const handleTagChange = (event) => {
        setValue("tag", event.target.value);
    };

    const { mutate: handleLikeNote } = useMutation(() => likeNoteApi(selectedNote._id), {
        onSuccess: (data) => {
            setLikes(data.likesCount);
            setIsLiked(!isLiked);
        },
        onError: (error) => {
            console.log("Error liking the note:", error);
        },
    });

    useEffect(() => {
        const isNoteLikedByUser = selectedNote.likes ? selectedNote.likes.includes(user?.user?._id) : false;
        setIsLiked(isNoteLikedByUser);
    }, [selectedNote.likes, user?.user?._id]);

    return (
        <Box p={2}>
            <BackButton
                variant="contained"
                onClick={handleBack}
            >
                <ArrowBackIcon/>
            </BackButton>
            <Paper elevation={3}>
                <Box elevation={3} sx={{padding: "1rem"}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            {isAuthor ? (
                                <>
                                    <GridStyled item xs={1}>
                                        <TypographyStyled variant="body1">
                                            {t('title')}
                                        </TypographyStyled>
                                    </GridStyled>
                                    <Grid item xs={11}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            error={Boolean(errors.title)}
                                            {...register("title", {
                                                required: {
                                                    value: true,
                                                    message: t('errorDefault')
                                                }
                                            })}
                                        />
                                        {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
                                    </Grid>
                                    <GridStyled item xs={1}>
                                        <TypographyStyled variant="body1">
                                          {t('tag')}
                                        </TypographyStyled>
                                    </GridStyled>
                                    <Grid item xs={11}>
                                        <FormControl fullWidth variant="outlined">
                                            <Controller
                                                name="tag"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        labelId="tag-label"
                                                        multiple
                                                        onChange={handleTagChange}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {selected.map((value) => (
                                                                    <Chip
                                                                        key={value}
                                                                        label={t(`${value}`)}
                                                                        style={{background: '#C4AE78'}}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    >
                                                        {Object.keys(tags).map((category, index) => (
                                                            <MenuItem key={index} value={category}>
                                                                {t(`${category}`)}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <GridStyled item xs={1}>
                                        <Typography variant="body1">
                                          {t('description')}
                                        </Typography>
                                    </GridStyled>
                                    <Grid item xs={11}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            error={Boolean(errors.description)}
                                            {...register("description", {
                                                required: {
                                                    value: true,
                                                    message: t('errorDefault')
                                                },
                                                maxLength: {
                                                    value: 300,
                                                    message: t('maxLength', {count: 300})
                                                },
                                            })}
                                        />
                                        {errors.description &&
                                            <ValidationError>{errors.description.message}</ValidationError>}
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <GridStyled item xs={1}>
                                        <TypographyStyled variant="body1">
                                          {t('title')}
                                        </TypographyStyled>
                                    </GridStyled>

                                    <Grid item xs={11}>
                                        <Typography variant="body1">
                                            {selectedNote.title}
                                        </Typography>
                                    </Grid>
                                    <GridStyled item xs={1}>
                                        <TypographyStyled variant="body1">
                                          {t('tag')}
                                        </TypographyStyled>
                                    </GridStyled>

                                    <GridStyled item xs={1}>
                                        <TypographyStyled variant="body1">
                                          {t('description')}
                                        </TypographyStyled>
                                    </GridStyled>

                                    <Grid item xs={11}>
                                        <Typography variant="body1">
                                            {selectedNote.description}
                                        </Typography>
                                    </Grid>
                                </>
                            )}

                            <GridStyled item xs={1}>
                                <TypographyStyled variant="body1">
                                  {t('author')}
                                </TypographyStyled>
                            </GridStyled>

                            <Grid item xs={11}>
                                <Typography variant="body1">
                                    {selectedNote.firstName + ' ' + selectedNote.lastName}
                                </Typography>
                            </Grid>

                            <GridStyled item xs={1}>
                                <TypographyStyled variant="body1">
                                  {t('date')}
                                </TypographyStyled>
                            </GridStyled>
                            <Grid item xs={11}>
                                <Typography variant="body1">
                                    {selectedNote.date}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "right", display: isPublished ? 'flex' : 'unset', justifyContent: 'space-between' }}>
                                {
                                    isPublished ? (
                                        <Box>
                                            <IconButton onClick={handleLikeClick}>
                                                {isLiked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                                            </IconButton>
                                            <Typography variant="body2" component="span">
                                                {`${likes} ${getLikesText(likes, i18n.language)}`}
                                            </Typography>
                                        </Box>
                                    ) : null
                                }

                                {isAuthor ? (
                                        <SaveButton
                                            variant="contained"
                                            type="submit"
                                        >
                                            {t('save')}
                                        </SaveButton>
                                    )
                                    : null
                                }
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Box>
                    <Box sx={{padding: "1rem"}}>
                        <Typography variant="h5" sx={{marginBottom: 1}}>
                          {t('comments')}:
                        </Typography>
                        <Box elevation={3}>
                            {selectedNote.comments && selectedNote.comments.length > 0 ? (
                                selectedNote.comments.map((comment, index) => (
                                    <Box key={index} sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                                        <ReactAvatar
                                            name={`${comment.firstName} ${comment.lastName}`}
                                            size="40"
                                            round={true}
                                            style={{ marginRight: 8 }}
                                        />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {comment.firstName} {comment.lastName}
                                            </Typography>
                                            <Typography variant="body1">
                                                {comment.text}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {comment.date}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                  {t('noComments')}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Divider/>
                    <Box elevation={3} sx={{padding: "1rem"}}>
                        <form onSubmit={handleSubmit(onSubmitComment)}>
                            <Box>
                                <TextField
                                    fullWidth
                                    label={t("enterYourComments")}
                                    variant="outlined"
                                    multiline
                                    rows={isInputClicked ? 4 : 1}
                                    onFocus={handleInputClick}
                                    onBlur={() => setIsInputClicked(false)}
                                    {...register("commentText")}
                                />
                                <AddCommentButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                  {t('addComment')}
                                </AddCommentButton>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default NoteDetail;
