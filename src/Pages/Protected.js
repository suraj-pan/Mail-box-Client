import React, { Children, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const auth = useSelector((state)=>state.auth.isAuthenticated)
    console.log(auth)

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return children
  
}

export default Protected
