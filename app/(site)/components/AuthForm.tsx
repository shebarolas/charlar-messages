"use client"

import InputError from "@/common/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormSchema, AuthFormSchemaRegister, AuthFormType } from "@/types/models/auth-form";
import { VariantAuth } from "@/types/type/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import ButtonAuth from "./ButtonAuth";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm() {

    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<VariantAuth>('LOGIN');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      if(session?.status === "authenticated") 
        console.log(session?.status),
        router.push("user")
      else console.log("No autenticado")
    }, [session?.status])
    

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
            reset();
        } else {
            setVariant('LOGIN')
            reset();
        }
    }, [variant]);
    const schema = variant === "REGISTER" ? AuthFormSchemaRegister : AuthFormSchema;
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<AuthFormType>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<AuthFormType> = async (formData) => {
        if (variant === "REGISTER") {
            try {
                setIsLoading(true)
                const { status } = await axios.post('/api/register', formData)
                if (status === 200) {
                    signIn("credentials", formData)
                    reset();
                    setIsLoading(false);
                    toast.success("Su cuenta ha sido creada exitosamemte")
                }
            } catch (error) {
                toast.error("Oh no!, algo ha pasado");
            } finally {
                setIsLoading(false)
            }
        }
        if (variant === "LOGIN") {
            setIsLoading(true)
            signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            }).then((callback) => {
                if (callback?.error) toast.error("Credenciales invalidas")
                if (callback?.ok && !callback.ok) 
                    toast.success("Bienvenido"),
                    router.push("/user")
            }).finally(()=> setIsLoading(false));
        }
    }
    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, {redirect: false}).then((callback)=> {
            if(callback?.error) toast.error("Algo ha pasado")
            if(callback?.ok && !callback.ok) toast.success("Bienvenido")
            setIsLoading(false)
        }).finally(()=> setIsLoading(false));
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="
            bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10
        ">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {
                        variant === "REGISTER" && (
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Nombre de usuario</Label>
                                    <Input id="name"
                                        {...register("name")}
                                        placeholder="Ingresa nombre de usuario..."
                                        disabled={isLoading}
                                    />
                                    {errors.name && <InputError message={errors.name.message} />}
                                </div>
                                <div >
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email"
                                        {...register("email")}
                                        placeholder="Ingresar email..."
                                        type="email"
                                        disabled={isLoading}
                                    />
                                    {errors.email && <InputError message={errors.email.message} />}
                                </div>
                                <div>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password"
                                        {...register("password")}
                                        placeholder="Ingresar contraseña..."
                                        type="password"
                                        disabled={isLoading}
                                    />
                                    {errors.password && <InputError message={errors.password.message} />}
                                </div>
                            </div>
                        )
                    }
                    {
                        variant === "LOGIN" && (
                            <div className="space-y-6">
                                <div >
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email"
                                        {...register("email")}
                                        placeholder="Ingresar email..."
                                        type="email"
                                        disabled={isLoading}
                                    />
                                    {errors.email && <InputError message={errors.email.message} />}
                                </div>
                                <div>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password"
                                        {...register("password")}
                                        placeholder="Ingresar contraseña..."
                                        type="password"
                                        disabled={isLoading}
                                    />
                                    {errors.password && <InputError message={errors.password.message} />}
                                </div>
                            </div>
                        )
                    }
                    <Button className="bg-purple-500 hover:bg-purple-400 w-full" type="submit">
                        {variant === "LOGIN" ? "Iniciar sesión" : "Registrarse"}
                    </Button>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                O continúa con
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex gap-2 items-center justify-center w-full">
                    <ButtonAuth icon={BsGithub} onClick={() => socialAction('github')} />
                    <ButtonAuth icon={BsGoogle} onClick={() => socialAction('google')} />
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Registrate' : 'Inicia sesión'}
                    </div>
                </div>
            </div>
        </div>
    )
}
