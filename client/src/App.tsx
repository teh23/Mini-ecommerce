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

    //TODO FIX PROXY
    const sse = new EventSource("http://localhost:3001/api/product")
    console.log(sse)
    useEffect(() => {
        if (isInitialMount.current) {
            const fetchInitialApi = async () => {
                const initial = await axios.get("api/product")
                setState(initial.data)
            }
            fetchInitialApi()

            isInitialMount.current = false
        } else {
            console.log("sse")
            sse.onmessage = async (e) => {

                setState(await JSON.parse(e.data))
            }
        }

    })
    if (!data) return <>Loading...</>
    return (
        <div className="App">
            <header className="App-header">
                <ul>
                    {data.map((ele, idx) => {

                        return (
                            <li key={idx}>Name: {ele.name} Stock: {ele.stock}</li>
                        )
                    })}
                </ul>

            </header>
        </div>
    );
}

export default App;
