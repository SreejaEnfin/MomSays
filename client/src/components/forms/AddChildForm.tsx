import { useForm } from 'react-hook-form';
import AvatarSelectorForm from './AvatarSelectorForm';
import StatusModal from '../common/StatusModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { languageMap } from '../../constants/languages';

type AddChildFormInputs = {
    name: string;
    alias: string;
    language: string;
    avatar: string;
    age: number;
};

interface AddChildFormProps {
    onSubmit: (data: AddChildFormInputs) => void;
    isSubmitting?: boolean;
    showStatusModal?: boolean
    setShowStatusModal?: (val: boolean) => void;
    setActiveMenu?: (menu: string) => void;
    refetchChildren: () => void;
    modalStatus?: boolean;
    modalMessage?: string;
}

export default function AddChildForm({ onSubmit, isSubmitting, showStatusModal, setShowStatusModal, setActiveMenu, refetchChildren, modalStatus, modalMessage }: AddChildFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AddChildFormInputs>();

    const selectedAvatar = watch('avatar');

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
                <button
                    type="button"
                    onClick={() => setActiveMenu?.('child')}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold focus:outline-none"
                    title="Close"
                >
                    <FontAwesomeIcon icon="xmark" className="mr-2" />
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">Add Your Child</h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Child’s Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none"
                    />
                    {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Child’s Age</label>
                    <input
                        type="number"
                        {...register('age', {
                            required: 'Age is required',
                            min: { value: 1, message: 'Age must be at least 1' },
                            max: { value: 12, message: 'Age must be 12 or less' },
                        })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none"
                    />
                    {errors.age && <p className="text-red-600 text-sm">{errors.age.message}</p>}
                </div>

                {/* Alias */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Alias</label>
                    <input
                        type="text"
                        {...register('alias', { required: 'Alias is required' })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none"
                    />
                    {errors.alias && <p className="text-red-600 text-sm">{errors.alias.message}</p>}
                </div>

                {/* Language */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                    <select
                        {...register('language', { required: 'Language is required' })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none"
                    >
                        <option value="">-- Select Language --</option>
                        {Object.entries(languageMap).map(([code, label]) => (
                            <option key={code} value={code}>{label}</option>
                        ))}
                    </select>
                    {errors.language && <p className="text-red-600 text-sm">{errors.language.message}</p>}
                </div>


                {/* Avatar Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose an Avatar</label>
                    <AvatarSelectorForm
                        selectedAvatar={selectedAvatar}
                        onSelect={(filename) => setValue('avatar', filename)}
                    />
                    {errors.avatar && <p className="text-red-600 text-sm">{errors.avatar.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                    {isSubmitting ? 'Adding...' : 'Add Child'}
                </button>
            </form>
            {showStatusModal && <StatusModal show={showStatusModal} success={modalStatus ?? false} message={modalMessage ?? 'Some error Occured'} buttonLabel={'Close'} onAction={() => {
                setShowStatusModal?.(false);
                setActiveMenu?.('child');
                refetchChildren();
            }
            } />}
        </>
    );
}
