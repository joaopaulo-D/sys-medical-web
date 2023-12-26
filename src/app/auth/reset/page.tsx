"use client"

import React from "react";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx";

import { Button } from "@/components/ui/button"

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { ChevronsLeft, Info } from "lucide-react";

type ResetFormData = {
  email: string;
}

const resetFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export default function Reset() {

  const contextAuth = useAuthenticationContext()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(resetFormSchema)
  })

  const { errors } = formState;

  const handleReset: SubmitHandler<ResetFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    contextAuth?.resetPassword({
      email: values.email,
    });
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className="flex flex-col bg-[#FAFCFC] justify-center">
        <h2 className='text-2xl text-gray-700 text-center'>Esqueceu sua senha?</h2>
        <div className=''>
          <form onSubmit={handleSubmit(handleReset)} className='max-w-[400px] w-full rounded-lg p-8 px-8 space-y-2'>
            <div className='flex flex-col text-gray-400 py-2 space-y-2'>
              <Input
                placeholder="E-mail"
                className="text-black"
                type="email"
                id="email"
                {...register("email")}
              />
              {errors.email?.message ? (
                <div className="flex space-x-1">
                  <Info size={15} color="red" />
                  <span className="text-xs text-red-500">{errors.email?.message}</span>
                </div>
              ) : null}
              <Link href="/auth/signin" className="flex space-x-1">
                <ChevronsLeft size={15} color="green" />
                <span className="text-green-500 text-xs">Voltar</span>
              </Link>
            </div>

            <Button type="submit" className="bg-green-500 text-white hover:bg-green-400" variant="default">
              {contextAuth?.loading ? "Carregando ..." : "Enviar"}
            </Button>

          </form>

          <div className="w-full bg-[#F0F0F0] p-4 text-xs text-gray-600 text-center">
            <span>Digite seu endereço de e-mail e nós lhe enviaremos instruções sobre como criar uma nova senha.</span>
          </div>
        </div>
      </div>
      <div className='relative hidden sm:block'>
        <img className='w-full h-full object-cover' src="/assests/bg.jpg" alt="bg" />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold'>
          Unimos tecnologia à saúde, convertendo dados
          em inovações essenciais para aprimorar os serviços médicos.
        </h1>
      </div>
    </div>
  )
}