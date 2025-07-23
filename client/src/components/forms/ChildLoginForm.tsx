import { Controller, useForm } from "react-hook-form";

type ChildLoginFormProps = {
    onSubmit: (data: { alias: string }) => void;
};

function ChildLoginForm({ onSubmit }: ChildLoginFormProps) {

    const { handleSubmit, control, formState: { errors } } = useForm<{ alias: string }>();
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white/80 p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-24"
        >
            <div className="flex justify-center mb-2">
                <img
                    src={`${import.meta.env.VITE_S3_URL}/logo.png`}
                    alt="MomSays Logo"
                    className="w-28 h-auto"
                />
            </div>
            <h2 className="text-center text-2xl font-bold text-sky-700 mb-4">Child Login</h2>

            <Controller
                name="alias"
                control={control}
                defaultValue=""
                rules={{ required: 'Alias is required' }}
                render={({ field }) => (
                    <div className="relative">
                        <input
                            {...field}
                            type="text"
                            placeholder="Enter your alias"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">👦</span>
                    </div>
                )}
            />
            {errors.alias && <p className="text-red-500 text-sm">{errors.alias.message}</p>}
            <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 text-white w-full py-2 rounded-md font-bold"
            >
                Log In
            </button>
        </form>
    )
}

export default ChildLoginForm