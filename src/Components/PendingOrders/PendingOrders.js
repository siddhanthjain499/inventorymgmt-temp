import { Grid } from '@material-ui/core';

import { useState, useEffect } from 'react';

import '../PendingOrders/PendingOrders.css';

import PendingOrdersCard from '../UI/PendingOrdersCard';
import { TextField } from '@mui/material';

const PendingOrders = () => {
    const [shipped, setShipped] = useState([]);
    const [searchTerm, setSearchterm] = useState('');
    useEffect(() => {
        const db = ..database().ref("OrderStatus/Shipped");
        db.on("value", (response) => {
            const data = response.val();
            let shippedItem = [];
            for (const key in data) {
                shippedItem.push({
                    id: key,
                    address: data[key].Address,
                    country: data[key].Country,
                    email: data[key].Email,
                    name: data[key].Name,
                    orderDetails: data[key].OrderDetails,
                    totalCost: data[key].TotalCost,
                    orderID: data[key].OrderID
                });
            }
            setShipped(shippedItem);
        });
    }, []);

    // const shipped_list = shipped.map(item => (
    //     <PendingOrdersCard
    //         key={item.id}
    //         id={item.id}
    //         address={item.address}
    //         country={item.country}
    //         email={item.email}
    //         name={item.name}
    //         orderDetails={item.orderDetails}
    //         totalCost={item.totalCost}
    //         orderID={item.orderID}
    //     />
    // ));




    return (
        <Grid container>

            {/* <Topbar /> */}
            <h2>Customer's Orders</h2>
            <TextField className="txtfld"
                autoFocus
                margin="dense"
                id="name"
                label="Search"
                type="search"
                variant="standard"
                onChange={event => { setSearchterm(event.target.value) }}
            />
            <Grid container spacing={8} style={{marginTop : "50px;"}}>

                {
                    shipped.filter(val => {
                        if (searchTerm === "") {
                            // console.log(val.address);
                            return val;
                        }else if (val.orderID.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                    }).map((val, key) => {
                        return (
                        <PendingOrdersCard
                        key={val.id}
                        id={val.id}
                        address={val.address}
                        country={val.country}
                        email={val.email}
                        name={val.name}
                        orderDetails={val.orderDetails}
                        totalCost={val.totalCost}
                        orderID={val.orderID}
                        />
                        );
                    })
                }
                {/* {shipped_list} */}
            </Grid>
        </Grid>

    );
}

export default PendingOrders;

