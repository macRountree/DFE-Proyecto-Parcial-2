import { fetchApi } from '../config/fetch.js';
const result = await fetchApi.getAll();
console.log(result);

// !======================VARIABLES GLOBALEs
const tituloInput = document.querySelector('#titulo'); //titulo es titulo
const descripcionInput = document.querySelector('#descripcion'); //sintomas es descripcion
const completadoToggle = document.querySelector('#completado'); //Toggle
const tagSelect = document.querySelector('#tag');
const fechaInput = document.querySelector('#fecha');
const prioridadSelect = document.querySelector('#prioridad');

// ! ===================UI
const formulario = document.querySelector('#nueva-tarea'); //nueva cita = nueva tarea
const contenedorTarea = document.querySelector('#tareas');

let editando;
// !===============CLASES
class Tareas {
  async agregarTarea(tarea) {
    return await fetchApi.post(tarea);
  }
  async eliminarTarea(id) {
    limpiarTareas();
    await fetchApi.delete(id);
    // this.tareas = this.tareas.filter(tarea => tarea.id !== id);
  }
  async edTarea(id, tareaActual) {
    limpiarTareas();
    await fetchApi.put(id, tareaActual);
  }
}
class UI {
  imprimirAlerta(mensaje, tipo) {
    // creamos el div para mensaje
    const divMsg = document.createElement('DIV');
    divMsg.classList.add('text-center', 'alert', 'd-block', 'col-12');

    if (tipo === 'error') {
      divMsg.classList.add('alert-danger');
    } else {
      divMsg.classList.add('alert-success');
    }

    //
    divMsg.textContent = mensaje;
    // Agreegamos al DOM
    document
      .querySelector('#contenido')
      .insertBefore(divMsg, document.querySelector('.agregar-tarea'));
    // Agregamos sett

    setTimeout(() => {
      divMsg.remove();
    }, 5000);
  }
  //   Aplicamos destructuring desde el parentesis de los argumentso
  imprimirTareas(tareas) {
    tareas.forEach(tarea => {
      console.log(tarea);
      const { title, description, tag, dueDate, priority, completed, id } =
        tarea;
      const divTareas = document.createElement('DIV');
      divTareas.classList.add('tarea', 'p-3');
      divTareas.dataset.id = id;

      //   Scripting de los elementos
      const tituloParrafo = document.createElement('h3');
      tituloParrafo.classList.add('card-title', 'font-weight-bolder');
      tituloParrafo.textContent = title;

      const descripcionParrafo = document.createElement('h4');
      descripcionParrafo.innerHTML = ` <span class="font-weight-bolder"> Descripción: </span> ${description} `;
      const prioridadParrafo = document.createElement('h4');
      prioridadParrafo.innerHTML = ` <span class="font-weight-bolder">Prioridad: </span> ${priority} `;
      const CompletadoParrafo = document.createElement('h4');
      CompletadoParrafo.innerHTML = ` <span class="font-weight-bolder"> Completado: </span> ${
        completed ? 'Completada' : 'Pendiente'
      } `;
      const tagParrafo = document.createElement('h4');
      tagParrafo.innerHTML = ` <span class="font-weight-bolder">Tag: </span> ${tag} `;
      const fechaParrafo = document.createElement('h4');
      fechaParrafo.innerHTML = ` <span class="font-weight-bolder"> Fecha: </span> ${dueDate} `;
      // BtnEliminar =
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-outline-danger', 'mr-2');
      btnEliminar.setAttribute('data-id', id);
      btnEliminar.innerHTML =
        'Eliminar tarea  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg> ';
      btnEliminar.onclick = () => {
        eliminarTarea(id);
      };
      // añade btn para editar

      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn', 'btn-outline-info');
      btnEditar.setAttribute('data-id', id);

      btnEditar.innerHTML =
        'Editar Tarea <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>   ';
      btnEditar.onclick = () => {
        editarTarea(id);
      };
      // agregamos parrafos  al div tarea
      divTareas.appendChild(tituloParrafo);
      divTareas.appendChild(descripcionParrafo);
      divTareas.appendChild(prioridadParrafo);
      divTareas.appendChild(CompletadoParrafo);
      divTareas.appendChild(tagParrafo);
      divTareas.appendChild(fechaParrafo);
      divTareas.appendChild(btnEliminar);
      divTareas.appendChild(btnEditar);

      contenedorTarea.appendChild(divTareas);
    });
  }

