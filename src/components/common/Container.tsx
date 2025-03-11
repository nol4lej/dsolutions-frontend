import React from "react"

interface ContainerProps {
    children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
                {children}
            </div>
        </div>
    )
}