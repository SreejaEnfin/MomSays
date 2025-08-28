import { createContext, use, useContext, useEffect, useState } from 'react';
import { getAgeGroup } from '../utils/getAgeGroup';
import type { Child } from '../types/Child';

type ChildContextType = {
    child: Child | null;
    setChild: (child: Child) => void;
};

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: { children: React.ReactNode }) => {
    const [child, setChild] = useState<Child | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('loggedInChild');
        if (data) {
            const parsed = JSON.parse(data);
            const ageGroup = getAgeGroup(parsed.age);
            setChild({ ...parsed, ageGroup });
        }
    }, []);

    return (
        <ChildContext.Provider value={{ child, setChild }}>
            {children}
        </ChildContext.Provider>
    );
};

export const useChild = () => {
    const context = useContext(ChildContext);
    if (!context) throw new Error('useChild must be used within ChildProvider');
    return context;
};