import React from 'react';
import {useForm} from 'react-hook-form';
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
    Checkbox, Grid
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';

const DialogCreateNote = (props) => {
    const {isOpen, setIsOpen, handleCreateNote} = props;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
    } = useForm({
        defaultValues: {
            tag: '',
            title: '',
            description: '',
            isPublished: false,
        }
    });

    const onSubmit = (data) => {
        handleCreateNote(data);
        reset();
        toast('Заметка создана')
    };

    const handleClose = () => {
        setIsOpen(false);
        reset();
    };

    return (
        <Dialog
            component={motion.div} // Wrap the Dialog with motion.div
            initial={{ opacity: 0}} // Initial styles for animation
            animate={{ opacity: 1}} // Animation styles
            exit={{ opacity: 0 }} // Exit animation styles
            transition={{ duration: 0.5 }}
            open={isOpen}
            onClose={handleClose}
            fullWidth
            maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent
                    component={motion.div} // Wrap the DialogContent with motion.div
                    initial={{ y: -20, opacity: 0 }} // Initial styles for animation
                    animate={{ y: 0, opacity: 1 }} // Animation styles
                    exit={{ y: -20, opacity: 0 }} // Exit animation styles
                >
                    <Grid container spacing={2}>
                        <Grid item md={10}>
                            <TextField
                                fullWidth
                                label="Title"
                                sx={{marginBottom: 2}}
                                {...register('title', {required: true})}
                            />
                            {errors.title && <span>This field is required</span>}
                        </Grid>

                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<BookmarkBorderIcon/>}
                                        checkedIcon={<BookmarkIcon/>}
                                        {...register('isPublished')}
                                    />
                                }
                                label="Publish"
                            />
                        </Grid>

                        <Grid item md={12}>
                            <FormControl fullWidth sx={{marginBottom: 2}} size="small">
                                <InputLabel id="tag-label">Tag</InputLabel>
                                <Select
                                    defaultValue={""}
                                    labelId="tag-label"
                                    label="Tag"
                                    {...register('tag', {required: true})}
                                >
                                    <MenuItem value="Management">Management</MenuItem>
                                    <MenuItem value="Development">Development</MenuItem>
                                    <MenuItem value="Design">Design</MenuItem>
                                </Select>
                                {errors.tag && <span>This field is required</span>}
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                minRows={5}
                                sx={{marginBottom: 2}}
                                {...register('description')}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    component={motion.div} // Wrap the DialogActions with motion.div
                    initial={{ y: 20, opacity: 0 }} // Initial styles for animation
                    animate={{ y: 0, opacity: 1 }} // Animation styles
                    exit={{ y: 20, opacity: 0 }} // Exit animation styles
                    >
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button disabled={!isValid} type="submit">Добавить заметку</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogCreateNote;
