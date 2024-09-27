'use client'

import React from 'react';
import { SessionProvider } from 'next-auth/react'

const AuthProvider: React.FC<{ children?: string | JSX.Element | JSX.Element[] | React.ReactNode }> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider