import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'axios'
import axios from 'axios';
import { setTimeout } from 'timers';

interface Product {
    productId: number,
    name: string,
    price: number,
    stock: number
}

function App() {

    const [data, setState] = useState([] as Product[])
    const isInitialMount = useRef(true)




    useEffect(() => {
        if (isInitialMount.current) {
            const fetchInitialApi = async () => {
                const initial = await axios.get("api/product")
                setState(initial.data)
            }
            fetchInitialApi()

            isInitialMount.current = false
        } else {
            //on dev change to :3001 proxy dont work with eventsoruce
            const sse = new EventSource("api/product")
            console.log(sse)
            sse.onmessage = async (e) => {
                console.log(e)
                setState(await JSON.parse(e.data))
            }



        }

    }, [isInitialMount.current])

    const orderProduct = async (e: any, productId: number) => {
        e.preventDefault()
        const post = await axios
            .post("http://localhost:3001/api/order", {
                productId: productId,
                quantity: 10
            })

        console.log(post.data)
        console.log(productId)
    }

    if (!data) return <>Loading...</>
    return (
        <div className="App">
            <header className="App-header">
                <ul>
                    {data.map((ele, idx) => {

                        return (
                            <form key={idx}>
                                <li >Id: {ele.productId} Name: {ele.name} Stock: {ele.stock} <button onClick={e => orderProduct(e, ele.productId)}>ZAMÓW</button></li>
                            </form>
                        )
                    })}
                </ul>

            </header>
        </div>
    );
}

export default App;
