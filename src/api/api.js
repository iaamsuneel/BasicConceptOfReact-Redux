import axios from 'axios';
export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
    // baseURL: 'https://fakestoreapi.com/'
})
export const getApiProduct = () => {
    return api.get("/products");
}
export const getApiCategory = () => {
    return api.get('/products/categories');
}
export const getProductById = (id) => {
    return api.get(`/products/${id}`)
}
export const getCategoriesProduct = (category) => {
    if (category === 'selectCategories') {
        return api.get("/products");
    }
    else {

        return api.get(`/products/category/${category}`);
    }
}

/* export const getProductByCategory = (category) => {
    if (category == "All") {
        return api.get("/products")
    }
    return api.get(`/products/category/${category}`)
} */