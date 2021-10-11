import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useProduct } from './context';
import Row from './components/Row';


function App() {
    const { product } = useProduct();


    if (!product) return <>Loading...</>;

    return (
        <div className="bg-gray-200 min-h-screen min-w-full">
            <div className=" container xl:w-2/3 2xl:w-3/5 mx-auto bg-white rounded-xl">
                <p className={"font-bold text-3xl p-4"}>Products</p>

                <ul className=" ">
                    {product.map((ele, idx) => {
                        console.log(ele)
                        return (

                            <Row product={ele} key={idx} />

                        );
                    })}
                </ul>

            </div>
        </div>

    );
}

export default App;
