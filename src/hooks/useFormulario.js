import { useState } from "react"

const useFormulario = (initialState = {}) => {
  const [inpust, setInputs] = useState(initialState)

  const handleChange = e =>{
    const {name, value, checked, type} = e.target
    
    setInputs((old)=>({
        ...old,
        [name]: type === "checkbox" ? checked : value,
    }))
    }

    const reset = () => {
        setInputs(initialState)
    }

  return [inpust, handleChange, reset]
}

export default useFormulario
