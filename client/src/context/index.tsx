import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ctx, IProduct, Actions } from '../interfaces';
import Reducer from './Reducer';

const productCtx = createContext<ctx>({
  product: [] as IProduct[],
  dispatch: () => [],
});

const Context: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [product, dispatch] = useReducer(Reducer, [] as IProduct[]);

  useEffect(() => {
    const fetchInitialApi = async () => {
      const initial = await axios.get('/api/product');
      console.log(initial);
      dispatch({ type: Actions.INIT, payload: initial.data });
    };
    fetchInitialApi();
    let url = '';
    if (process.env.NODE_ENV !== 'production') {
      url = 'http://localhost:3001';
    }
    const sse = new EventSource(`${url}/api/product`);

    sse.onmessage = async (e) => {
      dispatch({
        type: Actions.INIT,
        payload: await JSON.parse(e.data),
      });
    };
  }, []);

  return (
    <productCtx.Provider value={{ product, dispatch }}>
      {children}
    </productCtx.Provider>
  );
};

export default Context;
export const useProduct = () => useContext(productCtx);
