"use client"

import { List, Settings, Brain, Folder, User, Info, LogOut, HelpCircle } from "lucide-react";

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
        <span className="font-medium text-3xl"><span className="text-blue-500">S</span>H</span>
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
            <HelpCircle size={25} color="white" />
            <span>Ajuda</span>
          </NavLink>
        </li>
        <li>
          <NavLink href="#">
            <Settings size={25} color="white" />
            <span>Ajustes</span>
          </NavLink>
        </li>
      </ul>
      <div className="absolute bottom-3 left-2 space-y-3">
        <Button variant="link" onClick={() => contextAuth?.logout()}>
          <LogOut size={25} color="white" />
        </Button>
      </div>
    </aside>
  )
}