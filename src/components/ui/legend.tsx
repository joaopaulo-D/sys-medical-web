interface ILegend {
  text: string
}

export const Legend = ({ text } : ILegend) => {
  return (
    <span className="flex items-center text-sm font-medium text-white me-3">
      <span className="flex w-2.5 h-2.5 bg-white rounded-full me-1.5 flex-shrink-0" />
      <p>{text}</p>
    </span>
  )
} 