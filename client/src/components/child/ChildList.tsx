// components/child/ChildList.tsx
import ChildCard from './ChildCard';

type ChildListProps = {
    childrenData: any[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    languageMap: Record<string, string>;
};

export default function ChildList({ childrenData, onEdit, onDelete, languageMap }: ChildListProps) {
    if (!childrenData || childrenData.length === 0) {
        return (
            <div className="text-center text-gray-600">
                <p>No child added yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {childrenData.length > 0 && childrenData.map((child) => (
                <ChildCard
                    key={child.id}
                    child={child}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    languageMap={languageMap}
                />
            ))}
        </div>
    );
}
