import { Button } from "@/components/ui/button"
import { IconType } from "react-icons"

interface ButtonProps {
    icon: IconType,
    onClick?: () => void
}

export default function ButtonAuth({
    icon: Icon,
    onClick
}:ButtonProps ) {
  return (
    <Button onClick={onClick} className="group w-full bg-white border border-purple-400 hover:bg-purple-400 hover:text-white">
        <div className="flex items-center justify-center w-full hover:text-white">
            <Icon className="text-purple-500 group-hover:text-white"/>
        </div>
    </Button>
  )
}
