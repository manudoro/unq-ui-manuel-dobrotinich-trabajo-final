import "./Words.css";

const Modal = ({ show, children }) => {
    if (!show) return null;
    
    return (
        <div className="modal-overlay">
        <div className="modal">
            {children}
        </div>
        </div>
    );
    }

export default Modal;