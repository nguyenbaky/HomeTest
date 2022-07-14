import { ADD, DELETE, EDIT } from "../../constant/user.const"

export const add = (name, email, phone) => dispatch => {
    console.log({
        name,
        email,
        phone
    })
    dispatch({
        type: ADD,
        payload: { name, email, phone }
    })
}

export const edit = (id, name, email, phone) => dispatch => {
    dispatch({
        type: EDIT,
        payload: { id, name, email, phone }
    })
}

export const deleteItem = (id) => dispatch => {
    dispatch({
        type: DELETE,
        payload: id
    })
}