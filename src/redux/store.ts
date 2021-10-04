import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import gameReducer from "./game/gameReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof rootReducer>