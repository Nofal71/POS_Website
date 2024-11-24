import React, { useContext, useEffect } from "react";
import { AlertContext } from "../../Context/FeedbackContext";

const Alert = () => {
    const { Alert, openAlert, closeAlert } = useContext(AlertContext);

    useEffect(() => {
        let timer;
        if (openAlert) {
            timer = setTimeout(() => closeAlert(), 5000);
        }
        return () => clearTimeout(timer);
    }, [openAlert, closeAlert]);

    return (
        <>
            {openAlert && (
                <div className="toast toast-top toast-center z-50 ">
                    <div role="alert" className={`alert mx-auto ${Alert.type}`}>
                        <span>{Alert.message}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Alert;
