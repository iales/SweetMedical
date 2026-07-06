import React from "react";
import { CircleLoader } from "react-spinners";

const Loader= ({ texto = "Cargando..." }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#fff"
    }}>
      <CircleLoader color="var(--color-acento)" size={80} />
      <p style={{
        marginTop: "1rem",
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "var(--color-acento)"
      }}>
        {texto}
      </p>
    </div>
  );
};

export default Loader;