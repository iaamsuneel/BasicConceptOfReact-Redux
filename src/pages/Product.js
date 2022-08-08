import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIdAction } from "../store/actions/actions";
import { useParams } from "react-router-dom";
const Product = () => {

    const dispatch = useDispatch();
    var productId = useSelector((state) => state.categoryReducer?.productid)
    const { id } = useParams();
    useEffect(() => {
        getProductByIdAction(dispatch, id)
    }, [])
    
    /*   console.log('id',productId) */
    return (<>
        <h4>View Product id wise!</h4>
        <h3>Product : {id}</h3>
        {
            productId ? <div>
                <h4>Title: {productId.title}</h4>
                <h4>Price Rs: {productId.price}</h4>
                <h4>Category : {productId.category}</h4>
                <h4>Rating : {productId.rating.rate}</h4>
                <img style={{ width: '100px' }} src={productId.image} />
            </div>
                : null
        }
    </>)
}
export default Product;