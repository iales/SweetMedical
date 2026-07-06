import React from "react";
import './informationLanding.css';

const InformationLanding = () =>{
    return(
    <section className="info-bar">
        <div className = "row">
        <div className="service">
            <i className="bi bi-person-check"></i>
            <span className = "title">Médicos de calidad</span>
            <p className="description">Capacitados en multiples practicas</p>
        </div>
        <div className="service">
            <i className="bi bi-hospital"></i>
            <span className = "title">Numerosas sedes</span>
            <p className="description">Disponibles en distintas zonas para tu comodidad</p>
        </div>
        <div className="service">
            <i className="bi bi-calendar-check"></i>
            <span className="title">Turnos online</span>
            <p className="description">Reservá tu cita de manera rápida y sencilla</p>
        </div>
       </div>
      <div className = "row">
      <div className="service">
         <i className ="bi bi-telephone-fill"></i>
         <span className = "title">Atención integral</span>
         <p className="description">Proveemos un servicio de atención que prioriza al paciente por sobre todas las cosas</p>
      </div>
      <div className="service">
        <i className="bi bi-briefcase-fill"></i>
        <span className="title">Múltiples planes</span>
        <p className="description">Contamos con diferentes rangos de planes, a diferentes precios, para que eligas el que más se adecue a tus necesidades</p>
      </div>
      <div className="service">
        <i className ="bi bi-clock-history"></i>
        <span className="title">Historial</span>
        <p className="description">Ofrecemos la capacidad de revisar todas tus operaciones a lo largo del tiempo</p>
      </div>
      </div>
    </section>
    )
}

export default InformationLanding;