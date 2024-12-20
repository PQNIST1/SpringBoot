import { combineReducers } from "@reduxjs/toolkit";
import logReducer from './SliceReducer/log';
import userReducer from './SliceReducer/user';;
import companyReducer from './SliceReducer/company';
import searchReducer from './SliceReducer/search';

const rootReducer = combineReducers({
    log: logReducer,
    user: userReducer,
    company: companyReducer,
    search: searchReducer,
})

export default rootReducer