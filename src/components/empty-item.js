import React from 'react';

import { Box, Paper, Container, Avatar, Skeleton } from '@mui/material';
import { TrendingUp, } from '@mui/icons-material';

const EmptyItem = () => {

    return (<Box
        sx={{
            width: '100%',
            height: 'auto',
            cursor: 'pointer',
        }}
    >
        <Paper
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'white',
                cursor: 'pointer',
                padding: '10px'
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Avatar></Avatar>
                <Container
                    sx={{
                        flex: 'auto',
                    }}
                >
                    <Skeleton animation="wave" variant="rectangular" width={250} height={35} />
                </Container>
                <Container
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TrendingUp />
                    <Skeleton animation="wave" variant="rectangular" width={100} height={20} />
                </Container>
            </Container>
        </Paper>
    </Box>)
};

export default EmptyItem;