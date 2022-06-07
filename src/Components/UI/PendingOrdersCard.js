import React from "react";
import { Grid, Paper } from '@material-ui/core';

import classes from './OrderCards.module.css';

const PendingOrdersCard = (props) => {

    const item_list = [];
    for (const key in props.orderDetails) {

        item_list.push({
            id: key,
            orderName: props.orderDetails[key].OrderName,
            orderQty: props.orderDetails[key].OrderQty,
            price: props.orderDetails[key].Price
        })
    }
    const OrderDetails_list = item_list.map(item => {
        if (item.price === 0) {
            return (<p style={{ color: "#18CC67" }} key={item.id}>{item.orderQty} X - {item.orderName}</p>)
        }
        else {
            return (<p key={item.id}>{item.orderQty} X - {item.orderName}</p>)
        }
    });

    return (
        <Grid item xs={4}>
            <Paper elevation={0} className={classes.order_details}>
                <div className={classes.order_section}>
                    <p>{props.name}</p>

                </div>

                <div className={classes.order_section}>
                    <p><span>Order ID</span> - {props.orderID}</p>
                    <p><span>Email</span> - {props.email}</p>
                    <p><span >Country</span> - {props.country}</p>
                    <p><span >Address</span> - {props.address}</p>
                    <p><span >Total Cost</span> - {props.totalCost}</p>
                </div>

                {OrderDetails_list}
            </Paper>
        </Grid>
    );
}

export default PendingOrdersCard;