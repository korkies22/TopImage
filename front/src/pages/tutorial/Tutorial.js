/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./tutorial.scss";

const tutorialItems = [
  {
    title: "Regístrate",
    description:
      "Regístrate en academical reborn para estar al día con la oferta de eventos de la Universidad",
  },
  {
    title: "Crea un horario",
    description:
      "En el panel de horarios puedes crear todos los horarios que desees en caso de que busques distintas alternativas. Aquí también seleccionas cuál es el horario que estás manejando actualmente",
  },
  {
    title: "Busca",
    description:
      "Usa el campo de texto de búsqueda para filtrar eventos por su nombre, o mira la lista completa y entérate de lo que hay",
  },
  {
    title: "Preview",
    description:
      "Pon el mouse encima del evento y déjanos mostrarte cuando sucederá. Mira como cambia la semana actual arriba. Si tiene un fondo rojo significa que se cruza con otro que ya tienes agregado",
  },
  {
    title: "Añade eventos",
    description: "Haz click en el evento para añadirlo a tu horario",
  },
  {
    title: "Navega",
    description:
      "Usa la barra de navegación superior para observar tu horario semana a semana",
  },
  {
    title: "Elimina eventos",
    description:
      "¿Cambio de planes? No te preocupes. En tu calendario haz click en la X arriba a la derecha del evento que desees eliminar y este saldrá de tu calendario",
  },
];
function Tutorial(props) {
  return (
    <div className="tutorial">
      <h1 className="tutorial__title">Tutorial</h1>
      <button
        className="tutorial__button"
        onClick={() => props.history.push("/login")}
      >
        Ir a login
      </button>

      <div className="tutorial__list">
        {tutorialItems.map((item, index) => (
          <div className="tutorial__item" key={index}>
            <hr />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img
              src={require("../../assets/tuto/tuto" + (index + 1) + ".png")}
              alt="Tutorial step"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Tutorial.propTypes = {
  history: PropTypes.any,
};

export default withRouter(Tutorial);
