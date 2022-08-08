import { GET_CATEGORY, GET_CATEGORY_ERROR, GET_PRODUCT, GET_PRODUCT_ERROR, GET_PRODUCT_INIT, GET_CATEGORIES_PRO_ERROR, GET_CATEGORIES_PRO, GET_ID, GET_ID_ERROR } from "./actionType";
const initialState = {
    loading: false,
    error: null,
}
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_INIT: return { ...state, loading: true }
        case GET_PRODUCT: return { ...state, productData: action.payload, loading: false }
        case GET_PRODUCT_ERROR: return { ...state, error: action.payload, loading: false }
        default: return state
    }
}
export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY: return { ...state, categoryData: action.payload, loading: false }
        case GET_CATEGORY_ERROR: return { ...state, error: action.payload, loading: false }
        case GET_CATEGORIES_PRO: return {
            ...state, categoryDataPro: action.payload, loading: false
        }
        case GET_CATEGORIES_PRO_ERROR: return { ...state, error: action.payload, loading: false }
        case GET_ID: return { ...state, productid: action.payload, loading: false }
        case GET_ID_ERROR: return { ...state, error: action.payload, loading: false }
        default: return state
    }
} 
