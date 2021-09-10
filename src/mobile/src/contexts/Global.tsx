import React from 'react'

import { UserContextProvider } from './User'

const GlobalContext = ( { children } : any ) => {
    return(
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}

export default GlobalContext;