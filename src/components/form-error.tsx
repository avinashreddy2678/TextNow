import { FaExclamationTriangle } from "react-icons/fa"
interface ErrorProps{
    message?: string
}
export function FormError({message}:ErrorProps){
    return(
        <div className="bg-red-200 p-2 flex gap-2 items-center rounded-md mt-2" >
            <FaExclamationTriangle className="text-red-400"/>
            {message}
        </div>
    )
}