import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import OrderCards1 from '../UI/OrderCards1';
import OrderCards2 from '../UI/OrderCards2';
import OrderCards3 from '../UI/OrderCards3';

import './CustomerBoard.css';

import . from "../../.";

const CustomerBoard = () => {

    const [tBM, setTBM] = useState([]);
    const [rOC, setROC] = useState([]);
    const [shipped, setShipped] = useState([]);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const db = ..database().ref("OrderStatus/TBM");
        db.on("value", (response) => {
            const data = response.val();
            let tbmItem = [];
            for (const key in data) {
                tbmItem.push({
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
            console.log(tbmItem)
            setTBM(tbmItem);
        });
    }, []);

    useEffect(() => {
        const db = ..database().ref("OrderStatus/ROC");
        db.on("value", (response) => {
            const data = response.val();
            let rocItem = [];
            for (const key in data) {
                rocItem.push({
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
            console.log(rocItem)
            setROC(rocItem);
        });
    }, []);

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
            console.log(shippedItem)
            setShipped(shippedItem);
        });
    }, []);

    useEffect(() => {
        const db_update = ..database().ref('/Orders');
        db_update.on("value", (response) => {
            const data = response.val();
            setOrderData(data);
            // console.log(data)
        })
    }, []);

    //  ######################## UPDATED STATUS

    const updatedStatusHandler1 = (data) => {
        const db = ..database().ref('/OrderStatus/ROC/').child(data.id);
        // console.log(db);
        db.set({
            Id: data.id,
            Address: data.address,
            Country: data.country,
            Email: data.email,
            Name: data.name,
            OrderDetails: data.orderDetails,
            TotalCost: data.totalCost,
            OrderID: data.orderID
        });
        const rem_db = ..database().ref('/OrderStatus/TBM/').child(data.id);
        rem_db.remove();
    };

    const updatedStatusHandler2 = (data) => {

        // setOpenModal(true);
        // console.log(data.orderDetails);
        var overlay = window.confirm("Is Payement Confirmed?");

        if (overlay === true) {

            const db = ..database().ref('/OrderStatus/Shipped/').child(data.id);
            // console.log(db);
            db.set({
                Id: data.id,
                Address: data.address,
                Country: data.country,
                Email: data.email,
                Name: data.name,
                OrderDetails: data.orderDetails,
                TotalCost: data.totalCost,
                OrderID: data.orderID
            });

            const db_update = ..database().ref('/Orders');
            db_update.set({
                Revenue: parseInt(orderData.Revenue) + parseInt(data.totalCost),
                TotalOrders: orderData.TotalOrders + 1,
                Popularity: orderData.Popularity
            })


            ////////////////// POPULARITY

            var db_pop = ..database().ref('Orders/Popularity/');
            // console.log(data.orderDetails)
            const orderList = data.orderDetails;
            // console.log(orderList);

            for (const key in orderList) {
                // console.log(orderList[key])
                // console.log(orderList[key].OrderName)
                db_pop.once("value", snap => {
                    // console.log(snap.val())
                    for (const i in snap.val()) {
                        // console.log(snap.val()[i])
                        // console.log(snap.val()[i].Name)
                        if (snap.val()[i].Name === orderList[key].OrderName) {
                            // console.log("found it  " + snap.val()[i].Name)


                            let updatedValue = snap.val()[i].Value + orderList[key].OrderQty;
                            // console.log(updatedValue);

                            const db_update = ..database().ref('Orders/Popularity/' + orderList[key].OrderName);
                            db_update.set({
                                Name: snap.val()[i].Name,
                                Value: updatedValue,
                            })
                            return;
                        }
                        else {
                            // console.log("not found")
                            const db_update = ..database().ref('Orders/Popularity/' + orderList[key].OrderName);
                            db_update.set({
                                Name: orderList[key].OrderName,
                                Value: orderList[key].OrderQty
                            })
                        }
                    }
                })
            }

            const rem_db = ..database().ref('/OrderStatus/ROC/').child(data.id);
            rem_db.remove();
        }
        else {
            console.log("Nothing!");
        }
    }

    // ################################# DELETED STATUS 

    const updatedDeleteHandler1 = data => {
        const db = ..database().ref('/OrderStatus/TBM/').child(data.id);
        db.remove();
    };
    const updatedDeleteHandler2 = data => {
        const db = ..database().ref('/OrderStatus/TBM/').child(data.id);
        db.set({
            Id: data.id,
            Address: data.address,
            Country: data.country,
            Email: data.email,
            Name: data.name,
            OrderDetails: data.orderDetails,
            TotalCost: data.totalCost,
            OrderID: data.orderID
        });
        const rem_db = ..database().ref('/OrderStatus/ROC/').child(data.id);
        rem_db.remove();
    };
    const updatedDeleteHandler3 = data => {
        const db = ..database().ref('/OrderStatus/ROC/').child(data.id);
        db.set({
            Id: data.id,
            Address: data.address,
            Country: data.country,
            Email: data.email,
            Name: data.name,
            OrderDetails: data.orderDetails,
            TotalCost: data.totalCost,
            OrderID: data.orderID
        });

        const db_update = ..database().ref('/Orders');
        db_update.set({
            Revenue: parseInt(orderData.Revenue) - parseInt(data.totalCost),
            TotalOrders: orderData.TotalOrders - 1,
            Popularity: orderData.Popularity
        })

        var db_pop = ..database().ref('Orders/Popularity/');
        // console.log(data.orderDetails)
        const orderList = data.orderDetails;
        // console.log(orderList);

        for (const key in orderList) {
            // console.log(orderList[key])
            // console.log(orderList[key].OrderName)
            db_pop.once("value", snap => {
                // console.log(snap.val())
                for (const i in snap.val()) {
                    // console.log(snap.val()[i])
                    // console.log(snap.val()[i].Name)
                    if (snap.val()[i].Name === orderList[key].OrderName) {
                        // console.log("found it  " + snap.val()[i].Name)


                        let updatedValue = snap.val()[i].Value - orderList[key].OrderQty;
                        // console.log(updatedValue);

                        const db_update = ..database().ref('Orders/Popularity/' + orderList[key].OrderName);
                        db_update.set({
                            Name: snap.val()[i].Name,
                            Value: updatedValue,
                        })
                        return;
                    }
                }
            })
        }

        const rem_db = ..database().ref('/OrderStatus/Shipped/').child(data.id);
        rem_db.remove();
    };

    const tbm_list = tBM.map(item => (
        <OrderCards1
            key={item.id}
            id={item.id}
            address={item.address}
            country={item.country}
            email={item.email}
            name={item.name}
            orderDetails={item.orderDetails}
            totalCost={item.totalCost}
            orderID={item.orderID}
            onUpdate={updatedStatusHandler1}
            onDelete={updatedDeleteHandler1}
        />
    ));

    const roc_list = rOC.map(item => (
        <OrderCards2
            key={item.id}
            id={item.id}
            address={item.address}
            country={item.country}
            email={item.email}
            name={item.name}
            orderDetails={item.orderDetails}
            totalCost={item.totalCost}
            orderID={item.orderID}
            onUpdate={updatedStatusHandler2}
            onDelete={updatedDeleteHandler2}
        />
    ));

    const shipped_list = shipped.map(item => (
        <OrderCards3
            key={item.id}
            id={item.id}
            address={item.address}
            country={item.country}
            email={item.email}
            name={item.name}
            orderDetails={item.orderDetails}
            totalCost={item.totalCost}
            orderID={item.orderID}
            onDelete={updatedDeleteHandler3}
        />
    ));


    return (
        <Grid container>
            {/* {openModal && <Modal closeModal={setOpenModal}/>} */}
            {/* <Topbar /> */}
            <Grid container spacing={8}>
                <Grid item sm={12}>
                    {/* <h2 className="home_heading">Hi Name Surname</h2> */}
                    {/* <p className="home_text_alt">Welcome back</p> */}

                    <h1 className="home_text_alt">Customers</h1>

                </Grid>

                <Grid item sm={12} md={4} >
                    <div className="customer_card" style={{ background: "#806EFF" }}>
                        <p>To be made</p>
                    </div>

                    <Grid container className="individual_section">
                        {tbm_list}
                    </Grid>
                </Grid>

                <Grid item sm={12} md={4}>
                    <div className="customer_card" style={{ background: "#FF6EEC" }}>
                        <p>Ready for contact</p>
                    </div>

                    <Grid container className="individual_section">
                        {roc_list}
                    </Grid>
                </Grid>

                <Grid item sm={12} md={4}>
                    <div className="customer_card" style={{ background: "#20F87E" }}>
                        <p>Shipped</p>
                    </div>
                    <Grid container className="individual_section">
                        {shipped_list}
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    );
}

export default CustomerBoard;