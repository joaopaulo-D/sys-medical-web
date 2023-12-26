"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Trash2, Edit, Loader } from 'lucide-react'
import { Badge } from "./ui/badge";

export function TablePatients(props: any) {

  return (
    <>
      <div className="w-full relative overflow-x-auto shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>PACIENTE</TableHead>
              <TableHead>SEXO</TableHead>
              <TableHead>IDADE</TableHead>
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
                  {item.patient_gender}
                </TableCell>
                <TableCell>
                  {item.patient_age} anos
                </TableCell>
                <TableCell>
                  <Badge
                    size="sm"
                    variant="secondary"
                    className="bg-emerald-400/20"
                  >
                    {item.patient_modality}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2 font-medium">
                  <span>{item.patient_body}</span>
                </TableCell>
                <TableCell className="space-x-2 font-medium flex">
                  <Link href={`#`} className="flex items-center space-x-1 hover:text-gray-300">
                    <Trash2
                      size={18}
                      color="white"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href={`#`} className="flex items-center space-x-1 hover:text-gray-300">
                    <Edit
                      size={18}
                      color="white"
                      className="cursor-pointer"
                    />
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