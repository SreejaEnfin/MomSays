import AddChildForm from "../components/forms/AddChildForm";
import EditChildModal from "../components/modals/EditChildModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChildList from "../components/child/ChildList";
import StatusModal from "../components/common/StatusModal";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UpdateChildDetailsAPI } from "../apis/user/UpdateChildDetailsAPI";
import { DeleteChildAPI } from "../apis/user/DeleteChildAPI";
import { GetChildDetailsByParentId } from "../apis/user/GetChildDetailsByParentId";
import { ChildRegistrationAPI } from "../apis/user/ChildRegistrationAPI";
import type { Child } from "../types/Child";
import { languageMap } from "../constants/languages";

export default function ChildDetailsPage() {
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
    const [activeMenu, setActiveMenu] = useState<'list' | 'add-child'>('list');

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
            setChildAddMessage('Your child details are added successfully!!!');
            refetch();
            setActiveMenu('list')
        },
        onError: (err) => {
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
            setChildDeleteStatus(false);
            setChildDeleteMessage(error.message);
            setAfterDeleteModal(true);
        },
    });

    const handleChildEdit = (id: string) => {
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
        <div>
            {isLoading ? (
                <p className="text-gray-500">⏳ Loading child details...</p>
            ) : isError ? (
                <div className="text-center text-red-500">Failed to load child details.</div>
            ) : children.length === 0 && activeMenu !== 'add-child' ? (
                <div className="text-center text-gray-600">
                    <p>No child added yet.</p>
                    <button
                        onClick={() => setActiveMenu('add-child')}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        <FontAwesomeIcon icon="plus" className="mr-2" /> Add Your Child
                    </button>
                </div>
            ) : activeMenu === 'add-child' ? (
                <AddChildForm
                    onSubmit={(data) => {
                        ChildAddmutation.mutate({ ...data, parentId, role: 'child' });
                    }}
                    isSubmitting={ChildAddmutation.isPending}
                    showStatusModal={showAfterChildModal}
                    setShowStatusModal={setShowAfterChildModal}
                    setActiveMenu={setActiveMenu}
                    refetchChildren={refetch}
                    modalStatus={ChildAddStatus}
                    modalMessage={ChildAddMessage}
                />
            ) : activeMenu === 'list' ? (
                <ChildList
                    childrenData={children}
                    onEdit={handleChildEdit}
                    onDelete={handleChildDelete}
                    languageMap={languageMap}
                />
            ) : ''}


            <EditChildModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={(updatedChild) => ChildUpdateMutation.mutate(updatedChild)}
                child={selectedChild}
            />

            <StatusModal
                show={showAfterEditModal}
                message={childEditMessage}
                success={childEditStatus}
                onClose={() => setShowAfterEditModal(false)}
            />

            <StatusModal
                show={afterDeleteModal}
                message={childDeleteMessage}
                success={childDeleteStatus}
                onClose={() => setAfterDeleteModal(false)}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message={deleteConfirmMessage}
            />

        </div>
    );
}
