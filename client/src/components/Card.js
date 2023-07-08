import React from 'react';
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
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const ellipsisStyle = {
    height: '3em', // высота равна трем строкам текста
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // ограничить количество строк до 2
};

const CardComponent = ({ tag, title, description, userName, date }) => {
    const getTagColor = (tag) => {
        switch (tag) {
            case 'Managment':
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

    return (
        <Card sx={{borderRadius: '8px'}}>
            <CardHeader
                avatar={<div style={{ backgroundColor: 'red', borderRadius: '50%' }} />}
                title={
                    <Typography
                        variant="subtitle1"
                        component="span"
                        style={{
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
                style={{ paddingBottom: 0, paddingTop: 16, paddingLeft: 0 }}
            />
            <CardContent>
                <Typography variant="h5" component="div" style={{paddingBottom: 8}}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={ellipsisStyle}>
                    {description}
                </Typography>
            </CardContent>
            <Divider sx={{ width: '85%', mx: 'auto' }} />
            <Box p={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Avatar />
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    {userName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">
                                    {date}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default CardComponent;
