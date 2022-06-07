import React from "react";
import { Grid } from '@material-ui/core';

import classes from './SummaryCounter.module.css';

const SummaryCounter = (props) => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={10}>
                <Grid container className={classes.summary_name}>
                    {/* <Paper elevation={2}></Paper> */}
                    {/* <div className={classes.summ_card_col}></div> */}
                    <p>{props.name}</p>
                </Grid>
            </Grid>
            <Grid item xs={1}>
                <div className={classes.summary_count}>
                    <p>{props.value}</p>
                </div>
            </Grid>
        </Grid>
    );
}

export default SummaryCounter;