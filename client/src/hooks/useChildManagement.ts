import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GetChildDetailsByParentId } from "../apis/user/GetChildDetailsByParentId";
import { ChildRegistrationAPI } from "../apis/user/ChildRegistrationAPI";
import { DeleteChildAPI } from "../apis/user/DeleteChildAPI";
import { UpdateChildDetailsAPI } from "../apis/user/UpdateChildDetailsAPI";

export default function useChildManagement() {
    const parentId = JSON.parse(localStorage.getItem('parentData') || '{}')?.id;
    const [activeMenu, setActiveMenu] = useState("view-child");
    const [selectedChild, setSelectedChild] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [showAfterChildModal, setShowAfterChildModal] = useState(false);
    const [showAfterEditModal, setShowAfterEditModal] = useState(false);
    const [afterDeleteModal, setAfterDeleteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [ChildAddStatus, setChildAddStatus] = useState(false);
    const [ChildAddMessage, setChildAddMessage] = useState("");
    const [childEditStatus, setChildEditStatus] = useState(false);
    const [childEditMessage, setChildEditMessage] = useState("");
    const [childDeleteStatus, setChildDeleteStatus] = useState(false);
    const [childDeleteMessage, setChildDeleteMessage] = useState("");
    const [deleteConfirmMessage, setDeleteConfirmMessage] = useState("");

    const { data: children = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["children", parentId],
        queryFn: () => GetChildDetailsByParentId(parentId),
    });

    const ChildAddmutation = useMutation({
        mutationFn: ChildRegistrationAPI,
        onSuccess: (res) => {
            setChildAddStatus(true);
            setChildAddMessage("Child added successfully");
            setShowAfterChildModal(true);
            refetch();
        },
        onError: () => {
            setChildAddStatus(false);
            setChildAddMessage("Something went wrong");
            setShowAfterChildModal(true);
        },
    });

    const ChildUpdateMutation = useMutation({
        mutationFn: UpdateChildDetailsAPI,
        onSuccess: () => {
            setChildEditStatus(true);
            setChildEditMessage("Child updated");
            setShowAfterEditModal(true);
            refetch();
        },
        onError: () => {
            setChildEditStatus(false);
            setChildEditMessage("Error updating child");
            setShowAfterEditModal(true);
        },
    });

    const ChildDeleteMutation = useMutation({
        mutationFn: DeleteChildAPI,
        onSuccess: () => {
            setChildDeleteStatus(true);
            setChildDeleteMessage("Child deleted successfully");
            setAfterDeleteModal(true);
            refetch();
        },
        onError: () => {
            setChildDeleteStatus(false);
            setChildDeleteMessage("Something went wrong");
            setAfterDeleteModal(true);
        },
    });

    const handleChildEdit = (child: any) => {
        setSelectedChild(child);
        setEditModalOpen(true);
    };

    const handleChildDelete = (child: any) => {
        setSelectedChild(child);
        setDeleteConfirmMessage(`Are you sure to delete ${child.name}?`);
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedChild(null);
    };

    const handleConfirmDelete = () => {
        if (selectedChild) {
            ChildDeleteMutation.mutate(selectedChild);
        }
        setShowDeleteModal(false);
    };

    const languageMap = {
        en: "English",
        hi: "Hindi",
        ml: "Malayalam",
        ta: "Tamil",
    };

    return {
        children,
        isLoading,
        isError,
        parentId,
        activeMenu,
        setActiveMenu,
        ChildAddmutation,
        ChildAddStatus,
        ChildAddMessage,
        showAfterChildModal,
        setShowAfterChildModal,
        refetch,
        selectedChild,
        setSelectedChild,
        isEditModalOpen,
        setEditModalOpen,
        ChildUpdateMutation,
        childEditMessage,
        childEditStatus,
        showAfterEditModal,
        setShowAfterEditModal,
        afterDeleteModal,
        setAfterDeleteModal,
        childDeleteMessage,
        childDeleteStatus,
        showDeleteModal,
        handleCancelDelete,
        handleConfirmDelete,
        handleChildEdit,
        handleChildDelete,
        deleteConfirmMessage,
        languageMap,
    };
}
