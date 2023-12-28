import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface IModalAction {
  title: string
  description: string
  text: string
  message: string
  onOpenModal?: boolean
  onChageModal?: any
  variant: "warning" | "success" | null | undefined
  onCancelAction?: () => void
  onSubimitAction?: () => void;
}

const action = cva(
  'w-full text-sm bg-slate-700 p-2 space-y-1',
  {
    variants: {
      variant: {
        warning:
          'text-orange-200',
        success:
          'text-green-200',
      },
    }
  }
)

export function ModalAction({
  message,
  onCancelAction,
  onChageModal,
  onOpenModal,
  onSubimitAction,
  text,
  description,
  title,
  variant,
  ...props
}: IModalAction) {

  return (
    <Dialog open={onOpenModal} onOpenChange={onChageModal}>
      <DialogContent className="max-w-lg bg-[#222325]">
        <DialogHeader>
          <DialogTitle><span className="text-blue-500">SysLae</span> Health - {title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className={cn(action({ variant }))}>
          <div className="flex items-center space-x-2">
            <AlertTriangle size={14} color="white" />
            <span>Aviso</span>
          </div>
          <div className="w-full">
            {message}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onChageModal(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={onSubimitAction}
          >
            {text}
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}