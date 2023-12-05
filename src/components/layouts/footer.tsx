export function Footer(){
  return (
    <footer className="flex w-full bottom-0 absolute items-center justify-center">
      <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()}</p>
    </footer>
  )
}