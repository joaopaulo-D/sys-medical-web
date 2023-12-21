import React from "react";

import { Fingerprint, File, Users, ArrowLeft, User, MapPin } from 'lucide-react'
import Link from "next/link";
import { Separator } from "../ui/separator";

interface IProps {
  id: string;
  patient: string;
  modality: string;
  body: string;
  gender: string;
}

export default function SideBarLeft({ gender, id, modality, patient, body }:IProps) {
  return (
    <aside
      className="bg-black border-r-2 text-white fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    >
      <Link href={"/dashboard/sys/sample"} className="flex p-4 justify-between items-center">
        <h1 className="text-xl font-bold">
          Paciente
        </h1>
        <ArrowLeft size={20} color="white" />
      </Link>
      <ul>
        <li className="flex p-4 items-center space-x-2">
          <Fingerprint size={20} color="white" />
          <span className="text-white font-semibold text-sm">ID: <span className="text-gray-300">{id}</span></span>
        </li>
        <li className="flex p-4 items-center space-x-2">
          <User size={20} color="white" />
          <span className="text-white font-semibold text-sm">Paciente: <span className="text-gray-300">{patient}</span></span>
        </li>
        <li className="flex p-4 items-center space-x-2">
          <File size={20} color="white" />
          <span className="text-white font-semibold text-sm">Modalidade: <span className="text-gray-300">{modality}</span></span>
        </li>
        <li className="flex p-4 items-center space-x-2">
          <Users size={20} color="white" />
          <span className="text-white font-semibold text-sm">Sexo: <span className="text-gray-300">{gender}</span></span>
        </li>
      </ul>
    </aside>
  )
}