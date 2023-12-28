"use client"

import { useEffect, useState } from "react";

import { Sidebar } from "@/components/layouts/sidebar";
import { TableSamples } from "@/components/table-samples";

import { database } from "@/lib/firebase/config/firebase";
import { ref, get, onValue } from 'firebase/database';

import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx";

export default function Sample() {

  const [sample, setSample] = useState<[] | any>([]);
  const contextAuth = useAuthenticationContext()

  const getSampleFirebase = async (): Promise<void> => {

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
        setSample(response);
      });

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSampleFirebase()
  }, [])

  return (
    <div>
      <Sidebar />
      <div className="py-3 sm:ml-[6rem] h-screen px-2 space-y-5">
        <div className="flex w-full justify-between">
          <span className='text-white font-bold text-2xl'>Exames - {sample.length}</span>
        </div>
        <TableSamples data={sample} />
      </div>
    </div>
  )
} 