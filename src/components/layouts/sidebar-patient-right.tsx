import React, { useEffect, useState } from "react";

import { Loader, File, Users, ArrowLeft, User, MapPin } from 'lucide-react'
import Link from "next/link";
import { Separator } from "../ui/separator";
import { api } from "@/lib/sys/server/api";
import { twMerge } from "tailwind-merge";
import { Legend } from "../ui/legend";
import { cn } from "@/lib/utils";

interface IProps {
  image: string;
  medicine: string;
  typeMedicine: string[];
}

export default function SideBarRight({ image, medicine, typeMedicine }: IProps) {

  console.log(typeMedicine)

  const [classify, setClassify] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false)

  const classifyImage = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', image)

      const response = await api.post("/sys/ai/classify", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data) {
        setClassify(response?.data.classify)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    classifyImage()
  }, [])

  return (
    <aside
      className="bg-[#222325] border-l-2 text-white fixed top-0 right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    >
      {loading ? (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <Loader className="animate-spin" size={40} color="white" />
          <span className="text-white text-sm text-center">Analisando exame</span>
        </div>
      ) : (
        <>
          <div>
            <div className="flex p-4">
              <h1 className="text-sm font-bold uppercase">
                Patologias - Analisadas
              </h1>
            </div >
            <div className="p-4 space-y-2">
              <div>
                <div className="flex items-center">
                  <input
                    id="disabled-radio-1"
                    checked={classify?.classe == 0 ? true : false}
                    type="radio"
                    value=""
                    name="disabled-radio"
                    disabled={classify?.classe == 0 ? false : true}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-30 accent-red-500"
                  />
                  <label htmlFor="disabled-radio-1" className="ms-2 text-sm font-medium text-white">AVC hemorrágico</label>
                </div>
                <div className="flex items-center space-x-2 font-semibold text-sm">
                  <div className="w-10/12 bg-gray-200 rounded-full">
                    <div className={cn(
                      "bg-red-500 h-2.5 rounded-full"
                    )} style={{ width: `${classify?.classe == 0 ? classify?.score : 0}%` }} />
                  </div>
                  <span>{classify?.classe == 0 ? classify?.score : 0}%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="disabled-radio-2"
                    checked={classify?.classe == 1 ? true : false}
                    type="radio"
                    value=""
                    name="disabled-radio"
                    disabled={classify?.classe == 1 ? false : true}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 accent-red-500"
                  />
                  <label htmlFor="disabled-radio-2" className="ms-2 text-sm font-medium text-white">AVC isquêmico</label>
                </div>
                <div className="flex items-center space-x-2 font-semibold text-sm">
                  <div className="w-10/12 bg-gray-200 rounded-full">
                    <div className={cn(
                      "bg-red-500 h-2.5 rounded-full"
                    )} style={{ width: `${classify?.classe == 1 ? classify?.score : 0}%` }} />
                  </div>
                  <span>{classify?.classe == 1 ? classify?.score : 0}%</span>
                </div>
              </div>
            </div>
          </div >
          <Separator />
          <div className="w-full p-4 space-y-2">
            <h1 className="uppercase text-sm font-bold">Alertas</h1>
            <div className="w-full">
              <span className="bg-red-500 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                {classify?.classe == 0 ? "AVC hemorrágico" : "AVC isquêmico"}
              </span>
            </div>
          </div>
          <Separator />
          <div className="w-full p-4 space-y-2">
            <h1 className="uppercase text-sm font-bold">Medicamentos</h1>
            <div className="w-full">

              {typeMedicine?.map((tag: any, i: any) => (
                <div className="w-full">
                  <Legend text={tag} />
                </div>
              ))}
              {!typeMedicine ? (
                <span className={twMerge(
                  "text-black text-sm font-medium px-2.5 py-0.5 rounded",
                  "bg-white"
                )}>
                  Sem uso de medicamentos
                </span>
              ) : null}
            </div>
          </div>
        </>
      )}
    </aside >
  )
}