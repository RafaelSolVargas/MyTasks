import React, { createContext, useState, useContext, useRef } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [loadingData, setLoadingData] = useState({ isLoading: false, message: '', priority: false })
    const loadingDataRef = useRef(loadingData)
    loadingDataRef.current = loadingData

    function showLoading(message, priority) {
        /* The priority property now sets if this loading screen could be hide by anyone or not */
        setLoadingData({ isLoading: true, message, priority })
    }
    function hideLoading(message) {
        /* I changed the workflow of the loading screen, now when an component call this function he could set the priority parameter that
        allows only him to hide the Loading screen, this avoid context and components conflicts using the Loading Screen */
        if (loadingDataRef.current.message === message || !loadingDataRef.current.priority)
            setLoadingData({ isLoading: false, message: '', priority: false })
    }

    return (
        <LoadingContext.Provider
            value={{
                showLoading,
                hideLoading,
                loadingData,
            }}>
            {children}
        </LoadingContext.Provider>
    )
}

function useLoading() {
    const context = useContext(LoadingContext);

    if (!context) throw new Error('useLoading must be used within an Auth Provider')

    return context
}

export { LoadingProvider, useLoading }