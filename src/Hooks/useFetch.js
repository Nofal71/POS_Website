import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = ({ URL }) => {
    const [isFetching, setFetchProgress] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetchProgress(true);
                const { data } = await axios.get(URL);
                setResponse(data);
                setFetchProgress(false);
            } catch (err) {
                setError(err);
                console.error(err);
            }
        };
        URL ? fetchData() : console.log('Wrong URL', URL)
    }, [URL]);

    return { isFetching, error, response };
};

export default useFetch;
