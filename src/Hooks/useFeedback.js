import { useContext } from "react";
import { AlertContext, CartCountUpdate, ModalContext } from "../Context/FeedbackContext";

const useFeedback = () => {
    const { setModal } = useContext(ModalContext)
    const { setAlert } = useContext(AlertContext)
    const { cartCount, setCartCount } = useContext(CartCountUpdate)

    const Alert = (message, type) => setAlert(message, type)
    const Modal = (content) => setModal(content)


    return { Alert, Modal, cartCount, setCartCount }

};

export default useFeedback;
