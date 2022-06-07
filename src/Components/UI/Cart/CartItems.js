import { Button, Grid } from '@material-ui/core';
import React from 'react'

import './CartItem.css';

const CartItems = (props) => {
    const { products, onAddHandler, onGiftHandler } = props;
    // console.log(props.products)
    return (
        <Grid item container sm={12} md={9} spacing={3} >

            {products.map(product => (

                <Grid item sm={4} key={product.id}>

                    <div className="inventory-item" style={{ background: "#FFFFFF" }}>
                        <p className="typedish">{product.name}<span className="cost">&#36;{product.price}</span></p>
                        <p>{product.description}</p>

                        {/* <Checkbox className="checkity" size="small" style={{ margin: "0 0 0 -10px" }} /><span style={{ color: "#707070", Size: "100px" }}>Add as gift</span> */}
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={() => onGiftHandler(product)}>Add as Gift</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={() => onAddHandler(product)}>Add to Cart</Button>
                            </Grid>
                        </Grid>
                    </div>
 
                </Grid>

            ))}

        </Grid>

    )
}

export default CartItems;