import { useState } from "react";

import { storage, database } from "@/lib/firebase/config/firebase";
import { ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as refDataset, serverTimestamp, set, push, child } from 'firebase/database';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type CreateProps = {
  setOpen: any;
  open: boolean
}

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Convertendo...',
  generating: 'Transcrevendo...',
  uploading: 'Carregando...',
  success: 'Sucesso!',
}

export function CreatePatient({ open, setOpen }: CreateProps) {

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [modality, setModality] = useState<string>('')
  const [file, setFile] = useState<any | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  const [loading, setLoading] = useState<boolean>(false)

  // const contextAuth = useAuthenticationContext()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleCreatePatient = async (event: React.FormEvent) => {
    event.preventDefault()
    
    try {
      setLoading(true)
      setStatus("uploading")
      const storageRef = refStorage(storage, `samples/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file)
      setStatus("uploading")
      await uploadTask;
      setStatus("converting")
      const getUrlUploadFile = await getDownloadURL(storageRef);
      //const uploadsRef = refDataset(database, `doctors/KpsKsazTVYhTdjDkHPAB4nS3Agh2/uploads/`);
      setStatus("generating")
      const newUploadsRef = push(child(refDataset(database), `doctors/KpsKsazTVYhTdjDkHPAB4nS3Agh2/patients/`))
      await set(newUploadsRef, {
        sample_name: file.name,
        sample_url: getUrlUploadFile,
        sample_type: file.type,
        sample_size: file.size,
        patient_first_name: firstName,
        patient_last_name: lastName,
        patient_age: age,
        patient_gender: gender,
        patient_body: body,
        patient_modality: modality,
        created_at: new Date().toLocaleString()
      })
      setStatus("success")
      setFile(null)
      setStatus("waiting")
      setOpen(!open)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-4/5 my-4">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#222529] outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Cadastrar Paciente
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form className="w-full p-4">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Primeiro Nome *
                      </label>
                      <Input
                        className="bg-[#333232]"
                        placeholder=""
                        type="text"
                        id="first_name"
                        onChange={(value) => setFirstName(value.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Segundo Nome *
                      </label>
                      <Input
                        className="bg-[#333232]"
                        placeholder=""
                        type="text"
                        id="last_name"
                        onChange={(value) => setLastName(value.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Idade *
                      </label>
                      <Input
                        className="bg-[#333232]"
                        placeholder=""
                        type="number"
                        id="age"
                        onChange={(value) => setAge(value.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Sexo *
                      </label>
                      <div>
                        <Select onValueChange={(value) => setGender(value)} required>
                          <SelectTrigger className="bg-[#333232]">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Masculino">
                              Masculino
                            </SelectItem>
                            <SelectItem value="Feminino">
                              Feminino
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Modalidade *
                      </label>
                      <div>
                        <Select onValueChange={(value) => setModality(value)} required>
                          <SelectTrigger className="bg-[#333232]">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CT">
                              Tomografia computadorizada - CT
                            </SelectItem>
                            <SelectItem value="outros" disabled>
                              Outros
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Parte do Corpo *
                      </label>
                      <div>
                        <Select onValueChange={(value) => setBody(value)} required>
                          <SelectTrigger className="bg-[#333232]">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brain">
                              TC Craniana
                            </SelectItem>
                            <SelectItem value="outros" disabled>
                              Outros
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Exame (ex: png, jpg e dicom) *
                      </label>
                      <Input
                        className="bg-[#333232]"
                        placeholder=""
                        type="file"
                        accept='.png, .jpg, .dicom'
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                  </div>
                </form>
                <div className="flex space-x-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Button className="rounded-sm text-red-500" variant="link" onClick={() => setOpen(!open)}>
                    CANCELAR
                  </Button>
                  <Button onClick={handleCreatePatient} className="rounded-sm bg-green-500 text-white" disabled={loading}>
                    {loading ? "Carregando ..." : "CADASTRAR"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}