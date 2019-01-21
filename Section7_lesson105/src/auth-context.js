import React from 'react'

// This file is required to prevent circular import between login.js and app.js

 export const AuthContext = React.createContext({
    isAuth: false,
    toggleAuth: () => {}
  });

