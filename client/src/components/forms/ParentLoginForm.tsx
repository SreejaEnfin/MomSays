import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type ParentLoginFormInputs = {
    email: string;
    password: string;
};

type ParentLoginFormProps = {
    onSubmit: (data: ParentLoginFormInputs) => void;
};

function ParentLoginForm({ onSubmit }: ParentLoginFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ParentLoginFormInputs>();

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
            <h2 className="text-center text-2xl font-bold text-green-700 mb-4">Parent Login</h2>

            <div className="relative">
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
                            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 ring-red-400' : 'focus:ring-green-400'
                                }`}
                        />
                    )}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400 ring-red-400' : 'focus:ring-green-400'
                                }`}
                        />
                    )}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-green-700 hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <div className="text-center">
                <Link to="/register" className="text-sm text-gray-600 hover:underline">
                    Don't have an account? Register
                </Link>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="bg-green-400 hover:bg-green-500 text-white w-full py-2 rounded-md font-bold"
            >
                Log In
            </button>
        </form>
    )
}

export default ParentLoginForm