import { Message } from "../action/action";
import { ADD_MESSAGE } from "../constant/constant";


const initialState = {
    messages: [],
};

const chatReducer = (state = initialState, action: { type: typeof ADD_MESSAGE; payload: Message; }) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};

export default chatReducer;
