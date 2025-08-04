// components/child/ChildCard.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ChildCardProps = {
    child: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    languageMap: Record<string, string>;
};

export default function ChildCard({ child, onEdit, onDelete, languageMap }: ChildCardProps) {
    return (
        <div className="bg-white p-4 rounded-md shadow relative">
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                    <img
                        src={`${import.meta.env.VITE_S3_URL}/avatars/${child.avatar}`}
                        alt="Child Avatar"
                        className="w-16 h-16 object-contain rounded-full border"
                    />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{child.name}</h3>
                        <p>Alias: {child.alias}</p>
                        <p>Age: {child.age}</p>
                        <p>Language: {languageMap[child.language] || child.language}</p>
                    </div>
                </div>

                <div className="space-x-2">
                    <button onClick={() => onEdit(child.id)}>
                        <FontAwesomeIcon icon="edit" className="text-blue-600 hover:text-blue-800" title="Edit" />
                    </button>
                    <button onClick={() => onDelete(child.id)}>
                        <FontAwesomeIcon icon="trash" className="text-red-600 hover:text-red-800" title="Delete" />
                    </button>
                </div>
            </div>
        </div>
    );
}
