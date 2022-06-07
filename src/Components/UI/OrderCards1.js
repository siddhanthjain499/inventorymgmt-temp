import React from "react";
import { Grid, Paper } from '@material-ui/core';

import classes from './OrderCards.module.css';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const OrderCards1 = (props) => {

    // console.log(item);
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

    const handleUpdateStatus = (data) => {
        props.onUpdate(data);
    };
    const handleDeleteStatus = (data) => {
        props.onDelete(data);
    }
    
    return (
        <Grid item xs={12}>
            <Paper elevation={0} className={classes.order_details}>
                <div className={classes.order_section}>
                    <p>{props.name}</p>
                    {/* <p>{props.orderID}</p> */}
                    <div className={classes.action_icons}>
                        <CheckCircleIcon style={{ fontSize: "35px", color: "#18CC67" }} onClick={() => { handleUpdateStatus(props) }} />
                        <CancelIcon style={{ fontSize: "35px", color: "#FF0000", marginLeft: "20px" }} onClick={() => { handleDeleteStatus(props) }} />
                    </div>
                </div>

                <div className={classes.order_section}>
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

export default OrderCards1;