import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryAction, getProductAction, getCategoriesProductAction } from '../store/actions/actions';
const Home = () => {
    const [countCart, setCountCart] = useState()
    const [price, setPrice] = useState(0)
    const dispatch = useDispatch();
    //for sorting Data
    const [sortData, setSortData] = useState()
    const [filter, setFilter] = useState()
    var productData = useSelector((state) => state.productReducer?.productData)
    const allData = productData && [...productData]
    // lazy Loading 
    const loading = useSelector((state) => state.productReducer?.loading)
    const categoryData = useSelector((state) => state.categoryReducer?.categoryData)
    const categoryDataPro = useSelector((state) => state.categoryReducer?.categoryDataPro)
    console.log(" te ", categoryDataPro)
    useEffect(() => {
        getProductAction(dispatch)
        getCategoryAction(dispatch)
        var userId = JSON.parse(localStorage.getItem('id'))
        setCountCart(Object.entries(userId).length)
    }, [dispatch])
    useEffect(() => {
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
    }, [sortData, productData])

    //console.log("catergoryValues=" + categoryData)
    const selectCatProduct = (e) => {
        console.log(e.target.value)
        /*  getCategoriesProductAction(e.target.value) */
        getCategoriesProductAction(dispatch, e.target.value)
        // console.log(" CategoryData ", categoryDataPro)
    }
    if (categoryDataPro?.length) {
        productData = categoryDataPro
    }
    if (loading) {
        return <h1>....Loading</h1>
    }
    // sorting order Data
    const sortingOrder = (e) => {
        var sortedData = [...productData]
        if (e.target.value === "asc") {
            sortedData.sort((a, b) => (a.price > b.price) ? 1 : -1)
        }
        else if (e.target.value === 'dsc') {
            sortedData.sort((a, b) => (a.price < b.price) ? 1 : -1)
        }
        else {
            sortedData.sort((a, b) => (a.id > b.id) ? 1 : -1)
        }
        setSortData(sortedData)
    }
    if (sortData) {
        productData = sortData
    }
    // console.log("sort", productData)
    // Search filter 
    let filteredData
    const searchFilter = (e) => {
        const value = e.target.value;
        //console.log(value)
        if (value) {
            filteredData = allData.filter((item) => {
                return item.title.toLowerCase().includes(value.toLowerCase())
            })
            console.log(filteredData)
        }
        setFilter(filteredData)
    }
    if (filter) {
        productData = filter;
        console.log("dd", productData)
    }
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
        <h2>Get Product Using Api In Redux</h2>
        <Link to='/cartitem'><h3>CartQuantity:{countCart ? countCart : null}</h3></Link>
        <div style={{ float: "right", margin: "10px" }}>
            <Link to={countCart ? "/cartitem" : ""}><button>AddCart<br />{countCart ? countCart : null}</button></Link>
        </div>
        <div>TotalPrice:{Math.floor(price)}</div>

        <select onChange={selectCatProduct}>
            <option>selectCategories</option>
            {
                categoryData ? categoryData.map((e, index) => {
                    return (<option key={index} value={e}>{e}</option>)
                }
                ) : null
            }
        </select>
        <select style={{ margin: "10px" }} onChange={sortingOrder}>
            <option value="default">default</option>
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
        </select>
        {/*     <button  style={{ margin: "8px" }}>Search</button> */}
        <input onChange={searchFilter} placeholder="Search" type="search" />
        {
            productData ? productData.map((e, index) => {
                return <div key={index}>

                    <Link to={`/product/${e.id}`}>
                        <h4>Id: {e.id}</h4>
                        <h4>Title: {e.title}</h4>
                        <h4>Price Rs: {e.price}</h4>
                        <h4>Category : {e.category}</h4>
                        <h4>Rating : {e.rating.rate}</h4>
                        <img style={{ width: '100px' }} src={e.image} /></Link>
                    {JSON.parse(localStorage.getItem('id'))?.includes(e.id) ? <button onClick={() => removeCartButton(e.id)} style={{ marginRight: "5px" }} >RemoveCart</button> : <button onClick={() => addCartButton(e.id)} style={{ margin: "10px" }} >AddCart</button>}
                </div>
            }) : null
        }
    </>
    )
}
export default Home;