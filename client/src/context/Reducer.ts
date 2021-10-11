import { Actions, IAction, IProduct } from '../interfaces'

const Reducer = (state: IProduct[], action: IAction) => {
    switch (action.type) {
        case Actions.ADD:
            return action.payload
        case Actions.INIT:
            return action.payload
    }
}

export default Reducer
