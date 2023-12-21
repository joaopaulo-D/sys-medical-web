"use client"

import { List, Settings, Brain, Folder, User, Info, LogOut } from "lucide-react";

import { NavLink } from "../ui/nav-link";
import { Button } from "../ui/button";

import { useAuthenticationContext } from "@/contexts/FirebaseAuthenticationContext.tsx";

export function Sidebar() {
  
  const contextAuth = useAuthenticationContext()

  return (
    <aside
      className="bg-[#333232] fixed top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0"
    >
      <div className="flex p-4 justify-center items-center">
        <Brain size={30} color="white" />
      </div>
      <ul className="space-y-3">
        <li>
          <NavLink href="/dashboard/sys/patient">
            <List size={25} color="white" />
            <span>Pacientes</span>
          </NavLink>
        </li>
        <li>
          <NavLink href="/dashboard/sys/sample">
            <Folder size={25} color="white" />
            <span>Exames</span>
          </NavLink>
        </li>
        <li>
          <NavLink href="#">
            <Info size={25} color="white" />
            <span className="text-[10px]">Informações</span>
          </NavLink>
        </li>
        <li>
          <NavLink href="#">
            <Settings size={25} color="white" />
            <span className="text-[10px]">Configurações</span>
          </NavLink>
        </li>
      </ul>
      <div className="absolute bottom-3 left-2 space-y-3">
        <NavLink href="#">
          <User size={25} color="white" />
        </NavLink>
        <Button variant="link" onClick={() => contextAuth?.logout()}>
          <LogOut size={25} color="white" />
        </Button>
      </div>
    </aside>
  )
}