import { combineReducers } from "redux";
import domain from "./domain_reducer";
import email from "./email_reducer";

const pwnedReducer = combineReducers({
    domain,
    email
});

export default pwnedReducer;
