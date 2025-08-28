import { useEffect, useState } from 'react';
import type { VoiceFeedbackScenario } from '../../types/VoiceFeedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteVoiceFeedbackAPI } from '../../apis/voiceFeedback/DeleteVoiceFeedbackAPI';
import { useParent } from '../../contexts/ParentContext';
import Tooltip from '../common/Tooltip';
import ConfirmDeleteModal from '../modals/ConfirmModal';
import StatusModal from '../common/StatusModal';

interface VoiceClip {
    id: string;
    fileName: string;
    scenarioCode: string;
    parentId: string;
    isDefault: boolean;
    uploadedAt: string;
}

interface VoiceFeedbackCardProps {
    scenario: VoiceFeedbackScenario;
    file: File | null;
    setFile: (file: File | null) => void;
    clipData: VoiceClip | null; // <-- NEW: full object from backend
}

export default function VoiceFeedbackCard({
    scenario,
    file,
    setFile,
    clipData,
}: VoiceFeedbackCardProps) {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const { parent } = useParent();
    const queryClient = useQueryClient();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [isDeleteSuccess, setisDeleteSuccess] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            return () => URL.revokeObjectURL(url);
        }

        if (clipData?.fileName) {
            setAudioUrl(`${import.meta.env.VITE_S3_URL}/${clipData.fileName}`);
        }
    }, [file, clipData]);

    const deleteMutation = useMutation({
        mutationFn: async (code: string) => {
            const response = await DeleteVoiceFeedbackAPI({
                parentId: parent?.id,
                scenarioCode: code,
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['voice-feedback-list', parent?.id],
            });
            setFile(null);
            setAudioUrl(null);
            setShowDeleteModal(true);
            setDeleteMessage("Voice Clip deleted successfully!!!");
            setisDeleteSuccess(true);
        },
        onError: (error: any) => {
            setDeleteMessage(error.message);
            setShowDeleteModal(true);
            setisDeleteSuccess(false);
        },
    });

    const handleDelete = () => {
        setShowConfirmDelete(false);
        if (!parent?.id || !clipData) return;
        deleteMutation.mutate(clipData.scenarioCode);
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center w-full min-h-[260px] max-w-sm">
            <div className="text-4xl">{scenario.emoji}</div>
            <Tooltip content={scenario.title}>
                <h2 className="text-xl font-semibold mt-2 text-center line-clamp-1">{scenario.title}</h2>
            </Tooltip>
            <Tooltip content={scenario.description}>
                <p className="text-sm text-gray-600 text-center line-clamp-1">{scenario.description}</p>
            </Tooltip>

            <div className="mt-4 w-full">
                {audioUrl && (
                    <div className="w-full flex flex-col items-center gap-2">
                        <audio controls src={audioUrl} className="w-full" />

                        {!clipData?.isDefault ? (
                            <>
                                <div className="text-sm text-gray-500 italic text-center">
                                    Using your uploaded voice
                                </div>
                                <button
                                    onClick={() => setShowConfirmDelete(true)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-full text-sm text-center"
                                >
                                    {deleteMutation.isPending ? 'Removing...' : 'Remove'}
                                </button>
                            </>
                        ) : (
                            <div className="text-sm text-gray-500 italic text-center">
                                Using default voice
                            </div>
                        )}

                    </div>
                )}


                {/* Show upload options only if current clip is default */}
                {clipData?.isDefault && (
                    <div className="mt-4 w-full flex gap-2">
                        <label className="w-1/2">
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0];
                                    if (selectedFile) setFile(selectedFile);
                                }}
                                className="hidden"
                            />
                            <div
                                className={`${file ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white py-1 px-2 rounded-full text-sm text-center cursor-pointer`}
                            >
                                {file ? 'Change Audio' : 'Upload Audio'}
                            </div>
                        </label>

                        <button
                            className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full text-sm"
                            onClick={() => alert('Recording feature coming soon')}
                        >
                            Record
                        </button>
                    </div>
                )}

                <ConfirmDeleteModal title={"Confirm Delete"} show={showConfirmDelete} message={"Are you sure you want to delete this voice clip?"} onCancel={() => setShowConfirmDelete(false)} onConfirm={handleDelete} />

                <StatusModal show={showDeleteModal} message={deleteMessage} success={isDeleteSuccess} onAction={() => {
                    setShowDeleteModal(false);
                }} />

            </div>
        </div>
    );
}
