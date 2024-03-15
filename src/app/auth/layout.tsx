interface laytoutProps{
    children:React.ReactNode
}
 const AuthLayout=({children}:laytoutProps)=>{
    return (
        <div className="bg-sky-500 h-full flex flex-col justify-center items-center">
        {children}
        </div>
    )
}
export default AuthLayout;