  limpiarHTML() {
    while (contenedorTarea.firstChild) {
      contenedorTarea.removeChild(contenedorTarea.firstChild);
    }
  }
}
// !instancias
const ui = new UI();
const administrarTareas = new Tareas();

// !LLamar ui
ui.imprimirTareas(result);
// !===================LISTENERS
eventListeners();
function eventListeners() {
  tituloInput.addEventListener('input', datosTarea);
  descripcionInput.addEventListener('input', datosTarea);
  prioridadSelect.addEventListener('change', datosTarea);
  completadoToggle.addEventListener('change', checkedTarea);
  tagSelect.addEventListener('change', datosTarea);

  fechaInput.addEventListener('input', datosTarea);
  formulario.addEventListener('submit', nuevatarea);
}

// !===============ObjetoPrincipal
const tareaObjeto = {
  titulo: '',
  descripcion: '',
  prioridad: '',
  completado: false,
  tag: '',
  fecha: '',
};
// ! ==============Funciones
//

function datosTarea(e) {
  tareaObjeto[e.target.name] = e.target.value;
}
function checkedTarea(e) {
  tareaObjeto[e.target.name] = e.target.checked;
}

async function nuevatarea(e) {
  e.preventDefault();
  const { titulo, descripcion, tag, fecha, completado, prioridad } =
    tareaObjeto;

  console.log(tareaObjeto);
  let recibirId = '';
  if (
    titulo === '' ||
    descripcion === '' ||
    tag === '' ||
    prioridad === '' ||
    fecha === ''
  ) {
    ui.imprimirAlerta('Los campos son obligatorios', 'error');
    return;
  }
  if (editando) {
    ui.imprimirAlerta('Tarea agregada correctamente');
    recibirId = this.querySelector('button[type="submit"]').getAttribute(
      'data-id'
    );
    console.log(recibirId);
    await administrarTareas.edTarea(recibirId, {
      title: titulo,
      description: descripcion,
      completed: completado,
      priority: prioridad,
      tag: tag,
      dueDate: fecha,
    });
    formulario.querySelector('button[type="submit"]').textContent =
      'Añadir Tarea';
    editando = false;
  } else {
    const result = await administrarTareas.agregarTarea({
      title: titulo,
      description: descripcion,
      completed: completado,
      priority: prioridad,
      tag: tag,
      dueDate: fecha,
    });
    recibirId = result.id;
    ui.imprimirAlerta('Tarea agregado correctamente');
  }

  reiniciarObjeto();
  formulario.reset();

  ui.imprimirTareas([
    {
      title: titulo,
      description: descripcion,
      completed: completado,
      priority: prioridad,
      tag: tag,
      dueDate: fecha,
      id: recibirId,
    },
  ]);
}

function reiniciarObjeto() {
  tareaObjeto.titulo = '';
  tareaObjeto.descripcion = '';
  tareaObjeto.prioridad = '';
  tareaObjeto.completado = false;
  tareaObjeto.tag = '';
  tareaObjeto.fecha = '';
}

async function eliminarTarea(id) {
  // administrarTareas.eliminarTarea(id);

  console.log(id);
  await administrarTareas.eliminarTarea(id);
  const resultado = await fetchApi.getAll();
  ui.imprimirAlerta('La tarea se eliminó correctamente');
  ui.imprimirTareas(resultado);
}

async function editarTarea(tarea) {
  const recibir = await fetchApi.getById(tarea);
  console.log(recibir);
  const { title, description, priority, dueDate, tag, completed } = recibir;
  const traerToggle = document.getElementsByClassName('toggle')[0];

  if (completed) {
    traerToggle.className = 'toggle btn btn-success';
  } else {
    traerToggle.className = 'toggle btn btn-danger off';
  }

  tituloInput.value = title;
  descripcionInput.value = description;
  prioridadSelect.value = priority;
  completadoToggle.checked = completed;
  fechaInput.value = dueDate;
  tagSelect.value = tag;
  // llenamos el objeto
  tareaObjeto.titulo = title;
  tareaObjeto.descripcion = description;
  tareaObjeto.prioridad = priority;
  tareaObjeto.completado = completed;
  tareaObjeto.fecha = dueDate;
  tareaObjeto.tag = tag;

  // Cambiar boton
  formulario.querySelector('button[type="submit"]').textContent =
    'Editar Tarea';
  formulario
    .querySelector('button[type="submit"]')
    .setAttribute('data-id', recibir.id);
  editando = true;
}

function limpiarTareas() {
  const tareas = document.getElementById('tareas');
  tareas.innerHTML = '';
}
