import React from "react";

import { Fingerprint, File, Users, ArrowLeft, User, MapPin } from 'lucide-react'
import Link from "next/link";
import { Separator } from "../ui/separator";

interface IProps {
  name: string;
  ssvid: string;
  flag: string;
  type: string;
  lat: number;
  lon: number;
}

export default function SideBarRight() {
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
            <input id="disabled-radio-1" type="radio" value="" name="disabled-radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="disabled-radio-1" className="ms-2 text-sm font-medium text-white">AVC hemorrágico</label>
          </div>
          <div className="flex items-center">
            <input id="disabled-radio-2" type="radio" value="" name="disabled-radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="disabled-radio-2" className="ms-2 text-sm font-medium text-white">AVC isquêmico</label>
          </div>
        </div>
      </div>
      <Separator />
      <div className="w-full p-4 space-y-2">
        <h1 className="uppercase text-sm font-bold">Alertas</h1>
        <div className="w-full">
          <span className="bg-red-500 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded">AVC hemorrágico</span>
        </div>
      </div>
    </aside>
  )
}