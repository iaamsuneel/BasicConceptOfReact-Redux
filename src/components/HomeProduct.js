import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const HomeProduct = ({ probs }) => {
    let e = probs
    const [countCart, setCountCart] = useState()
    const [price, setPrice] = useState(0)

    //for sorting Data
    var productData = useSelector((state) => state.productReducer?.productData)
    // addcartButton
    const addCartButton = (id) => {
        if (localStorage.getItem('id')) {
            const userId = JSON.parse(localStorage.getItem('id'))
            console.log('savedId', userId)
            if (!userId.includes(id)) {
                //console.log('include', includes(id))
                console.log('user', userId)
                localStorage.setItem('id', JSON.stringify([...userId, id]))
            }
        }
        else {
            localStorage.setItem('id', JSON.stringify([id]))
        }
        var userId = JSON.parse(localStorage.getItem('id'))
        setCountCart(Object.entries(userId).length)
        var x = JSON.parse(localStorage.getItem('id'))
        console.log("checkid", x)
        var PriceData = productData?.filter((item) => {
            return x.includes(item.id)
        })
        // console.log("newDtaa" , PriceData)
        var pricing = 0;
        PriceData?.forEach((e) => {
            pricing += e.price
            console.log("pp".price)
        })
        setPrice(pricing)
        console.log("ppp", pricing)
    }
    // removeCartButton 
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
        var x = JSON.parse(localStorage.getItem('id'))
        console.log("checkid", x)
        var PriceData = productData?.filter((item) => {
            return x.includes(item.id)
        })
        // console.log("newDtaa" , PriceData)
        var pricing = 0;
        PriceData?.forEach((e) => {
            pricing -= e.price
            console.log("pp".price)
        })
        setPrice(pricing)
        console.log("ppp", pricing)

    }
    return (<>

        <Link to={`/product/${e.id}`}>
            <h4>Id: {e.id}</h4>
            <h4>Title: {e.title}</h4>
            <h4>Price Rs: {e.price}</h4>
            <h4>Category : {e.category}</h4>
            <h4>Rating : {e.rating.rate}</h4>
            <img style={{ width: '100px' }} src={e.image} /></Link>
        {JSON.parse(localStorage.getItem('id'))?.includes(e.id) ? <button onClick={() => removeCartButton(e.id)} style={{ marginRight: "5px" }} >RemoveCart</button> : <button onClick={() => addCartButton(e.id)} style={{ margin: "10px" }} >AddCart</button>}
    </>)
}
export default HomeProduct