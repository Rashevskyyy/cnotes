import React from 'react';
import { Grid, Container } from '@mui/material';
import CardComponent from './Card';

const cardData = [
    {
        tag: 'Managment',
        title: 'Заметка 1',
        description: 'Loren asdasdasdas  asdas  asdas as das ',
        userName: 'Пользователь 1',
        date: '01.01.2023',
    },
    {
        tag: 'Development',
        title: 'Заметка 2',
        description: 'Описание заметки 12',
        userName: 'Пользователь 2',
        date: '01.01.2023',
    },
    {
        tag: 'Design',
        title: 'Заметка 3',
        description: 'Описание заметки 3',
        userName: 'Пользователь 3',
        date: '01.01.2023',
    },
    {
        tag: 'Тег 4',
        title: 'Заметка 4',
        description: 'Описание заметки 4',
        userName: 'Пользователь 4',
        date: '01.01.2023',
    },
    {
        tag: 'Тег 4',
        title: 'Заметка 4',
        description: 'Описание заметки 4',
        userName: 'Пользователь 4',
        date: '01.01.2023',
    },
    {
        tag: 'Тег 4',
        title: 'Заметка 4',
        description: 'Описание заметки 4',
        userName: 'Пользователь 4',
        date: '01.01.2023',
    },
    {
        tag: 'Тег 4',
        title: 'Заметка 4',
        description: 'Описание заметки 4',
        userName: 'Пользователь 4',
        date: '01.01.2023',
    },
    {
        tag: 'Тег 4',
        title: 'Заметка 4',
        description: 'Описание заметки 4',
        userName: 'Пользователь 4',
        date: '01.01.2023',
    },
    {
        tag: 'Тег 4',
        title: 'Заметка 4',
        description: 'Описание заметки 4',
        userName: 'Пользователь 4',
        date: '01.01.2023',
    },
];

const CardList = () => {
    return (
        <Container maxWidth={false} sx={{marginTop: 8}}>
            <Grid container spacing={3}>
                {cardData.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                        <CardComponent
                            tag={card.tag}
                            title={card.title}
                            description={card.description}
                            userName={card.userName}
                            date={card.date}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CardList;
