import { useState } from "react"
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import useFormulario from "../hooks/useFormulario";

const Formulario = ({agregarTodo}) => {
    const initialState = {
        nombre: "",
        descripcion: "",
        estado: "pendiente",
        prioridad: false
    }

    const [inputs, handleChange, reset] = useFormulario(initialState)

    const {nombre, descripcion, estado, prioridad} = inputs

    const handleSubmit = e => {
        e.preventDefault()
        e.target[0].focus()
        if(!nombre.trim()){
            Swal.fire({
                title: 'Error!',
                text: 'No deja los campos en blanco',
                icon: 'error',
            })
            return
        }

        if(!descripcion.trim()){
            e.target[1].focus()
            Swal.fire({
                title: 'Error!',
                text: 'No deja los campos en blanco',
                icon: 'error',
            })
            return
        }

        Swal.fire({
            title: 'Exito!',
            text: 'Tarea Guardada',
            icon: 'success',
        })

        agregarTodo({
            nombre,
            descripcion,
            estado: estado === "pendiente" ? false : true,
            prioridad,
            id: uuidv4()
        })

        reset()
    }

  return (
    <>
      <h3 className="container">Agregar Todos</h3>
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            className="form-control mb-2"
            name="nombre"
            placeholder="Ingrese Tarea"
            value={nombre}
            onChange = {handleChange}
        />
        <textarea
            className="form-control mb-2"
            placeholder="Ingrese Tarea"
            name="descripcion"
            value={descripcion}
            onChange = {handleChange}
        />
        <select
            className="form-control mb-2" 
            name="estado"
            value={estado}
            onChange = {handleChange}
            >
            <option value="pendiente">Pendiente</option>
            <option value="finalizado">Finalizado</option>
        </select>
        <div className="form-check">
            <input 
            id="flexCheckDefault"
            className="form-check-input" 
            name="prioridad"
            type="checkbox" 
            checked = {prioridad}
            onChange = {handleChange}
            />
            <label 
            className="form-check-label" 
            htmlFor="flexCheckDefault">
                Prioridad
            </label>
        </div>
        <button 
            type="submi"
            className="btn btn-primary"
        >
            Agregar
        </button>
      </form>
    </>
  )
}

export default Formulario
