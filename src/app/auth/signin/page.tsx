"use client"

import React from "react";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx";

import { Button } from "@/components/ui/button"

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {

  const contextAuth = useAuthenticationContext()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    contextAuth?.loginWithEmailPassword({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='bg-[#FAFCFC] flex flex-col justify-center'>
        <form onSubmit={handleSubmit(handleSignIn)} className='max-w-[400px] w-full mx-auto rounded-lg p-8 px-8 space-y-2'>
          <h1 className="text-black text-center text-3xl"><span className="text-orange-500">SysLae</span> Health</h1>
          <h2 className='text-xl text-black font-normal text-center'>Acesse sua conta</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <Input
              placeholder="E-mail"
              className="text-black"
              type="email"
              id="email"
              {...register("email")}
              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <Input
              placeholder="Senha"
              className="text-black"
              type="password"
              id="password"
              {...register("password")}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-400" variant="default">
            {contextAuth?.loading ? "Carregando ..." : "Entrar"}
          </Button>

          <div className="flex space-x-1 justify-center text-sm">
            <span className="text-black">Esqueceu sua senha? </span>
            <span className="text-orange-500">Clique aqui</span>
          </div>

        </form>
      </div>
      <div className='relative hidden sm:block'>
        <img className='w-full h-full object-cover' src="/assests/bg.jpg" alt="bg" />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold'>
          Unimos tecnologia à saúde, convertendo dados 
          em inovações essenciais para aprimorar os serviços médicos.
        </h1>
      </div>
    </div>
  )
}