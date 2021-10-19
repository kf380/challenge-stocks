import{GET_ALL_STOCKS, LOADING, GET_STOCKS_ERROR, LOGIN_USER} from "../constants"

import axios from "axios";
// export const searchQueryStocks = (name) => async (dispatch) => {
//     try {
//         const res = await axios.get(`${URL}/food/api/products/search/${name}`);
//         dispatch({            
//             type: SEARCH_PRODUCTS, 
//             payload: res.data
//         });
//     } catch (err) {
//         console.log(err)
//     }
//  };

export const authUser =  (user) => async (dispatch) => {
    try {
        const user1 = await axios.post(`http://localhost:3003/auth`, user);
       console.log(user1,"useeeeeeeeeeeer")
        dispatch({
            type: LOGIN_USER,
            payload: user1.data
        })

    } catch (err) {
        console.log(err)
    }
};  
export const getAllStocks = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:3003/stock');
        dispatch({
            type: GET_ALL_STOCKS,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
 };



 export const loading = () => (dispatch) => {
    dispatch({
        type: LOADING
    })
}