"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { MapPin, View } from 'lucide-react'

interface IProps {
  data: any
}

export function TableSamples(props: IProps) {

  return (
    <>
      <div className="w-full relative overflow-x-auto shadow-md">
        <table className="w-full bg-[#ecf3fe] text-sm text-left">
          <thead className="text-black uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Paciente
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
                <span>{i+1}</span>
              </td>
              <td className="px-6 py-2">
                <span>
                  {item.patient_first_name}
                </span>
              </td>
              <td className="px-6 py-2">
                <span>
                  {item.patient_modality}
                </span>
              </td>
              <td className="px-6 py-2">
                <span>
                  {item.patient_body}
                </span>
              </td>
              <td className="py-2">
                <Link href={`/dashboard/sys/patient/view/${item.id}`} className="flex items-center space-x-1 hover:text-gray-300">
                  <View
                    size={20}
                    color="orange"
                    className="cursor-pointer"
                  />
                  <span>ACESSAR VIEW</span>
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