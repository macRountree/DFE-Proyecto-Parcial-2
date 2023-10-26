import { fetchApi } from '../config/fetch';
// !======================VARIABLES GLOBALEs
const tituloInput = document.querySelector('#titulo'); //mascota es titulo
const descripcionInput = document.querySelector('#descripcion'); //sintomas es descripcion
const completadoToggle = document.querySelector('#completado'); //Toggle
const tagSelect = document.querySelector('#tag');
const fechaInput = document.querySelector('#fecha');
const prioridadSelect = document.querySelector('#prioridad');

// ! ===================UI
const formulario = document.querySelector('#nueva-tarea'); //nueva cita = nueva tarea
const contenedorCitas = document.querySelector('#tareas');

let editando;
// !===============CLASES

// !instancias
// !===================LISTENERS
// !===============ObjetoPrincipal
// ! ==============Funciones
//
