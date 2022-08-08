import { getApiCategory, getApiProduct, getCategoriesProduct, getProductById } from "../../api/api";
import { GET_PRODUCT, GET_PRODUCT_INIT, GET_PRODUCT_ERROR, GET_CATEGORY, GET_CATEGORY_ERROR, GET_CATEGORIES_PRO, GET_CATEGORIES_PRO_ERROR, GET_ID, GET_ID_ERROR } from "../reducer/actionType";

export const getProductAction = (dispatch) => {
    dispatch({ type: GET_PRODUCT_INIT });
    getApiProduct()
        .then((response) => {
            dispatch({ type: GET_PRODUCT, payload: response.data });
        })
        .catch((e) => {
            dispatch({ GET_PRODUCT_ERROR, payload: e })
        });
};
export const getCategoryAction = (dispatch) => {
    getApiCategory()
        .then((response) => {
            dispatch({ type: GET_CATEGORY, payload: response.data });
        })
        .catch((e) => {
            dispatch({ type: GET_CATEGORY_ERROR, payload: e })
        })
}
export const getCategoriesProductAction = (dispatch, id) => {
    getCategoriesProduct(id)
        .then((response) => {
            dispatch({ type: GET_CATEGORIES_PRO, payload: response.data });
        })
        .catch((e) => {
            dispatch({ type: GET_CATEGORIES_PRO_ERROR, payload: e })
        })
}

export const getProductByIdAction = (dispatch, id) => {
    getProductById(id)
        .then((response) => {
            dispatch({ type: GET_ID, payload: response.data })
        })
        .catch((e) => {
            dispatch({ type: GET_ID_ERROR, payload: e })
        })

}