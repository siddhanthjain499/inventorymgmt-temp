import React from "react";
import { useState, useEffect } from "react";
import { Select, InputLabel, MenuItem, FormControl, Grid, TextField } from "@material-ui/core";


const AddMore = () => {


    const [orderDetails, setOrderDetails] = useState([]);
    const [commMode, setCommMode] = useState('');

    const handleCommunicationChange = (event) => {
        setCommMode(event.target.value);
        console.log(event.target.value);
    };


    useEffect(() => {
        const db = ..database().ref("Inventory/Instock");
        db.on("value", (response) => {
            const data = response.val();
            let dataList = [];
            for (const key in data) {
                dataList.push({
                    id: key,
                    name: data[key].Name,
                    price: data[key].Price,
                });
            }
            setOrderDetails(dataList);
        })
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item sm={8}>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-standard-label" fullWidth>Name</InputLabel>
                    <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={commMode} onChange={handleCommunicationChange} label="Communication Mode">
                        <MenuItem value=""><em>None</em></MenuItem>
                        {orderDetails.map(data => {
                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={2}>
                <FormControl fullWidth variant="standard">
                    <TextField label="Qty" variant="standard"></TextField>
                </FormControl>
            </Grid>
            <Grid item sm={2}>
                <FormControl fullWidth variant="standard">
                    <TextField label="Price" variant="standard"></TextField>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default AddMore;