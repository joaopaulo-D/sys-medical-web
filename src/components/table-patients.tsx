"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Trash2, Edit } from 'lucide-react'

export function TablePatients(props: any) {

  // const [vessels, setVessels] = useState<IVassel[] | any>();


  return (
    <>
      <div className="w-full relative overflow-x-auto shadow-md">
        <table className="w-full bg-[#ecf3fe] text-xs text-left">
          <thead className="text-black uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Paciente
              </th>
              <th scope="col" className="px-6 py-3">
                Sexo
              </th>
              <th scope="col" className="px-6 py-3">
                Idade
              </th>
              <th scope="col" className="px-6 py-3">
                Modalidade
              </th>
              <th scope="col" className="px-6 py-3">
                Parte do Corpo
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item, i) => (
              <tr className="bg-[#414141] text-white text-sm font-semibold border-b-2" key={item.id}>
                <td className="px-6 py-2">
                  <span className="font-bold">{i+1}</span>
                </td>
                <td className="px-6 py-2">
                  <span>
                    {item.patient_first_name}
                  </span>
                </td>
                <td className="px-6 py-2">
                  <span>{item.patient_gender}</span>
                </td>
                <td className="px-6 py-2">
                  <span>
                   {item.patient_age} anos
                  </span>
                </td>
                <td className="px-6 py-2">
                  <span className="text-orange-500 font-bold">{item.patient_modality}</span>
                </td>
                <td className="px-6 py-2">
                  <span>{item.patient_body}</span>
                </td>
                <td className="py-2 flex space-x-3">
                  <Link href={`/dashboard/fishing/vessels/map/1`} className="flex items-center space-x-1 hover:text-gray-300">
                    <Trash2
                      size={18}
                      color="red"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href={`/dashboard/fishing/vessels/map/1`} className="flex items-center space-x-1 hover:text-gray-300">
                    <Edit
                      size={18}
                      color="orange"
                      className="cursor-pointer"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}