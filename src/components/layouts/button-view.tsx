import { ElementType } from "react"

interface IButtonView {
  title: string;
  icon: ElementType;
  onSubmitAction?: () => void;
}

export default function ButtonView({ title, icon: Icon, onSubmitAction } : IButtonView){
  return (
    <button className="flex flex-col justify-center items-center space-x-1 hover:text-green-500" onClick={onSubmitAction}>
      <Icon size={20} color="white" />
      <span>{title}</span>
    </button>
  )
}