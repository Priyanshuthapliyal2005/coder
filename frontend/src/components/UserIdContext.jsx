import React, { createContext, useContext, useState } from 'react';

const UserIdContext = createContext();

export const useUserId = () => {
  return useContext(UserIdContext);
};

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export default UserIdContext;
