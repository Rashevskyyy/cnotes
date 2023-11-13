import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
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
    Grid,
    Switch, Checkbox, ListItemText, Chip, OutlinedInput, Box,
} from "@mui/material";
import {toast} from "react-toastify";
import ValidationError from '../ValidationError/ValidationError';
import {useTranslation} from 'react-i18next';
import {tags} from '../Notes/Note/Note';

const DialogCreateNote = (props) => {
    const {isOpen, setIsOpen, handleCreateNote} = props;
    const {t} = useTranslation();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        watch,
        setValue,
        getValues,
        control
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            tag: [],
            title: "",
            description: "",
            isPublished: false,
        },
    });

    const isPublished = watch("isPublished");

    const onSubmit = (data) => {
        handleCreateNote(data);
        reset();
        toast.success(t('createdNote'));
    };

    const handleClose = () => {
        setIsOpen(false);
        reset();
    };

    const handleToggleChange = (event) => {
        setValue("isPublished", event.target.checked);
    };

    const handleDelete = (tagToDelete) => {
        const currentTags = getValues("tag");
        const updatedTags = currentTags.filter((tag) => tag !== tagToDelete);
        setValue("tag", updatedTags);
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
                                    <Switch
                                        checked={isPublished}
                                        onChange={handleToggleChange}
                                        {...register("isPublished")}
                                    />
                                }
                                label={isPublished ? t('publish') : t('private')}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tag-label">{t('tag')}</InputLabel>
                                <Controller
                                    name="tag"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="tag-label"
                                            multiple
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={t(`${value}`)} style={{background: '#C4AE78'}} />
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
