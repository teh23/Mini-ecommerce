import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useProduct } from './context';

function App() {
    const { product } = useProduct();
    const [orderNumber, setOrderNumber] = useState([] as number[])

    useEffect(() => {
        if (0 < product.length) {
            console.log('comp')
        }
    })

    const orderProduct = async (e: any, productId: number, index: number) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/api/order', {
            productId,
            quantity: orderNumber[index],
        });
    };

    const onChangeOrderNumber = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const temp = orderNumber
        temp[index] = parseInt(e.target.value)
        setOrderNumber(temp)
        //setOrderNumber(orderNumber)

    }
    if (!product) return <>Loading...</>;
    return (

        <div className="App">
            <header className="App-header">
                asd
                <ul>
                    {product.map((ele, idx) => {

                        return (

                            <li key={idx}>
                                Id:
                                {' '}
                                {ele.productId}
                                {' '}
                                Name:
                                {' '}
                                {ele.name}
                                {' '}
                                Stock:
                                {' '}
                                {ele.stock}
                                {' '}
                                <input min={0} max={ele.stock} type="number" onChange={e => onChangeOrderNumber(e, idx)} value={orderNumber[idx]} />
                                <button
                                    onClick={(e) => orderProduct(e, ele.productId, idx)}
                                >
                                    ZAMÓW
                                </button>
                            </li>

                        );
                    })}
                </ul>
            </header>
        </div>

    );
}

export default App;
