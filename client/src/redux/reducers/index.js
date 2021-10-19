import{
    GET_ALL_STOCKS,
    LOGIN_USER,
    LOADING
} from "../constants"

const initialState={
    stocksState:{
        stocks:[],
        error:null,
        loading:false
    }
}

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_STOCKS:
            return{
                ...state,
                stocksState:{
                    stocks:[],
                    error:null,
                    loading:false
                }
            }
            case LOGIN_USER:
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                return {
                  ...state,
                  user: action.payload.user,
                 
                };
                case LOADING:
                    return {
                      ...state,
                      loading: false
                    };
       default:
        return state;
}
}

export default rootReducer;
