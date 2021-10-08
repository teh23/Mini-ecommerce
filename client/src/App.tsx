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
    const sse = new EventSource("http://127.0.0.1:3001/api/product")
    useEffect(() => {
        if (isInitialMount.current) {
            const fetchInitialApi = async () => {
                const initial = await axios.get("http://127.0.0.1:3001/api/product")
                setState(initial.data)
            }
            fetchInitialApi()

            isInitialMount.current = false
        } else {
            console.log("sse")
            sse.onmessage = (e) => {

                setState(JSON.parse(e.data))
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
