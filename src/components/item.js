import React from 'react';

import { Box, Paper, Typography, Tooltip, Container, Avatar, Button, Collapse } from '@mui/material';
import { TrendingUp, StarBorder, Block, Star } from '@mui/icons-material';

const Item = ({ data, onFollow, onBlock }) => {
    const { user_id, display_name, reputation, profile_image, is_followed, is_blocked } = data;

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (<Box
        sx={{
            width: '100%',
            height: 'auto',
            cursor: is_blocked ? 'cursor' : 'pointer',
            opacity: is_blocked ? 0.5 : 1,
        }}
        onClick={handleExpandClick}
    >
        <Paper
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: '#FAFAFA',
                },
                cursor: is_blocked ? 'cursor' : 'pointer',
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
                <Avatar alt={display_name} src={profile_image}></Avatar>
                <Container
                    sx={{
                        flex: 'auto'
                    }}
                >
                    <Typography variant="h5">{display_name}</Typography>

                </Container>
                {
                    is_followed ? <Star color='primary' /> : null
                }
                <Tooltip title="Reputation" placement="bottom" arrow>
                    <Container
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <TrendingUp color='primary' />
                        <Typography variant="p" color="primary">{reputation}</Typography>
                    </Container>
                </Tooltip>
            </Container>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container
                    sx={{
                        pl: '10px'
                    }}
                >
                    <Tooltip title="Follow user" placement="bottom" arrow>
                        <Button
                            onClick={(event) => {
                                event.stopPropagation();
                                onFollow(user_id);
                            }}
                            sx={{ margin: '5px' }}
                            startIcon={<StarBorder />}
                            variant="contained"
                            disabled={is_blocked}
                        >
                            {
                                is_followed ? 'Unfollow' : 'Follow'
                            }
                        </Button>
                    </Tooltip>
                    <Tooltip title="Block user" placement="bottom" arrow>
                        <Button
                            onClick={(event) => {
                                event.stopPropagation();
                                setExpanded(false);
                                onBlock(user_id);
                            }}
                            sx={{ margin: '5px' }}
                            startIcon={<Block />}
                            variant="contained"
                            color='secondary'
                        >
                            {
                                is_blocked ? 'Unblock' : 'Block'
                            }
                        </Button>
                    </Tooltip>
                </Container>
            </Collapse>
        </Paper>
    </Box>)
};

export default Item;