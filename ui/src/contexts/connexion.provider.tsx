"use client";
import React, { createContext } from "react";

// Types
export type User = {
  name: string;
  token?: string;
};

export type ConnectionContextProps = {
  user: User | null;
  login: (credentials: { provider: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export type ConnectionProviderProps = {
  children: React.ReactNode;
};
export const ConnectionContext = createContext<ConnectionContextProps>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

// ConnectionProvider with React Query
export const ConnectionProvider = ({ children }: ConnectionProviderProps) => {
  return (
    <ConnectionContext.Provider
      value={{
        user: { name: "" },
        login: async () => {},
        logout: async () => {},
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
