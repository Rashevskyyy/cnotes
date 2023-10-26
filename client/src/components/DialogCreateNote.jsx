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
import ValidationError from './ValidationError/ValidationError';

const DialogCreateNote = (props) => {
    const {isOpen, setIsOpen, handleCreateNote} = props;

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
        toast.success("Заметка создана");
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
                                label="Title"
                                error={Boolean(errors.title)}
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: 'This field is required'
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
                                label="Publish"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tag-label">Tag</InputLabel>
                                <Select
                                    defaultValue={""}
                                    labelId="tag-label"
                                    label="Tag"
                                    error={Boolean(errors.tag)}
                                    {...register("tag", {
                                        required: {
                                            value: true,
                                            message: 'This field is required'
                                        }
                                    })}
                                >
                                    <MenuItem value="Management">Management</MenuItem>
                                    <MenuItem value="Development">Development</MenuItem>
                                    <MenuItem value="Design">Design</MenuItem>
                                </Select>
                                {errors.tag && <ValidationError>{errors.tag.message}</ValidationError>}
                            </FormControl>
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                minRows={5}
                                error={Boolean(errors.description)}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: 'This field is required'
                                    },
                                    maxLength: {
                                        value: 300,
                                        message: "Max length is 300"
                                    },
                                })}
                            />
                            {errors.description && <ValidationError>{errors.description.message}</ValidationError>}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button disabled={!isValid} type="submit">
                        Добавить заметку
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogCreateNote;
