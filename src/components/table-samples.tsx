"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { View } from 'lucide-react'
import { Badge } from "./ui/badge";
import { convertDate } from "@/lib/date";

interface IProps {
  data: any
}

export function TableSamples(props: IProps) {

  return (
    <>
      <div className="w-full relative overflow-x-auto shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>PACIENTE</TableHead>
              <TableHead>DATA DE NASCIMENTO</TableHead>
              <TableHead>MODALIDADE</TableHead>
              <TableHead>PARTE DO CORPO</TableHead>
              <TableHead>AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map((item: any, i: any) => (
              <TableRow key={i}>
                <TableCell className="text-xs text-muted-foreground">
                  {i + 1}
                </TableCell>
                <TableCell>
                  {item.patient_first_name}
                </TableCell>
                <TableCell>
                  {convertDate(item.patient_date)}
                </TableCell>
                <TableCell>
                  <Badge
                    size="sm"
                    variant="secondary"
                    className="bg-orange-500/40"
                  >
                    {item.patient_modality}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2 font-medium">
                  <Badge
                    size="sm"
                    variant="secondary"
                    className="bg-yellow-500/40"
                  >
                    {item.patient_body == "brain" ? "TC do crânio" : item.patient_body}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2 font-medium flex">
                  <Link href={`/dashboard/sys/patient/view/${item.id}`} className="flex items-center space-x-1 hover:text-gray-300">
                    <View
                      size={20}
                      color="white"
                      className="cursor-pointer"
                    />
                    <span>ACESSAR VIEW</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}