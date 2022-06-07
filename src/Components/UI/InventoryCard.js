import React from "react";
import { Grid } from '@material-ui/core';
// import { dividerClasses } from '@mui/material';
// import '../Inventory/Inventory.css';
import classes from './InventoryCard.module.css';

const InventoryCard = (props) => {

    const { updatedStatusHandler } = props;

    const handleChange = (data) => {
        updatedStatusHandler(data);
    };

    return (
        <Grid item sm={4}>
            <div className={classes.invent_item} style={{ background: "#FFFFFF" }}>
                <p className={classes.typedish}>{props.name} <span className={classes.cost} >&#36;{props.price}</span></p>
                <p>{props.description}</p>
                <Grid container>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
                        <button classes={classes.status_btn} onClick={() => handleChange(props)}>Change Status</button>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );

}

export default InventoryCard;