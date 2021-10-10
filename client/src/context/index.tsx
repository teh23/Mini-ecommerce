import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ctx, IProduct, Actions } from "../interfaces";
import Reducer from "./Reducer";

const productCtx = createContext<ctx>({ product: [] as IProduct[], dispatch: () => [] })


const Context: React.FunctionComponent<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [product, dispatch] = useReducer(Reducer, [] as IProduct[]);

    useEffect(() => {
        const fetchInitialApi = async () => {
            const initial = await axios.get(
                'http://localhost:3001/api/product',
            );
            dispatch({ type: Actions.INIT, payload: initial.data });

        }
        fetchInitialApi();
        const sse = new EventSource('http://localhost:3001/api/product');
        console.log(sse);
        sse.onmessage = async (e) => {
            console.log(e);
            dispatch({
                type: Actions.INIT,
                payload: await JSON.parse(e.data),
            });
        };
    }, [])

    return (
        <productCtx.Provider value={
            { product, dispatch }}>
            {children}
        </productCtx.Provider>
    )
};

export default Context;
export const useProduct = () => useContext(productCtx)

