"use client"

import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Trash2, Edit } from 'lucide-react'
import { Badge } from "./ui/badge";

import { deleteObject, ref as refStorage } from "firebase/storage";
import { ref as refDataset, remove } from "firebase/database";
import { storage, database } from "@/infra/firebase/config/firebase";
import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx";
import { ModalAction } from "./layouts/modals/modals-action";
import { convertDate } from "@/infra/date";
import { EditPatient } from "./edit-patient";
import { Dialog } from "./ui/dialog";

import { IPacient } from "@/dtos/Pacient";

interface IDelete {
  patientId: string
  name_file: string
}

export function TablePatients(props: any) {

  const contextAuth = useAuthenticationContext()
  const [loading, setLoading] = useState<boolean>(false);

  const [openModalDeleteDialog, setModalDeleteDialog] = useState<boolean>(false);
  const [dataModalDeleteDialog, setDataModalDeleteDialog] = useState<any>();

  const [openModalEditDialog, setModaEditDialog] = useState<boolean>(false);
  const [dataModalEditDialog, setDataModalEditDialog] = useState<IPacient>();

  const handleDeletePetient = async ({ name_file, patientId }: IDelete) => {
    try {

      const storageRef = refStorage(storage, `samples/${name_file}`)
      const databaseRef = refDataset(database, `doctors/${contextAuth?.user?.uid}/patients/${patientId}`)

      await remove(databaseRef)
      await deleteObject(storageRef)

      setModalDeleteDialog(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

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
              <TableHead>DATA DE NASCIMENRO</TableHead>
              <TableHead>MODALIDADE</TableHead>
              <TableHead>PARTE DO CORPO</TableHead>
              <TableHead>AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map((item: IPacient, i: any) => (
              <>
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
                    <div className="flex items-center space-x-1 hover:text-gray-300">
                      <Trash2
                        size={18}
                        color="white"
                        className="cursor-pointer"
                        onClick={() => {
                          setModalDeleteDialog(true)
                          setDataModalDeleteDialog({ name_file: item.sample_name, patientId: item.id })
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-1 hover:text-gray-300">
                      <Edit
                        size={18}
                        color="white"
                        className="cursor-pointer"
                        onClick={() => {
                          setModaEditDialog(true)
                          setDataModalEditDialog(item)
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
          <ModalAction
            title="Deletar Paciente"
            description="Tem certeza de que deseja excluir este paciente da plataforma SysLae health?"
            message="Ao excluir este paciente, os exames associados também serão excluídos permanentemente."
            text="Deletar Paciente"
            onOpenModal={openModalDeleteDialog}
            onChageModal={setModalDeleteDialog}
            onSubimitAction={() => handleDeletePetient(dataModalDeleteDialog)}
            variant="warning"
          />
          <Dialog open={openModalEditDialog} onOpenChange={setModaEditDialog}>
            <EditPatient open={openModalEditDialog} setOpen={setModaEditDialog} data={dataModalEditDialog}/>
          </Dialog>
        </Table>
      </div>
    </>
  )
}