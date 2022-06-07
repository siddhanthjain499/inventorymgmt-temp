import React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Topbar from '../Utilities/Topbar';
import './Inventory.css';

import . from "../../.";
import InventoryCard from '../UI/InventoryCard';
import InventoryCardUnchecked from '../UI/InventoryCardUnchecked';
import InventoryForm from './InventoryForm.js';

const Inventory = () => {

    const [invIn, setInvIn] = useState([]);
    const [invOut, setInvOut] = useState([]);

    useEffect(() => {
        const db = ..database().ref("Inventory/Instock");
        db.on("value", (response) => {
            const data = response.val();
            let invItem_in = [];
            for (const key in data) {
                invItem_in.push({
                    id: key,
                    price: data[key].Price,
                    instock: data[key].Instock,
                    description: data[key].Description,
                    name: data[key].Name,
                });
            }
            setInvIn(invItem_in);
        });
    }, []);

    useEffect(() => {
        const db1 = ..database().ref("Inventory/Outstock");
        db1.on("value", (response) => {
            const data = response.val();
            let invItem_out = []
            for (const key in data) {
                invItem_out.push({
                    id: key,
                    price: data[key].Price,
                    instock: data[key].Instock,
                    description: data[key].Description,
                    name: data[key].Name,
                });
            }
            setInvOut(invItem_out);
        });
    }, []);

    // ###################### Event Handling

    const updatedStatusHandler = (data) => {
        // console.log(data);

        const db = ..database().ref('/Inventory/Outstock/').child(data.id);
        // console.log(db);
        db.set({
            Id: data.id,
            Name: data.name,
            Description: data.description,
            Price: data.price,
            Instock: !data.instock,
        });

        const rem_db = ..database().ref('/Inventory/Instock/').child(data.id);
        rem_db.remove();
    };

    const uncheckedStatusHandler = (data) => {
        // console.log(data);
        // console.log(data.instock)
        const db = ..database().ref('/Inventory/Instock/').child(data.id);
        // console.log(db);
        db.set({
            Id: data.id,
            Name: data.name,
            Description: data.description,
            Price: data.price,
            Instock: !data.instock,
        });

        const rem_db = ..database().ref('/Inventory/Outstock/').child(data.id);
        rem_db.remove();
    }

    const inv_list = invIn.map(item => (
        <InventoryCard
            key={item.id}
            id={item.id}
            price={item.price}
            description={item.description}
            name={item.name}
            instock={item.instock}
            updatedStatusHandler={updatedStatusHandler}
        />
    ));

    const inv_list_out = invOut.map(item => (
        <InventoryCardUnchecked
            key={item.id}
            id={item.id}
            price={item.price}
            description={item.description}
            name={item.name}
            instock={item.instock}
            uncheckedStatusHandler={uncheckedStatusHandler}
        />
    ))

    return (
        <Grid container>
            {/* <Topbar /> */}
            <h1>Inventory</h1>

            <InventoryForm/>

            <Grid container spacing={3} className="main_right">
                {inv_list}
                {inv_list_out}
            </Grid>

        </Grid>
    );
}
export default Inventory;