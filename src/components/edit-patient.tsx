import { useState } from "react";

import { storage, database } from "@/lib/firebase/config/firebase";
import { ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as refDataset, set, push, child, update } from 'firebase/database';

import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx";
import { Label } from "./ui/label";
import { convertDate } from "@/lib/date";
import { IPacient } from "@/dtos/Pacient";

type EditProps = {
  setOpen: any;
  open: boolean;
  data: IPacient | undefined;
}

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Convertendo...',
  generating: 'Transcrevendo...',
  uploading: 'Carregando...',
  success: 'Sucesso!',
}

export function EditPatient({ open, setOpen, data }: EditProps) {

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [modality, setModality] = useState<string>('')
  const [medicine, setMedicine] = useState<string>('')
  const [typeMedicine, setTypeMedicine] = useState<string[]>([])


  const [openMessageWarining, setMessageWarining] = useState<string>("");
  const [file, setFile] = useState<any | null>(null)
  const [uploadFileCloud, setUploadFileCloud] = useState<string>("");
  const [status, setStatus] = useState<Status>('waiting')
  const [loading, setLoading] = useState<boolean>(false)

  const contextAuth = useAuthenticationContext()

  const handleKeyDownForm = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return

    const value = event.currentTarget.value

    if (!value.trim()) return

    setTypeMedicine((prevTypeMedicine) => {
      const updatedTypeMedicine = [...prevTypeMedicine, ...data?.patient_typeMedicine as string[], value];
      return updatedTypeMedicine;
    });

    event.currentTarget.value = ""
  }

  const removeTag = (index: number) => {
    setTypeMedicine((prevTypeMedicine) => {
      const updatedTypeMedicine = [...prevTypeMedicine];
      updatedTypeMedicine.splice(index, 1)

      const updatedPatientTypeMedicine = typeMedicine.filter((el, i) => i !== index);
      setTypeMedicine(updatedPatientTypeMedicine);

      return updatedTypeMedicine
    })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleEditPatient = async (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setLoading(true)

      setStatus("uploading")
      if (file != null) {
        const storageRef = refStorage(storage, `samples/${file.name}`);

        const existingUploadFile = await getDownloadURL(storageRef).catch(error => null)

        if (existingUploadFile !== null) {
          setMessageWarining(`Exame ${file.name} cadastrado.`)
        }

        const uploadTask = uploadBytesResumable(storageRef, file)

        setStatus("uploading")
        await uploadTask;

        setStatus("converting")
        const getUrlUploadFile = await getDownloadURL(storageRef);

        setUploadFileCloud(getUrlUploadFile)

      } else {

        setStatus("generating")
        const updatePatientRef = child(refDataset(database), `doctors/${contextAuth?.user?.uid}/patients/${data?.id}`)
        await update(updatePatientRef, {
          sample_name: file?.name || data?.sample_name,
          sample_url: uploadFileCloud || data?.sample_url,
          sample_type: file?.type || data?.sample_type,
          sample_size: file?.size || data?.sample_size,
          patient_first_name: firstName || data?.patient_first_name,
          patient_last_name: lastName || data?.patient_last_name,
          patient_age: age || data?.patient_age,
          patient_gender: gender || data?.patient_gender,
          patient_body: body || data?.patient_body,
          patient_date: dateOfBirth || data?.patient_date || null,
          patient_modality: modality || data?.patient_modality,
          patient_medicine: medicine || data?.patient_medicine,
          patient_typeMedicine: typeMedicine || data?.patient_typeMedicine,
        })
      }

      setStatus("success")
      setFile(null)
      setStatus("waiting")
      setOpen(!open)
      setFirstName('')
      setLastName('')
      setAge('')
      setGender('')
      setBody('')
      setDateOfBirth('')
      setModality('')
      setMedicine('')
      setTypeMedicine([])
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  console.log(typeMedicine)

  return (
    <DialogContent className="bg-[#222325]">
      <DialogHeader>
        <DialogTitle><span className="text-blue-500">SysLae</span> Health - Atualizar Paciente</DialogTitle>
        <DialogDescription>

        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditPatient} className="w-full" onKeyDown={handleKeyDownForm}>
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Primeiro Nome</Label>
            <Input
              className="bg-[#333232]"
              type="text"
              onChange={(value) => setFirstName(value.target.value)}
              defaultValue={data?.patient_first_name as string}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Segundo Nome</Label>
            <Input
              className="bg-[#333232]"
              type="text"
              onChange={(value) => setLastName(value.target.value)}
              defaultValue={data?.patient_last_name as string}
            />
          </div>
        </div>
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Idade</Label>
            <Input
              className="bg-[#333232]"
              type="number"
              id="age"
              onChange={(value) => setAge(value.target.value)}
              defaultValue={data?.patient_age as string}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Data de Nascimento</Label>
            <Input
              className="bg-[#333232]"
              type="date"
              id="date_of_birth"
              onChange={(value) => setDateOfBirth(value.target.value)}
              defaultValue={data?.patient_date as string}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Sexo</Label>
            <div>
              <Select onValueChange={(value) => setGender(value)} defaultValue={data?.patient_gender as string}>
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
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Faz uso de medicamento ?</Label>
            <div>
              <Select onValueChange={(value) => setMedicine(value)} defaultValue={data?.patient_medicine as string}>
                <SelectTrigger className="bg-[#333232]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">
                    Sim
                  </SelectItem>
                  <SelectItem value="nao">
                    Não
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {data?.patient_medicine != "nao" ? (
            <div className="w-full md:w-1/2">
              <Label htmlFor="name">Qual medicamento ?</Label>
              <div>
                <Input
                  className="bg-[#333232]"
                  placeholder=""
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {typeMedicine.map((tag: any, index: any) => (
                  <div className="bg-white inline-flex items-center text-sm text-black rounded mt-1 mr-1 overflow-hidden" key={index}>
                    <span className="ml-2 leading-relaxed truncate max-w-xs px-1" x-text="tag">{index + 1} - {tag}</span>
                    <X color="blue" className="cursor-pointer" size={15} onClick={() => removeTag(index)} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Modalidade</Label>
            <div>
              <Select onValueChange={(value) => setModality(value)} defaultValue={data?.patient_modality as string}>
                <SelectTrigger className="bg-[#333232]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CT">
                    Tomografia Computadorizada - CT
                  </SelectItem>
                  <SelectItem value="outros" disabled>
                    Outros
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Parte do Corpo</Label>
            <div>
              <Select onValueChange={(value) => setBody(value)} defaultValue={data?.patient_body as string}>
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
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Exame (ex: png, jpg e dicom)</Label>
            <Input
              className="bg-[#333232]"
              placeholder=""
              type="file"
              accept='.png, .jpg, .dicom'
              onChange={handleImageChange}
            />
            <span>{openMessageWarining ? openMessageWarining : null}</span>
          </div>
        </div>
        <div className="w-full space-y-2">
          <div className="w-full bg-white text-black p-2 text-sm rounded-sm">
            <span>Exames de TC cadastrados - {convertDate(data?.created_at as string, true)}</span>
          </div>
          <div className="grid grid-cols-4 overflow-y-auto max-h-[300px] gap-2">
            <img src={data?.sample_url} alt={data?.sample_name} />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false)
            }}
          >
            Cancelar
          </Button>
          <Button>{loading ? "Carregando" : "Atualizar"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}