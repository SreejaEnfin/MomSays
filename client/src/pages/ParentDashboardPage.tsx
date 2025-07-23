import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AddChildForm from '../components/forms/AddChildForm';
import { ChildRegistrationAPI } from '../apis/user/ChildRegistrationAPI';
import { GetChildDetailsByParentId } from '../apis/user/GetChildDetailsByParentId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditChildModal from '../components/modals/EditChildModal';
import type { Child } from '../types/Child';
import { UpdateChildDetailsAPI } from '../apis/user/UpdateChildDetailsAPI';
import StatusModal from '../components/common/StatusModal';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import { DeleteChildAPI } from '../apis/user/DeleteChildAPI';
import { languageMap } from '../constants/languages';

export default function ParentDashboardPage() {
    const [activeMenu, setActiveMenu] = useState('child');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);
    const [showAfterChildModal, setShowAfterChildModal] = useState(false);
    const [showAfterEditModal, setShowAfterEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmMessage, setDeleteConfirmMessage] = useState('');
    const [afterDeleteModal, setAfterDeleteModal] = useState(false);
    const [ChildAddMessage, setChildAddMessage] = useState('');
    const [ChildAddStatus, setChildAddStatus] = useState(false);
    const [childEditMessage, setChildEditMessage] = useState('');
    const [childEditStatus, setChildEditStatus] = useState(false);
    const [childDeleteStatus, setChildDeleteStatus] = useState(false);
    const [childDeleteMessage, setChildDeleteMessage] = useState('');

    const parentId = JSON.parse(localStorage.getItem('parentData') || '{}')?.id;
    const parentName = JSON.parse(localStorage.getItem('parentData') || '{}')?.name;

    const { data: children = [], isLoading, isError, refetch } = useQuery<Child[]>({
        queryKey: ['child', parentId],
        queryFn: () => GetChildDetailsByParentId(parentId),
        enabled: !!parentId,
        retry: false,
    });

    const ChildAddmutation = useMutation({
        mutationFn: ChildRegistrationAPI,
        onSuccess: () => {
            setShowAfterChildModal(true);
            setChildAddStatus(true);
            setChildAddMessage('Your child details are added successfully!!!')
        },
        onError: (err) => {
            console.error('Error:', err);
            setChildAddMessage(err.message);
            setShowAfterChildModal(true);
            setChildAddStatus(false);
        },
    });

    const ChildUpdateMutation = useMutation({
        mutationFn: UpdateChildDetailsAPI,
        onSuccess: (data) => {
            if (data.status === 'success') {
                refetch();
                setEditModalOpen(false);
                setShowAfterEditModal(true);
                setChildEditMessage("Child Details has been updated successfully!!!");
                setChildEditStatus(true);
                refetch();
            }
        },
        onError: (error) => {
            console.error('Update failed:', error);
            setShowAfterEditModal(true);
            setChildEditMessage(error.message);
            setChildEditStatus(false);
        },
    });

    const ChildDeleteMutation = useMutation({
        mutationFn: DeleteChildAPI,
        onSuccess: (response) => {
            if (response && response.status === 'success') {
                setShowDeleteModal(false);
                setAfterDeleteModal(true);
                setChildDeleteMessage('Child details deleted successfuly!!!');
                setChildDeleteStatus(true);
                refetch();
            }
        },
        onError: (error) => {
            console.error('Delete failed:', error);
            setChildDeleteStatus(false);
            setChildDeleteMessage(error.message);
            setAfterDeleteModal(true);
        },
    });

    const handleChildEdit = (id: string) => {
        console.log(children, "children")
        const childToEdit = children.find((c) => c.id === id);
        if (childToEdit) {
            setSelectedChild(childToEdit);
            setEditModalOpen(true);
        }
    }

    const handleChildDelete = (id: string) => {
        const childToDelete = children.find((c) => c.id === id);
        if (childToDelete) {
            setSelectedChild(childToDelete);
            setShowDeleteModal(true);
            setDeleteConfirmMessage("Are you sure you want to delete your child's details?")
        }
    }

    const handleConfirmDelete = async () => {
        try {
            if (selectedChild) {
                ChildDeleteMutation.mutate(selectedChild);
            }
        } catch (e) {
            throw e;
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false)
    }

    return (
        <div className="flex h-screen bg-green-50 overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                {/* Logo */}
                <div className="mb-10">
                    <img
                        src={`${import.meta.env.VITE_S3_URL}/logo.png`}
                        alt="MomSays Logo"
                        className="w-32 mx-auto"
                    />
                </div>

                {/* Menu Items */}
                <nav className="space-y-4">
                    <button
                        className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${activeMenu === 'child' ? 'bg-green-100 font-semibold' : ''
                            }`}
                        onClick={() => setActiveMenu('child')}
                    >
                        <FontAwesomeIcon icon="child" className="mr-2" /> Child Details
                    </button>
                    <button
                        className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${activeMenu === 'questions' ? 'bg-green-100 font-semibold' : ''
                            }`}
                        onClick={() => setActiveMenu('questions')}
                    >
                        <FontAwesomeIcon icon="book-open" className="mr-2" /> Question Bank
                    </button>
                    <button
                        className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${activeMenu === 'audio' ? 'bg-green-100 font-semibold' : ''
                            }`}
                        onClick={() => setActiveMenu('audio')}
                    >
                        <FontAwesomeIcon icon="microphone" className="mr-2" /> Voice Feedback
                    </button>
                    <button
                        className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${activeMenu === 'test' ? 'bg-green-100 font-semibold' : ''
                            }`}
                        onClick={() => setActiveMenu('test')}
                    >
                        <FontAwesomeIcon icon="vial" className="mr-2" /> Create & Launch Test
                    </button>
                </nav>
            </aside>

            <EditChildModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={(updatedChild) => ChildUpdateMutation.mutate(updatedChild)}
                child={selectedChild}
            />
            <StatusModal show={showAfterEditModal} message={childEditMessage} success={childEditStatus} onClose={() => setShowAfterEditModal(false)} />

            <StatusModal show={afterDeleteModal} message={childDeleteMessage} success={childDeleteStatus} onClose={() => setAfterDeleteModal(false)} />

            <ConfirmDeleteModal show={showDeleteModal} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} message={deleteConfirmMessage} />
            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-green-700">
                        {activeMenu === 'child'
                            ? 'Child Details'
                            : activeMenu === 'questions'
                                ? 'Question Bank'
                                : activeMenu === 'audio'
                                    ? 'Voice Feedback'
                                    : 'Create & Launch Test'}
                    </h2>
                    <div className="text-green-700 font-medium">
                        Hi, {parentName}
                    </div>
                </header>

                {/* Dynamic content placeholder */}
                <main className="p-6 flex-1 overflow-y-auto">
                    {isLoading ? (
                        <p className="text-gray-500">⏳ Loading child details...</p>
                    ) : isError ? (
                        <div className="text-center text-red-500">
                            Failed to load child details.
                        </div>
                    ) : activeMenu === 'add-child' ? (
                        <AddChildForm
                            onSubmit={(data) => {
                                ChildAddmutation.mutate({ ...data, parentId: parentId, role: 'child' });
                            }}
                            isSubmitting={ChildAddmutation.isPending}
                            showStatusModal={showAfterChildModal}
                            setShowStatusModal={setShowAfterChildModal}
                            setActiveMenu={setActiveMenu}
                            refetchChildren={refetch}
                            modalStatus={ChildAddStatus}
                            modalMessage={ChildAddMessage}
                        />
                    ) : activeMenu === 'child' ? (
                        children && children.length > 0 ? (
                            <div className="space-y-4">
                                {children.map((child: any) => (
                                    <div key={child.id} className="bg-white p-4 rounded-md shadow relative">
                                        <div className='flex justify-between items-start'>
                                            <div className="flex items-start space-x-4">
                                                {/* Avatar Image */}
                                                <img
                                                    src={`${import.meta.env.VITE_S3_URL}/avatars/${child.avatar}`}
                                                    alt="Child Avatar"
                                                    className="w-16 h-16 object-contain rounded-full border"
                                                />

                                                {/* Child Details */}
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2">{child.name}</h3>
                                                    <p>Alias: {child.alias}</p>
                                                    <p>Age: {child.age}</p>
                                                    <p>Language: {languageMap[child.language] || child.language}</p>
                                                </div>
                                            </div>

                                            {/* Edit / Delete Buttons */}
                                            <div className='space-x-2'>
                                                <button onClick={() => handleChildEdit(child.id)}>
                                                    <FontAwesomeIcon icon="edit" className='text-blue-600 hover:text-blue-800' title='Edit' />
                                                </button>
                                                <button onClick={() => handleChildDelete(child.id)}>
                                                    <FontAwesomeIcon icon="trash" className='text-red-600 hover:text-red-800' title='Delete' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600">
                                <p>No child added yet.</p>
                                <button
                                    onClick={() => setActiveMenu('add-child')}
                                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                >
                                    <FontAwesomeIcon icon="plus" className="mr-2" /> Add Your Child
                                </button>
                            </div>
                        )
                    ) : (
                        <div>🚧 Section: {activeMenu}</div>
                    )}
                </main>

            </div>
        </div>
    );
}
