import type { Parent } from "./Parent";

export type ParentContextType = {
    parent: Parent | null;
    setParent: React.Dispatch<React.SetStateAction<Parent | null>>;
    logout: () => void;
};