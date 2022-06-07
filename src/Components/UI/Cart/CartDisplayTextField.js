import { TextField } from '@material-ui/core';
import React, { useState } from 'react'

export default function CartDisplayTextField(props) {
    const { updatedValue } = props;

    const [updatedPrice, setUpdatedPrice] = useState(props.value.price);
    // console.log(props.value)
    // const uPriceRef = useRef();

    // const updatePriceHandler = () => {
    //     setUpdatedPrice(prevPrice => {
    //         if (prevPrice !== uPriceRef.current.value)
    //             return uPriceRef.current.value;
    //         else
    //             return prevPrice;
    //     });
    //     updatedValue(uPriceRef.current.value);
    //     // console.log(uPriceRef.current.value)
    //     console.log(updatedPrice)
    // }

    const updatePriceHandler = (a) => {
        console.log(a)
        setUpdatedPrice(a);
        const newVal = {
            id: props.value.id,
            name: props.value.name,
            price: a,
            description: props.value.description,
            qty: props.value.qty
        }
        updatedValue(newVal);
    }

    return (
        <div>
            {/* <p>$ {priceChange}</p>         */}

            <TextField defaultValue={updatedPrice} onChange={a => updatePriceHandler(a.target.value)} variant="standard"></TextField>

            {/* <input defaultValue={updatedPrice} ref={uPriceRef}></input> */}
            {/* <button onClick={updatePriceHandler}>OK</button> */}
        </div>
    )
}
