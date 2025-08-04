import { createContext, useContext, useState, type ReactNode } from "react";
import type { ParentContextType } from "../types/ParentContext";

const ParentContext = createContext<ParentContextType | undefined>(undefined);
export const ParentProvider = ({ children }: { children: ReactNode }) => {
    const [parent, setParent] = useState(() => {
        const stored = localStorage.getItem('parentData');
        return stored ? JSON.parse(stored) : null;
    });

    const logout = () => {
        localStorage.removeItem('parentData');
        sessionStorage.removeItem('parentToken');
        setParent(null);
    };

    return (
        <ParentContext.Provider value={{ parent, setParent, logout }}>
            {children}
        </ParentContext.Provider>
    )
}

export const useParent = () => {
    const context = useContext(ParentContext);
    if (!context) throw new Error("useParent must be used inside ParentProvider");
    return context;
}