"use client";
import {
  ConnectionContext,
  ConnectionContextProps,
} from "@/contexts/connexion.provider";
import { useContext } from "react";

export const useConnection = (): ConnectionContextProps => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
