import React, {useRef} from 'react';
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
} from '@mui/material';
import {MoreVert as MoreVertIcon} from '@mui/icons-material';
import {useMutation} from 'react-query';
import {deleteNoteApi, fetchNotesByUser} from '../api/routes';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useHref, useNavigate, useParams} from 'react-router-dom';
import {AnimatePresence, motion, useMotionValue} from 'framer-motion';
import {useInvertedBorderRadius} from '../utils/use-inverted-border-radius';
import {useScrollConstraints} from '../utils/use-scroll-constraints';
import {useWheelScroll} from '../utils/use-wheel-scroll';

const ellipsisStyle = {
    height: '3em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
};

const dismissDistance = 150;

const Note = ({tag, title, description, firstName, date, idNote, href, index, isSelected}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
        y.get() > dismissDistance && navigate("/");
    }

    function checkZIndex(latest) {
        if (isSelected) {
            zIndex.set(2);
        } else if (!isSelected && latest.scaleX < 1.01) {
            zIndex.set(0);
        }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
        containerRef,
        y,
        constraints,
        checkSwipeToDismiss,
        isSelected
    );

    const getTagColor = (tag) => {
        switch (tag) {
            case 'Management':
                return '#f44336';
            case 'Development':
                return '#2196f3';
            case 'Design':
                return '#4caf50';
            default:
                return '#9e9e9e';
        }
    };

    const tagColor = getTagColor(tag);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {mutate: handleDelete} = useMutation(() => deleteNoteApi(idNote), {
        onSuccess: () => {
            handleClose()
            dispatch(fetchNotesByUser());
            toast("Заметка удалена")
        },
        onError: (error) => {
            console.log("e", error);
        },
    });

    const handleCardClick = () => {
        navigate(`/notes/${idNote}`);
    };

    return (
        <AnimatePresence>
            <motion.div
                layout={true}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                initial={{ opacity: 0, y: -20,  }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ opacity: { duration: 0.3, delay: index * 0.1 }, y: { duration: 0.3, delay: index * 0.1 } }}
            >
            <Card sx={{borderRadius: '8px'}}>
                <CardHeader
                    avatar={<div style={{backgroundColor: 'red', borderRadius: '50%'}}/>}
                    title={
                        <Typography
                            onClick={handleCardClick}
                            variant="subtitle1"
                            component="span"
                            style={{
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                color: tagColor,
                                fontWeight: 'bold'
                            }}
                        >
                        <span
                            style={{
                                display: 'inline-block',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: tagColor,
                                marginRight: '12px',
                            }}
                        ></span>
                            {tag}
                        </Typography>
                    }
                    style={{paddingBottom: 0, paddingTop: 16, paddingLeft: 0}}
                />
                <CardContent
                    style={{cursor: 'pointer'}}
                    onClick={handleCardClick}
                >
                    <Typography variant="h5" component="div" style={{paddingBottom: 8}}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={ellipsisStyle}>
                        {description}
                    </Typography>
                </CardContent>
                <Divider sx={{width: '85%', mx: 'auto'}}/>
                <Box p={2}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <Avatar/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        {firstName}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption">
                                        {date}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {href === "/notes" && (
                            <Grid item>
                                <IconButton onClick={handleClick}>
                                    <MoreVertIcon/>
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
        </motion.div>
        </AnimatePresence>

    );
};

export default Note;
