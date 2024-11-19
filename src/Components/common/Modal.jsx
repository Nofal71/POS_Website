import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../Context/FeedbackContext";

const Modal = () => {
    const { openModal, setModal, modalContent } = useContext(ModalContext);
    const { component: Component, actions } = modalContent;

    useEffect(() => {
        const modal = document.getElementById("my_modal_1");
        if (openModal) {
            modal?.showModal();
        } else {
            modal?.close();
        }
    }, [openModal]);

    const handleClose = (action) => {
        typeof action === 'function' && action()
        document.getElementById("my_modal_1").close()
        setModal()
    }

    return (
        <>
            <dialog id="my_modal_1" className="modal">
                {/* <button className="btn btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button> */}
                <div className="modal-box">
                    {Component && <Component />}
                    <div className="modal-action">
                        {actions && actions.length > 0 && (
                            actions.map((action, index) => (
                                <button
                                    key={index}
                                    className={`btn ${action.className || ""}`}
                                    onClick={() => handleClose(action.handler)}
                                >
                                    {action.label}
                                </button>
                            ))
                        )}
                        <button className="btn" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
