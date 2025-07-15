import React from 'react';

interface StatusModalProps {
    message: string;
    success: boolean;
    buttonLabel?: string;
    onClose?: () => void;
    onAction?: () => void;
    show: boolean;
}

const StatusModal: React.FC<StatusModalProps> = ({
    message,
    success,
    buttonLabel = 'Close',
    onClose,
    onAction,
    show,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm w-full">
                <div className="flex justify-center mb-4">
                    {success ? (
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
                <h3 className={`text-lg font-semibold ${success ? 'text-green-700' : 'text-red-700'} mb-2`}>
                    {success ? 'Success' : 'Something went wrong'}
                </h3>
                <p className="text-gray-600 mb-4">{message}</p>
                <button
                    onClick={onAction || onClose}
                    className={`px-4 py-2 rounded-md font-medium text-white ${success ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                        } transition`}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
};

export default StatusModal;
