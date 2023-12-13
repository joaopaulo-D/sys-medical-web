"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import SideBarLeft from "@/components/layouts/sidebar-patient-left"
import SideBarRight from "@/components/layouts/sidebar-patient-right"

import { database } from "@/lib/firebase/config/firebase";
import { ref, get, onValue } from 'firebase/database';

import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx"

export default function Map() {

  const [patient, setPatient] = useState<any>();

  const params = useParams()

  const contextAuth = useAuthenticationContext()

  const getPatientByIdFirebase = async () => {

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
        const res = response.filter(item => item.id == params.query)
        setPatient(res);
      });


    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPatientByIdFirebase()
  }, [])

  return (
    <div>
      {patient?.length > 0 ? (
        <SideBarLeft
          body={patient[0]?.patient_body}
          gender={patient[0]?.patient_gender}
          id={patient[0]?.id}
          modality={patient[0]?.patient_modality}
          patient={patient[0]?.patient_first_name}
          key={patient[0]?.id}
        />
      ) : null}
      <div className="sm:ml-64 flex sm:mr-64 h-screen bg-black">
        {patient?.map((item: any) => (
          <>
            <div key={item.id} className="w-full border-2">
              <div className="flex justify-between text-orange-400 text-sm">
                <div className="flex flex-col">
                  <span>{item.patient_first_name}</span>
                  <span>{item.created_at}</span>
                  <span>{item.patient_gender}</span>
                </div>
                <div className="flex flex-col">
                  <span>{item.patient_modality}</span>
                  <span>{item.created_at}</span>
                  <span>{item.patient_body}</span>
                </div>
              </div>
              <div>
                <img src={`${item.sample_url}`} />
              </div>
              <div className="w-full text-orange-500">
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>
            <div className="w-full border-2">
              <div className="flex justify-between text-orange-400 text-sm">
                <div className="flex flex-col">
                  <span>{item.patient_first_name} - Contraste</span>
                  <span>{item.created_at}</span>
                  <span>{item.patient_gender}</span>
                </div>
                <div className="flex flex-col">
                  <span>{item.patient_modality}</span>
                  <span>{item.created_at}</span>
                  <span>{item.patient_body}</span>
                </div>
              </div>
              <div>
                <img src={`${item.sample_url}`} />
              </div>
              <div className="w-full text-orange-500 text-sm">
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>
          </>
        ))}
      </div>
      {patient?.length > 0 ? (
        <SideBarRight image={patient[0].sample_url} medicine={patient[0].patient_medicine} typeMedicine={patient[0].patient_typeMedicine}/>
      ) : null}
    </div>
  )
}