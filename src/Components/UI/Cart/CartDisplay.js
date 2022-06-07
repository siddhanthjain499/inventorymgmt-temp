import {  Divider,  Grid,  } from '@material-ui/core';
// import { useState, useRef } from 'react'

import classes from './CartDisplay.module.css';
// import EditIcon from '@mui/icons-material/Edit';
import CartDisplayTextField from './CartDisplayTextField';

export default function CartDisplay(props) {
    const { cartItems, onAddHandler, onRemoveHandler, changeCostHandler, updatedValue } = props;
    // const priceRef = useRef();
    // const priceChangeHandler = (data) =>{
    //     setPriceChange(data);
    // }
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    if (itemsPrice > 0) {
        changeCostHandler(itemsPrice.toFixed(2));
    }

    return (
        <div>
            <h2>Cart Items</h2>
            <Divider />
            <div>{cartItems.length === 0 && <p>Cart is empty</p>}</div>
            {cartItems.map(item => (
                <div key={item.id}>
                    <Grid container sm={12} spacing={1} direction="row">
                        <Grid item sm={6}>
                            <p>{item.name}</p>
                        </Grid>

                        <Grid item sm={1}>
                            <button variant="contained" className={classes.inc_btn} onClick={() => onRemoveHandler(item)}>-</button>
                        </Grid>

                        <Grid item sm={1}>
                            <button variant="contained" className={classes.inc_btn} onClick={() => onAddHandler(item)}>+</button>
                        </Grid>

                        <Grid item sm={1}>
                            <p>{item.qty}</p>
                        </Grid>

                        <Grid item sm={3}>
                            {/* <p>$ {item.price.toFixed(2)} <span><EditIcon></EditIcon></span></p> */}
                            {/* <FormControl fullWidth variant="standard">
                                <TextField value={updateState(item.price.toFixed(2))}   onChange={e => setUpdatedPrice(e.target.value)} variant="standard"></TextField>
                            </FormControl> */}
                            <CartDisplayTextField value={item} updatedValue={updatedValue}/>
                            {/* <CartDisplayTextField value={item.price.toFixed(2)} updatedValue={updatedValue}/> */}
                        </Grid>
                    </Grid>
                </div>
            ))}
            {itemsPrice.length !== 0 && (
                <Grid container item direction="row">
                    <Grid item xs={9}>Total Price:</Grid>
                    <Grid item xs={3}>$ {itemsPrice.toFixed(2)}</Grid>
                </Grid>
            )}
        </div>
    )
}
