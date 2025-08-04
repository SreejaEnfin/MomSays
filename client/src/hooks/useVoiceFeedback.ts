import { useQuery } from '@tanstack/react-query';
import { GetVoiceFeedbackAPI } from '../apis/voiceFeedback/GetVoiceFeedbackAPI';

export const useVoiceFeedback = (parentId: string | undefined) => {
    return useQuery({
        queryKey: ['voice-feedback-list', parentId],
        queryFn: () => {
            if (!parentId) throw new Error('Missing parent ID');
            return GetVoiceFeedbackAPI(parentId);
        },
        enabled: !!parentId,
    });
};
