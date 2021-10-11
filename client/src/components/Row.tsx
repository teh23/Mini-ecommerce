
import React, { useState } from 'react'
import { IProduct } from '../interfaces'
import orderProduct from './orderProduct'
import { BsDash, BsPlus, } from 'react-icons/bs'
const Row: React.FunctionComponent<{
    product: IProduct
}> = ({ product }) => {
    const [orderNumber, setOrderNumber] = useState(1)

    const onChangeOrderNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (orderNumber > 0) {
            setOrderNumber(parseInt(e.target.value))
        } else {
            setOrderNumber(1)
        }
    }
    const iconsButton = (add: boolean) => {
        if (orderNumber > 0) {
            add ? setOrderNumber(orderNumber + 1) :
                orderNumber === 1 ? setOrderNumber(1) :
                    setOrderNumber(orderNumber - 1)
        } else {
            setOrderNumber(1)
        }


    }

    return (
        <li className={'bg-white flex  items-center w-full xl:p-4 space-x-4 border-b  h-58 p-2'}>
            <div className={``}>
                <img
                    src='https://via.placeholder.com/300x250'
                    className={``}
                    alt=''
                    loading='lazy'
                />
            </div>
            <div className={`flex flex-col justify-between items-start my-2 space-y-4 `}>
                <p className={` font-bold text-xl`}>{product.name.toUpperCase()}</p>
                <p className={`font-bold text-3xl my-2`}>{product.price / 100}</p>
                <div className={`flex justify-beetwen items-center `}>
                    <BsDash className={` left-10  w-6  h-6 `} onClick={e => iconsButton(false)} />
                    <div>
                        <input
                            type='number'
                            min={0}
                            max={product.stock}
                            className=' text-center border border-gray-800 w-8 lg:w-12 rounded h-8 '
                            onChange={onChangeOrderNumber}
                            value={orderNumber}

                        />
                        {` `}
                    </div>
                    <div>

                        <BsPlus className={` left-10  w-6  h-6 `} onClick={e => iconsButton(true)} />
                    </div>
                    <div>
                        <p className={`text-black text-opacity-90 text-sm `}>
                            z {product.stock} sztuk
                        </p>
                    </div>
                </div>

                <button
                    className={
                        `border-b py-2   font-medium text-white px-8 ${product.stock === 0 ? 'bg-red-400' : 'bg-red-600'}`
                    }
                    onClick={(e) =>
                        orderProduct(e, product.productId, orderNumber, setOrderNumber)
                    }
                    disabled={product.stock === 0}>
                    ZAMÓW TERAZ
                </button>
            </div>
        </li >
    )
}

export default Row
