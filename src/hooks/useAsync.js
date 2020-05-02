import {useCallback, useEffect, useState} from "react";

export const useAsync = (asyncFunction, immediate = true, responseTransformer) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const [wasFetched, setWasFetched] = useState(false);

    const execute = useCallback((data) => {
        setIsLoading(true);
        setWasFetched(true);
        setValue(null);
        setError(null);
        return asyncFunction(data)
            .then((response) => {
                if(responseTransformer && typeof responseTransformer === 'function') {
                    const value = responseTransformer(response);
                    if(value instanceof Promise)
                        value.then(setValue);
                    else
                        setValue(value);
                }

                else
                    setValue(response);
                return response;
            })
            .catch((error) => {
                console.error(error);
                setError(error);
                return Promise.reject(error);
            })
            .finally(() => setIsLoading(false));
    }, [asyncFunction, responseTransformer]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, isLoading, value, error, wasFetched };
};