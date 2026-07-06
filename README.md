# 🏥 Sweet Medical - Plataforma de Gestión de Turnos Médicos

Plataforma web orientada a la gestión eficiente de turnos médicos, diseñada bajo un enfoque analítico para optimizar procesos, costes y tiempos dentro del ciclo de vida de los turnos. El proyecto se encuentra completamente funcional y desplegado en la nube.

🔗 **Link del Proyecto:** [Visitar Sweet Medical](https://two026-1c-frontend-mn-grupo-06.onrender.com/)

---

## 🛠️ Tecnologías Utilizadas

El sistema fue desarrollado utilizando un stack moderno, robusto y altamente escalable:

*   **Frontend:** React / Next.js
*   **Backend:** Node.js / Express
*   **Base de Datos:** MongoDB (NoSQL)
*   **Documentación de API:** Swagger (Especificación OpenAPI)
*   **Pruebas de Endpoints:** Postman
*   **Seguridad y Autenticación:** JSON Web Tokens (JWT) & CORS

---

## 🧪 Estrategia de Testing & Calidad

Para garantizar la estabilidad del sistema y mitigar bloqueos en el flujo crítico de turnos, se implementó una estrategia de pruebas piramidal:

*   **Tests Unitarios:** Cobertura exhaustiva de las funciones críticas y la lógica de negocio individual.
*   **Test de Integración (1):** Validación del correcto flujo y comunicación entre los diferentes componentes y la base de datos.
*   **Test End-to-End / E2E (1):** Simulación completa del recorrido del usuario desde el frontend hasta la persistencia final de los datos.

---

## 🚀 Despliegue (Deployment)

La aplicación se encuentra productiva en **Render**, estructurada de forma desacoplada en dos servicios independientes:

1.  **Frontend Service:** Aloja la interfaz de usuario optimizada para la interacción del cliente.
2.  **Backend Service:** Gestiona la lógica de negocio, las conexiones a la base de datos y la exposición de la API REST.

---

## 🔒 Seguridad e Integridad

Para proteger el intercambio de información y asegurar las operaciones de la plataforma, se implementaron las siguientes prácticas:

*   **Autenticación con JWT:** Manejo de sesiones de usuarios mediante tokens firmados para proteger las rutas privadas del sistema.
*   **Persistencia Local:** Almacenamiento seguro del token en el cliente utilizando `localStorage` para mantener el estado de la sesión activa de forma eficiente.
*   **Manejo de CORS:** Configuración de políticas de intercambio de recursos de origen cruzado para restringir y controlar qué dominios externos pueden consumir los servicios de nuestra API.
