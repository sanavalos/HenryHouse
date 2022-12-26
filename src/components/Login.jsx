import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const Login = () => {
  const [userAccount, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const {signIn} = UserAuth()
  const { user } = UserAuth()
  const handleChanges = (e) => {
    setUser({ ...userAccount, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if(user != null){
      navigate('/cuenta')
    }
  }, [user])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
    await signIn(userAccount.email, userAccount.password)
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido, te extrañamos!',
      showConfirmButton: false,
      timer: 2000
    })
    navigate('/cuenta')
    } catch (error) {
      if (error.code === 'auth/user-not-found'){
        Swal.fire({
        icon: 'error',
        title: 'El usuario no fue encontrado',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/wrong-password'){
        Swal.fire({
        icon: 'error',
        title: 'Contraseña equivocada',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/internal-error'){
        Swal.fire({
        icon: 'error',
        title: 'Llena el espacio de la contraseña',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/invalid-email'){
        Swal.fire({
        icon: 'error',
        title: 'Usa un email válido',
        showConfirmButton: false,
        timer: 2000
        })}
      }
  }
  return (
    <div>
      <Navbar/>
      <div className='flex text-center'>
        <div className="w-[60%] bg-slate-200 h-screen">
          <div className='mt-[20%]'>
            <h1 className='text-3xl mb-4'>Ingresa a tu cuenta</h1>
            <h3 className='text-lg'>Sino tienes cuenta, puedes crearla <Link to="/crearcuenta" className="underline hover:text-red-500 hover:text-xl">aquí</Link></h3>
          </div>
          <form className='m-8' onSubmit={handleSubmit}>
          <div className='flex flex-col my-2'>
            <label className='py-2 font-medium'>Email:</label>
            <input name='email'  className='p-3 rounded-xl' type="email" onChange={handleChanges}/>
          </div>
          <div className='flex flex-col my-2'>
            <label className='py-2 font-medium'>Contraseña:</label>
            <input name='password' className='p-3 rounded-xl' type="password" onChange={handleChanges}/>
          </div>
          <div className='flex space-x-6 justify-center'>
            <button className='p-4 my-6 bg-black text-yellow-300 rounded-xl hover:scale-110 hover:text-red-500'>Ingresa</button>
            <Link to="/olvido"><button className='p-4 my-6 bg-black text-yellow-300 rounded-xl hover:scale-110 hover:text-red-500'>Olvide la contraseña</button></Link>
          </div>
          </form>
        </div>
        <div className='w-[40%] bg-yellow-300 h-screen'>
          <div className='mt-[20%]'>
            <h1 className='text-4xl'>¡Hola de nuevo Henry!</h1>
          </div>
          <div>
            <img 
              src="https://statics.forbesargentina.com/2022/05/627141a292f9b.png"
              className="rounded-lg h-[520px] w-[650px] m-14"
              alt="comunidad"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login