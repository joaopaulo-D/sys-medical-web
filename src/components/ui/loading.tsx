import { MapPin } from "lucide-react";

export function Loading(){
  return (
    <div className="flex mx-auto h-screen w-full items-center justify-center space-x-2">
      <MapPin size={20} color="black"/>
      <span className="text-gray-800">carregando mapa...</span>
    </div>
  )
}