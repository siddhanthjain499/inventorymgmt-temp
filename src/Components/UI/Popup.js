import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import './Popup.css';
import CartDisplay from './Cart/CartDisplay';
import . from "../../.";
// import CartItems from './Cart/CartItems';

export default function Popup(props) {

  const { setItemList, changeCostHandler } = props;

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setItemList(cartItems);
  };


  useEffect(() => {
    const db = ..database().ref("Inventory/Instock");
    db.on("value", (response) => {
      const data = response.val();
      let productList = [];
      for (const key in data) {
        productList.push({
          id: data[key].Id,
          name: data[key].Name,
          price: data[key].Price,
          description: data[key].Description
        });
      }
      setProducts(productList);
    })
  }, []);

  const onAddHandler = (product) => {
    const exist = cartItems.find(item => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    }
    else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  }

  const onRemoveHandler = (product) => {
    const exist = cartItems.find(item => item.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id))
    }
    else {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }
  }

  const onGiftHandler = (product) => {
    const exist = cartItems.find(item => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1, price: 0 } : item
        )
      );
    }
    else {
      setCartItems([...cartItems, { ...product, qty: 1, price: 0 }]);
    }
  }

  const updatedValue = (data) => {
    // console.log(data);
    const updatedList = cartItems.find((x) => x.id === data.id);
    // console.log("gandu"+updatedList.price+" ruko zara : " + data.price)
    setCartItems(cartItems.map(item =>
      item.id === data.id ? { ...updatedList, price: data.price } : item
    ))

  }

  //Search

  const [searchTerm, setSearchterm] = useState('');


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>+ Add/Remove</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth style={{ color: "#DFDFDF" }}>

        {/* <Grid container sm={12} md={8}> */}


        <DialogTitle style={{ background: "#DFDFDF" }}>
          <TextField className="txtfld"
            autoFocus
            margin="dense"
            id="name"
            label="Search"
            type="search"
            variant="standard"
            onChange={event => { setSearchterm(event.target.value) }}
          />
        </DialogTitle>

        <DialogContent style={{ background: "#DFDFDF", height: "60vh" }}>

          <Grid container spacing={5}>

            <Grid item container sm={12} md={9} spacing={3} >

              {/* <CartItems products={products} onAddHandler={onAddHandler} onGiftHandler={onGiftHandler} /> */}
              {
                products.filter(val => {
                  if (searchTerm === "") {
                    return val;
                  } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                  }
                }).map((val, key) => {
                  return (
                    // <h3>Searched Items</h3>
                    <Grid item sm={4} key={val.id}>

                      <div className="inventory-item" style={{ background: "#FFFFFF" }}>
                        <p className="typedish">{val.name}<span className="cost">&#36;{val.price}</span></p>
                        <p>{val.description}</p>

                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Button variant="contained" onClick={() => onGiftHandler(val)}>Add as Gift</Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button variant="contained" onClick={() => onAddHandler(val)}>Add to Cart</Button>
                          </Grid>
                        </Grid>
                      </div>

                    </Grid>
                  )
                })
              }

            </Grid>

            <Grid item container sm={12} md={3} className="cart_grid">

              <CartDisplay cartItems={cartItems} onAddHandler={onAddHandler} onRemoveHandler={onRemoveHandler} changeCostHandler={changeCostHandler} updatedValue={updatedValue} />

            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions style={{ background: "#DFDFDF " }}>
          <Button onClick={handleClose} style={{ border: "2px solid black", background: "#DFDFDF", color: "#191919", padding: "0.40em 4em", margin: "2em 2em 2em 0" }}>CANCEL</Button>
          <Button onClick={handleClose} className="Confirmbut" style={{ background: "#191919", color: "#ffffff", padding: "0.5em 3em", margin: "2em 2em 2em 0" }}>CONFIRM</Button>
        </DialogActions>

      </Dialog>
    </div >
  );
}

