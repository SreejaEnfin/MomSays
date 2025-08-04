// src/components/VoiceFeedbackUploader/VoiceFeedbackUploader.tsx

import { useEffect, useMemo, useState } from 'react';
import { voiceFeedbackScenarios } from '../../types/VoiceFeedback';
import VoiceFeedbackCard from './VoiceFeedbackCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadVoiceFeedbackAPI } from '../../apis/voiceFeedback/UploadVoiceFeedback';
import { useParent } from '../../contexts/ParentContext';
import { useVoiceFeedback } from '../../hooks/useVoiceFeedback';
import StatusModal from '../common/StatusModal';

export default function VoiceFeedbackUploader() {
    const [voiceClips, setVoiceClips] = useState<{ [key: string]: File | null }>({});
    const { parent } = useParent();
    const queryClient = useQueryClient();
    const [defaultVoices, setDefaultVoices] = useState()
    const [fileNames, setFileNames] = useState<Record<string, string>>({});
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);

    const uploadMutation = useMutation({
        mutationFn: ({ formData, scenarioCode }: { formData: FormData; scenarioCode: string }) => UploadVoiceFeedbackAPI(formData, scenarioCode),
        onSuccess: () => {
            if (parent?.id) {
                queryClient.invalidateQueries({ queryKey: ['voice-feedback-list', parent?.id] });
            }
            setShowUploadModal(true);
            setUploadMessage('Voice clips uploaded successfully!');
            setIsUploadSuccess(true);
        },
        onError: (error: any) => {
            setUploadMessage(error.message);
            setIsUploadSuccess(false);
            setShowUploadModal(true);
        },
    });

    const handleSave = () => {
        if (!parent?.id) {
            alert('Parent ID missing');
            return;
        }

        Object.entries(voiceClips).forEach(([scenarioCode, file]) => {
            if (file) {
                const formData = new FormData();
                formData.append(scenarioCode, file);
                formData.append('parentId', parent.id);
                uploadMutation.mutate({ formData, scenarioCode });
            }
        });
    }

    const {
        data: voiceClipList,
    } = useVoiceFeedback(parent?.id);

    const voiceClipsByScenario = useMemo(() => {
        if (!voiceClipList?.data) return {};
        return voiceClipList.data.reduce((acc: any, clip: any) => {
            acc[clip.scenarioCode] = clip;
            return acc;
        }, {} as Record<string, any>);
    }, [voiceClipList]);


    const uploadedCount = useMemo(() => {
        return Object.values(voiceClipsByScenario).filter((clip: any) => clip.isDefault === false).length;
    }, [voiceClipsByScenario]);


    const uploadedClips = useMemo(() => {
        const clips: Record<string, string> = {};

        voiceFeedbackScenarios.forEach(({ code }) => {
            if (voiceClipList?.data?.[code]) {
                clips[code] = voiceClipList.data[code];
            }
            else if (defaultVoices?.[code]) {
                clips[code] = defaultVoices[code];
            }
        });

        return clips;
    }, [voiceClipList, defaultVoices]);

    useEffect(() => {
        const updated: Record<string, string> = {};
        voiceFeedbackScenarios.forEach((scenario) => {
            updated[scenario.code] = uploadedClips[scenario.code] ?? '';
        });
        setFileNames(updated);
    }, [uploadedClips]);

    return (
        <div className="space-y-6 w-full max-w-8xl mx-auto px-4 py-2">

            {/* Progress bar + Text */}
            <div className="text-center">
                <p className="font-semibold text-lg mb-2 text-gray-800">
                    Uploaded {uploadedCount} out of {voiceFeedbackScenarios.length} clips
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(uploadedCount / voiceFeedbackScenarios.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Voice upload cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                {voiceFeedbackScenarios.map((scenario) => {
                    const clip = voiceClipsByScenario[scenario.code];
                    return (
                        <VoiceFeedbackCard
                            key={scenario.code}
                            scenario={scenario}
                            file={voiceClips[scenario.code] || null}
                            setFile={(file: File | null) =>
                                setVoiceClips((prev) => ({ ...prev, [scenario.code]: file }))
                            }
                            clipData={clip}
                        />
                    );
                })}
            </div>

            {uploadedCount < voiceFeedbackScenarios.length && (
                <p className="text-yellow-600 font-medium text-center mt-4">
                    You haven't uploaded all clips. Default voices will be used for the rest.
                </p>
            )}

            {/* Save Button */}
            <div className="fixed bottom-4 right-10 z-50">
                <button
                    onClick={() => handleSave()}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-lg transition"
                    disabled={uploadMutation.isPending}
                >
                    {uploadMutation.isPending ? 'Uploading...' : 'Save'}
                </button>
            </div>

            <StatusModal message={uploadMessage} show={showUploadModal} success={isUploadSuccess} onAction={() => {
                setShowUploadModal(false)
            }} />

        </div>
    );

}
