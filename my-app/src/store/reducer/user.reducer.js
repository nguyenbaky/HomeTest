import { ADD, EDIT, DELETE } from '../../constant/user.const'
function randomNum() {
    return Math.round((Math.random() * 10000))
}

const initialState = {
    data: [
        {
            id: randomNum(),
            name: "Ky",
            email: "baky12lhp@gmail.com",
            phone: "0121031348"
        },
        {
            id: randomNum(),
            name: "Khang",
            email: "K@gmail.com",
            phone: "0562324145"
        }
    ]
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            const arrData = [...state.data]
            arrData.push({ ...action.payload, id: randomNum() })
            return { ...state, data: arrData }
        case EDIT:
            const { id, name, phone, email } = action.payload
            const newData = [...state.data]
            const indexEdit = newData.findIndex(d => d.id === id)
            newData[indexEdit] = { ...newData[indexEdit], name, email, phone }
            return { ...state, data: [...newData] }
        case DELETE:
            const indexDelete = state.data.findIndex(d => d.id === action.payload)
            const tempData = [...state.data]
            tempData.splice(indexDelete, 1)
            return { ...state, data: [...tempData] }
        default: return { ...state }
    }
}