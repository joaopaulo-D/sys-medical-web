"use client"

import { useEffect, useState } from "react";

import { Sidebar } from "@/components/layouts/sidebar";
import { TablePatients } from "@/components/table-patients";
import { Button } from "@/components/ui/button";
import { CreatePatient } from "@/components/create-patient";

import { UserPlus } from "lucide-react";

import { database } from "@/lib/firebase/config/firebase";
import { ref, get, onValue } from 'firebase/database';
import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx";

export default function Patient() {

  const [open, setOpen] = useState<boolean>(false);
  const [patients, setPatients] = useState<[] | any>([]);

  const contextAuth = useAuthenticationContext()

  const getPatientsFirebase = async () => {
    
    const databaseRef = ref(database, `doctors/${contextAuth?.user?.uid}/patients`);

    try {
      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        const response = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            response.push({
              id: key,
              ...data[key],
            });
          }
        }
        setPatients(response);
      });

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPatientsFirebase()
  }, [])

  return (
    <div>
      <Sidebar />
      <div className="py-3 sm:ml-[6rem] h-screen px-2 space-y-5">
        <div className="flex w-full justify-between">
          <span className='text-white font-bold text-2xl'>Pacientes - {patients.length}</span>
          <Button className="rounded-sm flex space-x-1" onClick={() => setOpen(true)}>
            <UserPlus size={18} color="black" />
            <span>Adicionar Paciente</span>
          </Button>
        </div>
        <TablePatients data={patients}/>
      </div>
      {open ? (
        <CreatePatient open={open} setOpen={setOpen}/>
      ) : null}
    </div>
  )
} 