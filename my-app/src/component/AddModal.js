import Modal from "react-modal";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

function AddModal({ children, open, onClose }) {
    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            style={customStyles}
        >
            <h2 className="modal-title">Add New Data</h2>
            {children}
        </Modal>
    )
}

export default AddModal