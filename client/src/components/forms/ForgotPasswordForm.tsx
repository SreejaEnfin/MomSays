import { Controller, useForm } from "react-hook-form";

type ChildLoginFormProps = {
    onSubmit: (data: { email: string }) => void;
    message?: string;
};

type ForgotPasswordFormProps = {
    email: string;
};

function ForgotPasswordForm({ onSubmit, message }: ChildLoginFormProps) {
    const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormProps>();

    return (
        <div className='flex items-center justify-center min-h-screen bg-green-50'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <div className="flex justify-center mb-4">
                    <img
                        src={`${import.meta.env.S3_URL}/logo.png`}
                        alt="MomSays Logo"
                        className="w-28 h-auto"
                    />
                </div>
                <h2 className="text-center text-2xl font-bold text-green-700 mb-4">Forgot Password</h2>

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 ring-red-400' : 'focus:ring-green-400'
                                }`}
                        />
                    )}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                <button
                    type="submit"
                    className="mt-4 bg-green-400 hover:bg-green-500 text-white w-full py-2 rounded-md font-bold"
                >
                    Send Reset Link
                </button>

                {message && <p className="text-sm text-center mt-4">{message}</p>}
            </form>
        </div>
    )
}

export default ForgotPasswordForm