import React, {use, useState} from "react";
import { useSession } from '../SessionContext/sessionContext';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../services/authService'
import './formularioLogin.css'




const FormularioLogin = () => {
  const { loginGlobal } = useSession();
  const [email, setEmail] = useState("");           
  const [password, setPassword] = useState("");       
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
    
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor complete todos los campos");
      return;
    }

    const formData = {email, password}
    
    try {
      const data = await login(formData);
      loginGlobal(data.token);
      navigate("/main"); 
    }
    catch (error) {
      console.error(error);
      alert(error.message);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
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
            {showPassword ? <i className ="bi bi-eye-fill"></i> : <i className ="bi bi-eye-slash"></i>}
          </button>
      </div>
      </div>
      <button type="submit" className="btn-login">Iniciar sesión</button>
    </form>
  );




}

export default FormularioLogin;