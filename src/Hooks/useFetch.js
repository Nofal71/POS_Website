import axios from "axios";
import { useState } from "react";
import useFeedback from "./useFeedback";

const useFetch = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const {Alert} = useFeedback()

    const axiosInstance = axios.create({
        baseURL : 'http://localhost:3000/', 
        timeout: 10000, 
        headers: {
            "Content-Type": "application/json",
        },
    });

    const makeRequest = async (method, endpoint, data = null, options = {}) => {
        setIsFetching(true);
        setError(null);

        const config = {
            method,
            url: endpoint,
            data,
            ...options, 
        };

        try {
            const res = await axiosInstance(config);
            return res.data;
        } catch (err) {
            setError(true)
            Alert('Error in Loading Data' , 'alert-error')
            throw err; 
        } finally {
            setIsFetching(false);
        }
    };

    return { makeRequest, isFetching, error };
};

export default useFetch;
