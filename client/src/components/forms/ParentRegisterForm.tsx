import { Controller, useForm } from 'react-hook-form';

type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

type ParentRegisterFormProps = {
    onSubmit: (data: RegisterFormInputs) => void;
};

function ParentRegisterForm({ onSubmit }: ParentRegisterFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<RegisterFormInputs>();

    const password = watch('password');

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-center mb-2">
                    <img
                        src={`${import.meta.env.VITE_S3_URL}/logo.png`}
                        alt="MomSays Logo"
                        className="w-28 h-auto"
                    />
                </div>
                {/* Name */}
                <div>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Name"
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-400 ring-red-300' : 'focus:ring-green-400'}`}
                            />
                        )}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Invalid email format'
                            }
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                placeholder="Email"
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 ring-red-300' : 'focus:ring-green-400'}`}
                            />
                        )}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="password"
                                placeholder="Password"
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400 ring-red-300' : 'focus:ring-green-400'}`}
                            />
                        )}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Please confirm your password',
                            validate: (value) => value === password || 'Passwords do not match',
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="password"
                                placeholder="Confirm Password"
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-400 ring-red-300' : 'focus:ring-green-400'}`}
                            />
                        )}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                <div>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter a valid 10-digit number',
                            },
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="tel"
                                placeholder="Phone Number"
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-400 ring-red-300' : 'focus:ring-green-400'}`}
                            />
                        )}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default ParentRegisterForm