import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useProduct } from './context';


enum Actions {
  ADD = 'ADD',
}

function App() {
  const { product, dispatch } = useProduct();



  const orderProduct = async (e: any, productId: number) => {
    e.preventDefault();
    const post = await axios.post('http://localhost:3001/api/order', {
      productId,
      quantity: 10,
    });
  };

  if (!product) return <>Loading...</>;
  return (

    <div className="App">
      <header className="App-header">
        asd
        <ul>
          {product.map((ele, idx) => {
            console.log(ele);
            return (
              <form key={idx}>
                <li>
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
                  <button
                    onClick={(e) => orderProduct(e, ele.productId)}
                  >
                    ZAMÓW
                  </button>
                </li>
              </form>
            );
          })}
        </ul>
      </header>
    </div>

  );
}

export default App;
