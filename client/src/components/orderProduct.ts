import axios from 'axios'

const orderProduct = async (
    e: React.MouseEvent<HTMLElement>,
    productId: number,
    orderNumber: number,
    setOrderNumber: React.Dispatch<React.SetStateAction<number>>
) => {
    e.preventDefault()
    await axios
        .post('http://localhost:3001/api/order', {
            productId,
            quantity: orderNumber,
        })
        .catch((err) => alert(err))
    setOrderNumber(1)
}

export default orderProduct
