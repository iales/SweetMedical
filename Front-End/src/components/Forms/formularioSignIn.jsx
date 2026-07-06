import React, {useState, useEffect} from "react";
import './formularioSignIn.css'
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";  
import { findSedes } from "../../services/sedesService";
import { useStepContext } from "@mui/material";
import { findObrasSociales } from "../../services/obrasSocialesService";
import {register} from '../../services/authService'
import Loader from '../../components/Loader/loader.jsx'



const FormularioSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const [opcionesSedes, setOpcionesSedes] = useState([]);
  const [opcionesObrasSociales, setOpcionesObrasSociales] = useState([]);
  const [opcionesPlanes, setOpcionesPlanes] = useState([]);

  const [nombreCompleto, setnombreCompleto] = useState("");   
  const [dni, setDNI] = useState("");   
  const [email, setEmail] = useState("");
  const [sedes, setSedes] = useState([]);  
  const [password, setPassword] = useState("");    
  const [confirmPassword, setConfirmPassword] = useState("");   
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [matricula, setMatricula] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [plan, setPlan] = useState("");

  

    const handleSubmit = async(e) => {
    e.preventDefault();  
      
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");         
    return;
    }

    let formData;

    if(role === 'medico'){
      formData = {
          nombre: nombreCompleto,
          email,
          dni,
          password,
          rol: role,
          matricula,
          sedes: sedes.map(s => s.value)
    };
    }else{
       formData = {
          nombre: nombreCompleto,
          email,
          dni,
          password,
          rol: role,
          obraSocialId: obraSocial.value,
          planId: plan.value
    };
    }
    try {
      const data = await register(formData);
      navigate("/login"); 
    } catch (error) {
      console.error(error);
      alert("Error en el registro");
    }
  };

    //----------------------- Funciones back -----------------------------
  const cargarSedes = async () => {
        var sedesCargadas = await findSedes();
  
        sedesCargadas = sedesCargadas.map(p => ({
        value: p.id,
        label: p.nombre
      }));
  
        setOpcionesSedes(sedesCargadas);
    }

  const cargarObrasSociales = async () => {
      const obrasSocialesCargadas = await findObrasSociales();
      setOpcionesObrasSociales(obrasSocialesCargadas);
  }


     useEffect(() => {
            cargarSedes();
            cargarObrasSociales();
            setLoading(false);
        }, [])

      //----------------------- Funciones back -----------------------------
      



        
  if (loading) {return <Loader texto= "Aguarde un momento, por favor..." />;}
  
  return (
    <form onSubmit={handleSubmit} className="form-login">
       <div className="form-group">
        <label htmlFor="nombreCompleto">Nombre y apellido</label>
        <input
          type="text"
          id="nombreCompleto"
          value={nombreCompleto}
          placeholder="ej.: Martín Adrián Perez"
          onChange={(e) => setnombreCompleto(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="ej.: martinPerez@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

         
      <div className="form-group">
        <label htmlFor="dni">Documento Nacional de Identidad</label>
        <input
          type="Int"
          id="dni"
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
          </button>
      </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Repetir contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required/>
      </div>

      <div className="form-group">
        <label>Selecciona tu rol:</label>
        <div className="roles">
          <label>
            <input
              type="radio"
              name="role"
              value="medico"
              checked={role === "medico"}
              onChange={(e) => setRole(e.target.value)}
            />
            Médico
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="paciente"
              checked={role === "paciente"}
              onChange={(e) => setRole(e.target.value)}
            />
            Paciente
          </label>
        </div>
      </div>


    {/*Dependiendo del rol, mostraremos distintos campos a completar*/}
      {role === "medico" && (
        <>
           <div className="form-group">
          <label htmlFor="matricula">Matricula</label>
          <input
            type="text"
            id="matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
          <div className="form-group">
            <label>Sedes a presentarse:</label>
            <Select
            isMulti
            options={opcionesSedes}
            value={sedes}
            onChange={(selected) => setSedes(selected)}
            placeholder="Seleccione una o varias sedes"/>
          </div>
        </>
      )}

      {role === "paciente" && (
        <>
        <div className="form-group">
        <label>Obra social a adquirir:</label>
        <Select
          options={opcionesObrasSociales.map(o => ({
            value: o.id,
            label: o.nombre,
            planes: o.planes
          }))}
          value={obraSocial}
          onChange={(selected) => {
            setObraSocial(selected);
            setPlan(null); 
          }}
          placeholder="Seleccione su obra social"
        />
      </div>

      {obraSocial && obraSocial.planes && (
        <div className="form-group">
          <label htmlFor="plan">Plan: </label>
          <Select
            options={obraSocial.planes.map(p => ({
              value: p.planId,
              label: p.nombrePlan
            }))}
            value={plan}
            onChange={(selected) => setPlan(selected)}
            placeholder="Seleccione un plan"
          />
        </div>
      )}
      </>
      )}

      <button type="submit" className="btn-signIn">Registrarse</button>
    </form>
  );

}

export default FormularioSignIn;