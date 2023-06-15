import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Grid, Box, LinearProgress, Alert } from '@mui/material';
import Item from './item';
import EmptyItem from './empty-item';
import { act } from 'react-test-renderer';

export const url = 'http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow';

const Holder = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const result = await axios.get(url);
                act(() => {
                    setData(result?.data?.items);
                    setLoading(false);
                });
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onFollow = (id) => {
        let newData = data.map((item) => {
            if (item.user_id === id) {
                item.is_followed = !item.is_followed;
            }
            return item;
        });
        setData(newData);
    };

    const onBlock = (id) => {
        let newData = data.map((item) => {
            if (item.user_id === id) {
                item.is_blocked = !item.is_blocked;
            }
            return item;
        });
        setData(newData);
    };

    return (<Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        {
            loading ? <Box sx={{ width: '100%' }}>
                <LinearProgress data-testid="loading" />
            </Box> : null
        }
        {
            error ?
                <Alert data-testid="error" severity="error">Had an error.</Alert>
                : null
        }
        <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
                {
                    loading ? Array.from(Array(3).keys()).map((item, index) =>
                        <Grid item xs={12} key={index}>
                            <EmptyItem />
                        </Grid>
                    )
                        : null}
                {
                    !loading && data && data.length > 0 ? data.map((item, index) =>
                        <Grid item xs={12} key={index}>
                            <Item data-testid="item" data={item} onFollow={onFollow} onBlock={onBlock} />
                        </Grid>
                    ) : null
                }

            </Grid>
        </Grid>
    </Grid>)
};

export default Holder;