import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [loadingData, setLoadingData] = useState({ isLoading: false, message: '' })

    function showLoading(message) {
        setLoadingData({ isLoading: true, message })
    }
    function hideLoading() {
        setLoadingData({ isLoading: false, message: '' })
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