import { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sendend");
  const { setAuth } = useAuth();
  const loginUser = async (e) => {
    // Prevenir comportamient de formulario
    e.preventDefault();

    // Datos del formulario
    const userTologin = form;

    // Peticion al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userTologin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    // Mostrar mensajes dependiendo de la request
    if (data.status === "success") {
      // Persistir los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSaved("login");

      // Setear datos en el auth
      setAuth(data.user);

      // Redirreción
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>
      {saved == "login" ? (
        <strong className="alert alert-success">
          {" "}
          Usuario identificado correctamente
        </strong>
      ) : (
        ""
      )}
      {saved == "error" ? (
        <strong className="alert alert-danger">
          {" "}
          El usuario no se ha identificado correctamente
        </strong>
      ) : (
        ""
      )}
      <div className="content__posts">
        <form action="" className="form-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input
            type="submit"
            value="identificate"
            className="btn btn-success"
          />
        </form>
      </div>
    </>
  );
};
