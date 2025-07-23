import { useState, useEffect } from 'react';
import type { Child } from '../../types/Child';
import { languageMap } from '../../constants/languages';
import AvatarSelectorForm from '../forms/AvatarSelectorForm';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedChild: Child) => void;
    child: Child | null;
};

export default function EditChildModal({ isOpen, onClose, onSave, child }: Props) {

    const [formData, setFormData] = useState<Child>(() => {
        const parentData = JSON.parse(localStorage.getItem('parentData') || '{}');
        const parentId = parentData.id || '';

        return {
            id: '',
            name: '',
            alias: '',
            age: 0,
            language: '',
            avatar: '',
            parentId: parentId,
        };
    });

    useEffect(() => {
        if (child) setFormData(child);
    }, [child]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    const handleAvatarSelect = (filename: string) => {
        setFormData((prev) => ({
            ...prev,
            avatar: filename,
        }));
    };

    if (!isOpen || !child) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-green-700">Edit Child Details</h2>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="alias"
                        value={formData.alias}
                        onChange={handleChange}
                        placeholder="Alias"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">-- Select Language --</option>
                        {Object.entries(languageMap).map(([code, label]) => (
                            <option key={code} value={code}>{label}</option>
                        ))}
                    </select>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Choose an Avatar
                        </label>
                        <AvatarSelectorForm
                            selectedAvatar={formData.avatar}
                            onSelect={handleAvatarSelect}
                        />
                    </div>

                </div>
                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
