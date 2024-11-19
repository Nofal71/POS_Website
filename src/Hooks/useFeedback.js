import { useContext } from "react";
import { AlertContext, ModalContext } from "../Context/FeedbackContext";

const useFeedback = () => {
    const { setModal } = useContext(ModalContext)
    const { setAlert } = useContext(AlertContext)

    const Alert = (message, type) => setAlert(message, type)
    const Modal = (content) => setModal(content)

    return { Alert, Modal }

};

export default useFeedback;
