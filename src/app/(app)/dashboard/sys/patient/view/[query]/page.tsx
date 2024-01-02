"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import { Axis3D, Contrast, Move, RefreshCcw, RotateCcw, ZoomIn } from "lucide-react"

import SideBarLeft from "@/components/layouts/sidebar-patient-left"
import SideBarRight from "@/components/layouts/sidebar-patient-right"
import ButtonView from "@/components/layouts/button-view"

import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx"
import { database } from "@/lib/firebase/config/firebase";
import { ref, onValue } from 'firebase/database';
import { api } from "@/lib/sys/server/api"

export default function Map() {

  const [patient, setPatient] = useState<any>();
  const [segmentedImage, setSegmentedImage] = useState<string | null>(null);

  const params = useParams()

  const contextAuth = useAuthenticationContext()

  const getPatientByIdFirebase = async (): Promise<void> => {

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

  const handleSegmentation = async (image: string): Promise<void> => {
    try {
      const response = await api.post<Blob>(
        '/sys/ai/segmentation',
        new URLSearchParams({ image }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          responseType: 'blob'
        });

      if (response.status !== 200) {
        throw new Error('Erro ao processar a solicitação');
      }

      const blob = new Blob([response.data]);
      setSegmentedImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Erro ao segmentar a imagem:', error);
    }
  };

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
      <div className="sm:ml-64 sm:mr-64 h-full bg-black">
        {patient?.map((item: any) => (
          <>
            <div className="flex px-2 py-3 text-sm space-x-8 border-b-[1px] border-b-white">
              <ButtonView
                title="Girar"
                icon={RotateCcw}
                onSubmitAction={() => console.log("")}
              />
              <ButtonView
                title="Mover"
                icon={Move}
                onSubmitAction={() => console.log("")}
              />
              <ButtonView
                title="Localizar"
                icon={Contrast}
                onSubmitAction={() => handleSegmentation(item.sample_url)}
              />
              <ButtonView
                title="Lupa"
                icon={ZoomIn}
                onSubmitAction={() => console.log("")}
              />
              <ButtonView
                title="Resetar"
                icon={RefreshCcw}
                onSubmitAction={() => console.log("")}
              />
              <ButtonView
                title="View 3D"
                icon={Axis3D}
                onSubmitAction={() => console.log("")}
              />
            </div>
            <div className="grid grid-cols-2">
              <div key={item.id} className="w-full p-2 border-r-[1px] border-r-white">
                <div className="flex justify-between text-blue-300 text-sm">
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
                <div className="flex justify-between text-blue-300 text-sm">
                  <div className="flex flex-col">
                    <span>Z: 0</span>
                    <span>W: 256 L: 128</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                  <div className="">
                    <span>1/2</span>
                  </div>
                </div>
              </div>
              <div className="w-full p-2">
                <div className="flex justify-between text-blue-300 text-sm">
                  <div className="flex flex-col">
                    <span>{item.patient_first_name} - Lacalização</span>
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
                  {segmentedImage && (
                    <>
                      <div className="flex justify-center items-center">
                        <img src={segmentedImage} alt="segmented" />
                      </div>
                      <div className="grid grid-cols-4 ">
                        <img src={`${item.sample_url}`} className="w-[120px] h-[120px]" />
                        <img src={`${item.sample_url}`} className="w-[120px] h-[120px]" />
                        <img src={`${item.sample_url}`} className="w-[120px] h-[120px]" />
                        <img src={`${item.sample_url}`} className="w-[120px] h-[120px]" />
                        <img src={`${item.sample_url}`} className="w-[120px] h-[120px]" />
                        <img src={`${item.sample_url}`} className="w-[120px] h-[120px]" />
                      </div>
                      <div className="flex justify-between text-blue-300 text-sm">
                        <div className="flex flex-col">
                          <span>Z: 0</span>
                          <span>W: 256 L: 128</span>
                          <span>{new Date().toLocaleString()}</span>
                        </div>
                        <div className="">
                          <span>2/2</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      {patient?.length > 0 ? (
        <SideBarRight image={patient[0].sample_url} medicine={patient[0].patient_medicine} typeMedicine={patient[0].patient_typeMedicine} />
      ) : null}
    </div>
  )
}