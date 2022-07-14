import { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { add, edit, deleteItem } from '../../store/action/user.action';
import * as yup from 'yup';
import AddModal from "../../component/AddModal"

let schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email(),
    phone: yup.number().required().positive().integer(),
});

function HomePage(props) {
    const [selectedRow, setSelectedRow] = useState([])
    const [editData, setEditData] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [addItem, setAddItem] = useState({})

    useEffect(() => {
        const arr = props.data.map(d => ({
            isEdit: false,
            data: d
        }))
        setEditData([...arr])
    }, [props.data])

    const handleEditData = (index, name, value) => {
        const x = [...editData]
        x[index] = { ...x[index], data: { ...x[index].data, [name]: value } }
        setEditData([...x])
    }

    const handleEdit = (index, isEdit) => {
        const x = [...editData]
        x[index] = {
            ...x[index],
            isEdit
        }
        setEditData([...x])
    }

    const handleSaveEdit = (index) => {
        const { id, name, email, phone } = editData[index].data
        props.editItem(id, name, email, phone)
        handleEdit(index, false)
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const addData = (name, value) => {
        setAddItem((prev) => ({ ...prev, [name]: value }))
    }

    const handleSaveAdd = (e) => {
        e.preventDefault();
        schema.validate(addItem).catch(function (err) {
            if (err) alert(err)
            return
        })
        const { name, email, phone } = addItem
        props.addItem(name, email, phone)
        setIsOpen(false)
    };

    const handleDeleteMany = () => {
        console.log(selectedRow)
        for (let i = 0; i < selectedRow.length; i++) {
            handleDeleteOne(selectedRow[i])
        }
        setSelectedRow([])
    }

    const handleDeleteOne = async (id) => {
        await props.deleteItem(id)
    }

    return (
        <div>
            <table id="table" border={1}>
                <thead>
                    <tr>
                        <th></th>
                        <th style={{ width: '50px' }}>Name</th>
                        <th style={{ width: '200px' }}>Email</th>
                        <th style={{ width: '200px' }}>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.length > 0 && props.data.map((d, index) => (
                            <tr key={d.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        id={d.id}
                                        name={d.name}
                                        checked={selectedRow.includes(d.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                let newArr = [...selectedRow]
                                                newArr.push(d.id)
                                                setSelectedRow([...newArr])
                                            } else {
                                                let newArr = [...selectedRow]
                                                let i = newArr.indexOf(d.id)
                                                newArr.splice(i, 1)
                                                setSelectedRow([...newArr])
                                            }
                                        }}
                                    />
                                </td>
                                <td style={{ width: '200px' }}>
                                    {editData[index]?.isEdit ? (
                                        <input
                                            type="text"
                                            id="table_name"
                                            name="name"
                                            value={editData[index]?.data?.name || d.name}
                                            onChange={(e) => {
                                                handleEditData(index, e.target.name, e.target.value);
                                            }}
                                        />
                                    ) : (
                                        d.name
                                    )}
                                </td>
                                <td style={{ width: '200px' }}>
                                    {editData[index]?.isEdit ? (
                                        <input
                                            type="text"
                                            id="table_email"
                                            name="email"
                                            value={editData[index]?.data?.email || d.email}
                                            onChange={(e) => {
                                                handleEditData(index, e.target.name, e.target.value);
                                            }}
                                        />
                                    ) : (
                                        d.email
                                    )}
                                </td>
                                <td style={{ width: '200px' }}>
                                    {editData[index]?.isEdit ? (
                                        <input
                                            type="text"
                                            id="table_phone"
                                            name="phone"
                                            value={editData[index]?.data?.phone || d.phone}
                                            onChange={(e) => {
                                                handleEditData(index, e.target.name, e.target.value);
                                            }}
                                        />
                                    ) : (
                                        d.phone
                                    )}
                                </td>
                                <td>
                                    {editData[index]?.isEdit ? (
                                        <>
                                            <button onClick={(e) => handleSaveEdit(index)}>Save</button>
                                            <button onClick={(e) => handleEdit(index, false)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={(e) => handleEdit(index, true)}>
                                                Edit
                                            </button>
                                        </>
                                    )}
                                    <button onClick={(e) => handleDeleteOne(d.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    {props.data?.length === 0 && 'No item'}
                </tbody>
            </table>
            <button onClick={openModal}>Add</button>
            <button disabled={!selectedRow.length} onClick={handleDeleteMany}>Delete Many</button>
            <AddModal open={modalIsOpen} onClose={closeModal}>
                <form className="modal-form" id="addForm">
                    <div className="modal-input">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name_modal"
                            name="name"
                            value={addItem?.name || ""}
                            onChange={(e) => {
                                addData(e.target.name, e.target.value);
                            }}
                        />
                    </div>
                    <div className="modal-input">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email_modal"
                            name="email"
                            value={addItem?.email || ""}
                            onChange={(e) => {
                                addData(e.target.name, e.target.value);
                            }}
                        />
                    </div>
                    <div className="modal-input">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="number"
                            id="phone_modal"
                            name="phone"
                            value={addItem?.phone || ""}
                            onChange={(e) => {
                                addData(e.target.name, e.target.value);
                            }}
                        />
                    </div>
                    <div className="modal-button">
                        <button onClick={closeModal}>Close</button>
                        <button type="submit" onClick={handleSaveAdd}>
                            Submit
                        </button>
                    </div>
                </form>
            </AddModal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
    addItem: (name, email, phone) => dispatch(add(name, email, phone)),
    editItem: (index, name, email, phone) => dispatch(edit(index, name, email, phone)),
    deleteItem: (index) => dispatch(deleteItem(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);