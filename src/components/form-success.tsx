import { FaCheckSquare } from "react-icons/fa"
interface ErrorProps{
    message?: string
}
export function FormSuccess({message}:ErrorProps){
    return(
        <div className="bg-green-200 p-2 flex gap-2 items-center rounded-md mt-2" >
            <FaCheckSquare className="text-green-400"/>
            {message}
        </div>
    )
}