import { ADD_MESSAGE } from "../constant/constant";

export interface Message {
    id: string;
    model: string
}

export const addMessage = (message: Message) => ({
    type: ADD_MESSAGE,
    payload: message,
});
