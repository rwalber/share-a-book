import React, { createContext, useState } from 'react';

type User = {
    id: string,
    name: string,
    college: string,
    educationCenter: string,
    course: string,
    profileThumbnail: string
}

type UserContext = {
    state: User,
    setState: React.Dispatch<React.SetStateAction<User>>
}

const DATA_INITIAL = {
    state: {
        id: '',
        name: '',
        college: '',
        educationCenter: '',
        course: '',
        profileThumbnail: ''
    },
    setState: () => {}
};

const userContext = createContext<UserContext>(DATA_INITIAL);

const UserContextProvider = ( { children } : any ) => {
    const [state, setState] = useState(DATA_INITIAL.state);
    return(
        <userContext.Provider value={{state, setState}}>
            { children }
        </userContext.Provider>
    )
}

export { UserContextProvider };
export default userContext;