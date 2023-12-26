import { useState } from "react";

import { storage, database } from "@/lib/firebase/config/firebase";
import { ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as refDataset, serverTimestamp, set, push, child } from 'firebase/database';

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
  const [medicine, setMedicine] = useState<string>('nao')
  const [typeMedicine, setTypeMedicine] = useState<string[]>([])

  const [file, setFile] = useState<any | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  const [loading, setLoading] = useState<boolean>(false)

  const contextAuth = useAuthenticationContext()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return

    const value = event.currentTarget.value

    if (!value.trim()) return

    setTypeMedicine([...typeMedicine, value])

    event.currentTarget.value = ""
  }

  const removeTag = (index: number) => {
    setTypeMedicine(typeMedicine.filter((el, i) => i !== index))
  }

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
      const newUploadsRef = push(child(refDataset(database), `doctors/${contextAuth?.user?.uid}/patients/`))
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
        patient_medicine: medicine,
        patient_typeMedicine: typeMedicine,
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
    <DialogContent className="bg-[#222325]">
      <DialogHeader>
        <DialogTitle>Cadastrar Paciente</DialogTitle>
        <DialogDescription>

        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleCreatePatient} className="w-full">
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Primeiro Nome *</Label>
            <Input
              className="bg-[#333232]"
              placeholder=""
              type="text"
              id="first_name"
              onChange={(value) => setFirstName(value.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Segundo Nome *</Label>
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
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Idade *</Label>
            <Input
              className="bg-[#333232]"
              placeholder=""
              type="number"
              id="age"
              onChange={(value) => setAge(value.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Sexo *</Label>
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
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">faz uso de medicamento ? *</Label>
            <div>
              <Select onValueChange={(value) => setMedicine(value)} required>
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
          {medicine != "nao" ? (
            <div className="w-full md:w-1/2">
              <Label htmlFor="name">Qual medicamento ? *</Label>
              <div>
                <Input
                  className="bg-[#333232]"
                  placeholder=""
                  type="text"
                  onKeyDown={handleKeyDown}
                  required
                />
                {typeMedicine.map((tag, index) => (
                  <div className="bg-white inline-flex items-center text-sm text-black rounded mt-1 mr-1 overflow-hidden" key={index}>
                    <span className="ml-2 leading-relaxed truncate max-w-xs px-1" x-text="tag">{index} - {tag}</span>
                    <X color="black" size={15} onClick={() => removeTag(index)} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Modalidade *</Label>
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
        </div>
        <div className="flex space-x-2 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Parte do Corpo *</Label>
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
          <div className="w-full md:w-1/2">
            <Label htmlFor="name">Exame (ex: png, jpg e dicom) *</Label>
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
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false)
              setMedicine("nao")
            }}
          >
            Cancelar
          </Button>
          <Button>Cadastrar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}