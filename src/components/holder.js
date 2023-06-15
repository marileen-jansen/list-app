import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Grid, Box, LinearProgress, Alert } from '@mui/material';
import Item from './item';
import EmptyItem from './empty-item';

const Holder = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const result = await axios(
                'http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow',
                {
                    withCredentials: true,
                }
            );
            console.log(result.data);
            setData(result?.data?.items);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (<Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        {
            loading ? <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box> : null
        }
        {
            error ?
                <Alert severity="error">Had an error.</Alert>
                : null
        }
        <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
                {
                    loading ? Array.from(Array(3).keys()).map(item =>
                        <Grid item xs={12}>
                            <EmptyItem />
                        </Grid>
                    )
                        : null}
                {
                    !loading && data && data.length > 0 ? data.map(item =>
                        <Grid item xs={12}>
                            <Item data={item} />
                        </Grid>
                    ) : null
                }

            </Grid>
        </Grid>
    </Grid>)
};

export default Holder;