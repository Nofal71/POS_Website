import React, { useContext, useEffect } from "react";
import { AlertContext } from "../../Context/FeedbackContext";

const Alert = () => {
    const { Alert, openAlert, closeAlert } = useContext(AlertContext);

    useEffect(() => {
        let timer;
        if (openAlert) {
            console.log(Alert.type)
            timer = setTimeout(() => closeAlert(), 5000);
        }
        return () => clearTimeout(timer);
    }, [openAlert, closeAlert]);

    return (
        <>
            {openAlert && (
                <div className="toast toast-top toast-start z-50 ">
                    <div role="alert" className={`alert ${Alert.type}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{Alert.message}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Alert;
