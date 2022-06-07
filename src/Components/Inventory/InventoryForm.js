import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import React, { useState, useRef } from 'react'

import . from "../../.";

const isEmpty = value => value.trim() === '';

export default function InventoryForm() {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormValidity({
            name: true,
            cost: true,
            description: true
        })
        // setItemList(cartItems);
    };

    const nameRef = useRef();
    const costRef = useRef();
    const descriptionRef = useRef();

    const [formValidity, setFormValidity] = useState({
        name: true,
        cost: true,
        description: true
    })

    const submitHandler = (event) => {


        const enteredName = nameRef.current.value;
        const enteredCost = costRef.current.value;
        const enteredDescription = descriptionRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredCostIsValid = !isEmpty(enteredCost);
        const enteredDescriptionIsValid = !isEmpty(enteredDescription);

        setFormValidity({
            name: enteredNameIsValid,
            cost: enteredCostIsValid,
            description: enteredDescriptionIsValid
        })

        const formIsValid = enteredNameIsValid && enteredCostIsValid && enteredDescriptionIsValid;

        if (!formIsValid) {
            return;
        }

        const db = ..database().ref('/Inventory/Instock').child(enteredName);
        db.set({
            Name: enteredName,
            Price: enteredCost,
            Description: enteredDescription,
            Id: enteredName,
            Instock: true
        })

        setOpen(false);
    }

    return (
        <div>
            <Button style={{ backgroundColor: "#1a1a1a" , marginTop : "100px" , marginLeft : "-155px"}} variant="contained" color="primary" onClick={handleClickOpen}>+ Add Items</Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth style={{ color: "#DFDFDF", padding: "30px 50px 30px 50px" }}>

                {/* <Grid container sm={12} md={8}> */}

                <DialogTitle style={{ background: "#DFDFDF" }}>
                    ADD ITEMS
                    <Divider />
                </DialogTitle>

                <DialogContent style={{ background: "#DFDFDF" }}>

                    <Grid container style={{ marginTop: "0px" }}>
                        <Grid container sm={12} spacing={0} >

                            <Grid container xs={12} spacing={4}>

                                <Grid item xs={6}>
                                    {formValidity.name ? (
                                        <TextField inputRef={nameRef} fullWidth label="Name" variant="standard"></TextField>
                                    ) :
                                        (
                                            <TextField error inputRef={nameRef} fullWidth label="Name" variant="standard"></TextField>
                                        )}
                                </Grid>

                                <Grid item xs={6}>
                                    {formValidity.cost ? (
                                        <TextField inputRef={costRef} type="text" inputMode="decimal" fullWidth label="Total Cost" variant="standard"></TextField>
                                    ) : (
                                        <TextField error inputRef={costRef} type="text" inputMode="decimal" fullWidth label="Total Cost" variant="standard"></TextField>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    {formValidity.description ? (
                                        <TextField inputRef={descriptionRef} fullWidth id="standard-multiline-static" label="Description" variant="standard" multiline rows={2}></TextField>
                                    ) :
                                        (
                                            <TextField inputRef={descriptionRef} fullWidth error id="standard-multiline-static" label="Description" variant="standard" multiline rows={2}></TextField>
                                        )}
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions style={{ background: "#DFDFDF " }}>
                    <Button onClick={handleClose} style={{ border: "2px solid black", background: "#DFDFDF", color: "#191919", padding: "0.40em 4em", margin: "2em 2em 2em 0" }}>CANCEL</Button>
                    <Button onClick={submitHandler} className="Confirmbut" style={{ background: "#191919", color: "#ffffff", padding: "0.5em 3em", margin: "2em 2em 2em 0" }}>CONFIRM</Button>
                </DialogActions>

            </Dialog>
        </div >
    );
}

