import React from "react";
import {useForm} from "react-hook-form";
import {
    Dialog,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    DialogActions,
    Button,
    FormControlLabel,
    Checkbox,
    Grid,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {toast} from "react-toastify";
import ValidationError from '../ValidationError/ValidationError';
import {useTranslation} from 'react-i18next';

const DialogCreateNote = (props) => {
    const {isOpen, setIsOpen, handleCreateNote} = props;
    const {t} = useTranslation();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            tag: "",
            title: "",
            description: "",
            isPublished: false,
        },
    });

    const onSubmit = (data) => {
        handleCreateNote(data);
        reset();
        toast.success(t('createdNote'));
    };

    const handleClose = () => {
        setIsOpen(false);
        reset();
    };

    return (
        <Dialog open={isOpen} fullWidth maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={10}>
                            <TextField
                                fullWidth
                                label={t('title')}
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
                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<BookmarkBorderIcon/>}
                                        checkedIcon={<BookmarkIcon/>}
                                        {...register("isPublished")}
                                    />
                                }
                                label={t('publish')}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tag-label">{t('tag')}</InputLabel>
                                <Select
                                    defaultValue={""}
                                    labelId="tag-label"
                                    label={t('tag')}
                                    error={Boolean(errors.tag)}
                                    {...register("tag", {
                                        required: {
                                            value: true,
                                            message: t('errorDefault')
                                        }
                                    })}
                                >
                                    <MenuItem value="Management">{t('management')}</MenuItem>
                                    <MenuItem value="Development">{t('development')}</MenuItem>
                                    <MenuItem value="Design">{t('design')}</MenuItem>
                                </Select>
                                {errors.tag && <ValidationError>{errors.tag.message}</ValidationError>}
                            </FormControl>
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                label={t('description')}
                                multiline
                                minRows={5}
                                error={Boolean(errors.description)}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: t('errorDefault')
                                    },
                                    maxLength: {
                                        value: 300,
                                        message: t('maxLength', { count: 300 })
                                    },
                                })}
                            />
                            {errors.description && <ValidationError>{errors.description.message}</ValidationError>}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('close')}</Button>
                    <Button disabled={!isValid} type="submit">
                        {t('addedNote')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogCreateNote;
