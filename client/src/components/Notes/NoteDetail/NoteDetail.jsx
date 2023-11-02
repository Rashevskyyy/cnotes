import React, {useState} from "react";
import {
    Box,
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
import {tagColors} from '../Note/Note';
import {useTranslation} from 'react-i18next';

const NoteDetail = (props) => {
    const {t} = useTranslation()
    const {selectedNote, handleBack, handleCreateComment, handleUpdateNote} = props;
    const [isInputClicked, setIsInputClicked] = useState(false);
    const user = useSelector((state) => state.user);
    const isAuthor = user && selectedNote ? user?.user?._id === selectedNote?.userId : false

    const getTagColor = (tag) => {
        return tagColors[tag] || tagColors.Default;
    };

    const tagColor = getTagColor(selectedNote.tag);

    const {formState: {errors, isDirty}, register, handleSubmit, reset, control} = useForm({
        mode: 'onBlur',
        defaultValues: {
            title: selectedNote.title || "",
            tag: selectedNote.tag || "",
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
                                                render={({field}) => (
                                                    <Select
                                                        {...field}
                                                    >
                                                        <MenuItem value="Management">{t('management')}</MenuItem>
                                                        <MenuItem value="Development">{'development'}</MenuItem>
                                                        <MenuItem value="Design">{t('design')}</MenuItem>
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

                                    <Grid item xs={11}>
                                        <TagTypography variant="body1" tagColor={tagColor}>
                                            <TagIndicator tagColor={tagColor}/>
                                          {t(`${selectedNote?.tag.toLowerCase()}`)}
                                        </TagTypography>
                                    </Grid>

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
                            <Grid item xs={12} sx={{textAlign: "right"}}>
                                {isAuthor ? (
                                        <SaveButton
                                            variant="contained"
                                            type="submit"
                                            disabled={!isDirty}
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
                                    <Box key={index} sx={{marginBottom: 1}}>
                                        <Typography variant="body1" sx={{marginLeft: '2rem'}}>
                                            <strong>
                                                {comment.firstName} {comment.lastName}:
                                            </strong>{" "}
                                            {comment.text}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{marginLeft: '2rem'}}>
                                            {comment.date}
                                        </Typography>
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
