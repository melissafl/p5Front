import React, { useContext } from 'react'
import { UserContext } from '../context/DataContext'

const Boton = () => {
    const NewDatos = {
        nombre: "Mel",
        edad: 29,
        musica: "R&B"
    }

    const {setData} = useContext(UserContext)

  return (
    <div>
        <button onClick={()=> setData (NewDatos)}>Cambiar</button>
      
    </div>
  )
}

export default Boton
