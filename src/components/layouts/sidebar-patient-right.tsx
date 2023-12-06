import React, { useEffect, useState } from "react";

import { Fingerprint, File, Users, ArrowLeft, User, MapPin } from 'lucide-react'
import Link from "next/link";
import { Separator } from "../ui/separator";
import { api } from "@/lib/sys/api/api";
import { twMerge } from "tailwind-merge";

interface IProps {
  image: string;
  medicine: string;
  typeMedicine: string;
}

export default function SideBarRight({ image, medicine, typeMedicine }: IProps) {

  const [classify, setClassify] = useState<any>();

  const classifyImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await api.post("/sys/ai/classification", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data) {
        setClassify(response?.data.classifcation)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    classifyImage()
  }, [])

  return (
    <aside
      className="bg-[#333232] text-white fixed top-0 right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    >
      <div>
        <div className="flex p-4">
          <h1 className="text-sm font-bold uppercase">
            Patologias - Analisadas
          </h1>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <input
              id="disabled-radio-1"
              checked={classify?.classe == 0 ? true : false}
              type="radio"
              value=""
              name="disabled-radio"
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-30"
            />
            <label htmlFor="disabled-radio-1" className="ms-2 text-sm font-medium text-white">AVC hemorrágico</label>
          </div>
          <div className="flex items-center">
            <input
              id="disabled-radio-2"
              checked={classify?.classe == 1 ? true : false}
              type="radio"
              value=""
              name="disabled-radio"
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300"
            />
            <label htmlFor="disabled-radio-2" className="ms-2 text-sm font-medium text-white">AVC isquêmico</label>
          </div>
        </div>
      </div>
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
          <span className={twMerge(
            "text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded",
            typeMedicine ? "bg-orange-500" : "bg-green-500"
          )}>
            {typeMedicine ? typeMedicine : "Sem uso de medicamento"}
          </span>
        </div>
      </div>
    </aside>
  )
}