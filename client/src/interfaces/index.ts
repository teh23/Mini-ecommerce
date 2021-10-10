export interface IAction {
    type: Actions
    payload: IProduct[]
}

export enum Actions {
    ADD = 'ADD',
    INIT = 'INIT',
}
export interface ctx {
    product: IProduct[]
    dispatch: React.Dispatch<IAction>
}
export interface IProduct {
    productId: number
    name: string
    price: number
    stock: number
}
export interface IOrder {
    productId: number
    order: number
}
