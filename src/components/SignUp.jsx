import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import appwriteService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from './index'
import { data } from 'autoprefixer'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userData = await appwriteService.createAccount(data)
            if (userData) {
                const userData = await appwriteService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <input
                            label='Full Name: '
                            placeholder='Enter Your Full Name'
                            {...register("name", {
                                required: true,

                            })} />

                        <input
                            type="email"
                            placeholder='Enter Your Email'
                            label="Email: "
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email Address must be a valid Address"

                                }
                            })}

                        />

                        <input
                        type='password'
                        placeholder='Enter Your Password'
                        label='Password: '
                        {...register('password ',{
                            required: true,
                        })}
                        />

                        <Button type='submit' className='w-full'>Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp