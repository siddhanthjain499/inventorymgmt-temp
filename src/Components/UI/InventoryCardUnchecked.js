import React from "react";
import { Grid } from '@material-ui/core';
// import { dividerClasses } from '@mui/material';
import classes from "./InventoryCard.module.css";


const InventoryCardUnchecked = (props) => {

    const { uncheckedStatusHandler} = props;

    const handleChange = (event) => {
        uncheckedStatusHandler(event)
    };

    return (
        <Grid item sm={4}>
            <div className={classes.invent_item} style={{ background: "#FFE5E5" }}>
                <p className={classes.typedish}>{props.name} <span className={classes.cost} >&#36;{props.price}  </span></p>
                <p> {props.description} </p>
                <Grid container>
                    <Grid item xs={6}>
                        <p style={{ color: "#FF0000", fontSize: "14px" }}>OUT OF STOCK</p>
                    </Grid>
                    <Grid item xs={6}>
                        <button classes={classes.status_btn} onClick={() => handleChange(props)}>Change Status</button>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

export default InventoryCardUnchecked;