import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductBox from "../components/product-box";
import { getProductAction } from "../store/actions/actions";
const CartItem = () => {
    const dispatch = useDispatch();
    const [countCart, setCountCart] = useState()
    const [cartData, setCartData] = useState()
    const [price, setPrice] = useState(0)
    /* const [plusBtn, setplusBtn] = useState(1); */
    var productData = useSelector((state) => state.productReducer?.productData)
    // console.log("pp",productId)
    useEffect(() => {
        getProductAction(dispatch)
        var userId = JSON.parse(localStorage.getItem('id'))
        setCountCart(Object.entries(userId).length)
    }, [])
     useEffect(() => {
        var x = JSON.parse(localStorage.getItem('id'))
        console.log(x)
        var cartProducts = productData?.filter(item => {
            return x.includes(item.id)
        })
        setCartData(cartProducts)
        var pricing = 0
        cartProducts?.forEach((e) => {
            pricing += e.price
        })
        setPrice(pricing)
        console.log(cartProducts)
    }, [countCart, productData])
    console.log("price", price) 
    //console.log('id1', productId)
    // remove item 
     const removeCartButton = (id) => {
        // console.log(id)
        let items = JSON.parse(localStorage.getItem('id'))
        items.forEach(e => {
            if (e === id) {
                items.splice(items.indexOf(id), 1)
            }
        });
        // console.log("items", items)
        localStorage.setItem('id', JSON.stringify(items))
        var userId = JSON.parse(localStorage.getItem('id'))
        setCountCart(Object.entries(userId).length)
    } 
  /*   const Btn1 = () => {
        setplusBtn(plusBtn + 1)
    }
    const Btn2 = () => {
        if (plusBtn <= 1) {
            setplusBtn(plusBtn)
        }
        else {
            setplusBtn(plusBtn - 1)

        }
    } */


    return (
        <div>
            <h3>Added in Cart Items!</h3>
            <button >TotalCart<br />{countCart}</button>
            <h3>Total Price :{Math.floor(price)}</h3>
            {
                cartData ? cartData.map((e, index) => {
                    return <div key={index}>
                        <ProductBox props={e} />
                        {/* 
                        <h4>Title: {e.title}</h4>
                        <h4>Price Rs: {e.price}</h4>
                        <h4>Category : {e.category}</h4>
                        <h4>Rating : {e.rating.rate}</h4>
                        <img style={{ width: '100px' }} src={e.image} />
                        <button onClick={Btn1}>+</button> {plusBtn} <button onClick={Btn2}>-</button> <br />*/}
                        <button onClick={() => removeCartButton(e.id)} style={{ marginRight: "5px" }} >RemoveCart</button> 

                    </div>
                }) : null
                /*      productId?
                          <div>
                              <h4>Title: {productId.title}</h4>
                              <h4>Price Rs: {productId.price}</h4>
                              <h4>Category : {productId.category}</h4>
                              <h4>Rating : {productId.rating.rate}</h4>
                          </div> : null 
    */
            }
        </div>
    )
}
export default CartItem;