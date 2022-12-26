import React, {useState} from 'react'
import {sendPasswordResetEmail} from 'firebase/auth'
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import Navbar from "./Navbar";

const Forget = () => {
  const [email, setEmail] = useState()
  const navigate = useNavigate()

  const handleChanges = (e) => {
    setEmail( e.target.value );
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await sendPasswordResetEmail(auth, email)
      Swal.fire({
      icon: 'success',
      title: 'El email para recuperar la contraseña fue enviado',
      showConfirmButton: false,
      timer: 2000
      })
    navigate('/login')
    } catch (error) {
      if (error.code === 'auth/user-not-found'){
        Swal.fire({
        icon: 'error',
        title: 'El usuario no se encuentra registrado',
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
            <h1 className='text-3xl mb-4'>¿Olvidaste la contraseña?</h1>
            <h3 className='text-lg'>Sino tienes cuenta, puedes crearla <Link to="/crearcuenta" className="underline hover:text-red-500 hover:text-xl">aquí</Link></h3>
          </div>
          <form className='m-8' onSubmit={handleSubmit}>
          <div className='flex flex-col my-2'>
            <label className='py-2 font-medium'>Email registrado:</label>
            <input name='email'  className='p-3 rounded-xl' type="email" onChange={handleChanges}/>
          </div>
          <button className='p-4 my-6 bg-black text-yellow-300 rounded-xl hover:scale-110 hover:text-red-500'>Recuperar contraseña</button>
          </form>
        </div>
        <div className='w-[40%] bg-yellow-300 h-screen'>
          <div className='mt-[20%]'>
            <h1 className='text-4xl'>Esperamos tu visita en la mejor comunidad Henry</h1>
          </div>
          <div>
            <img 
              src="https://1.bp.blogspot.com/-kbQ0q2D8E8w/YTp2X05sQBI/AAAAAAAASzg/0MPgv5UjFkE5Zfz77ooEAJBmbWUo93ToACLcBGAsYHQ/s994/HENRY-ILUSTRACION-1-994x559.jpg"
              className="rounded-lg h-[520px] w-[650px] m-14"
              alt="comunidad"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forget