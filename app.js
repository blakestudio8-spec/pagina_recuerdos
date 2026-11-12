// 1. Esperamos a que la página cargue del todo
document.addEventListener('DOMContentLoaded', () => {
    // Dibujamos los iconos de Lucide
    lucide.createIcons();
    
    // Cargamos las fotos iniciales de prueba en el muro
    cargarPublicaciones();
});

// 2. Datos de prueba (Simulación de la base de datos)
const publicacionesPrueba = [
    {
        id: 1,
        autor: "Carlos",
        grupo: "Los Chavales ⚽",
        imagen: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600",
        descripcion: "Pachanga de los viernes ⚽🔥",
        fecha: "Hace 2 horas"
    },
    {
        id: 2,
        autor: "Elena",
        grupo: "Viaje Portugal ✈️️",
        imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        descripcion: "Atardecer en la playa 🌅",
        fecha: "Ayer"
    }
];
// 3. Función para cambiar entre pestañas (Muro, Grupos, Recap)
function cambiarVista(nombreVista, botonPulsado) {
    // A. Ocultamos todas las secciones/vistas
    const vistas = document.querySelectorAll('.view');
    vistas.forEach(vista => vista.classList.remove('active'));

    // B. Mostramos únicamente la vista seleccionada
    const vistaSeleccionada = document.getElementById(`view-${nombreVista}`);
    if (vistaSeleccionada) {
        vistaSeleccionada.classList.add('active');
    }

    // C. Cambiamos el color activo en los botones de abajo
    const botonesNav = document.querySelectorAll('.nav-item');
    botonesNav.forEach(btn => btn.classList.remove('active'));

    // Si pulsamos un botón normal de navegación (no el botón "+" de subir)
    if (botonPulsado && !botonPulsado.classList.contains('add-btn')) {
        botonPulsado.classList.add('active');
    }
}

// 4. Función para dibujar las publicaciones/fotos en la pantalla
function cargarPublicaciones() {
    const contenedor = document.getElementById('posts-container');
    if (!contenedor) return;

    // Limpiamos el contenedor por si había algo antes
    contenedor.innerHTML = '';

    // Recorremos la lista de fotos y creamos una tarjeta para cada una
    publicacionesPrueba.forEach(post => {
        const tarjetaHtml = `
            <div class="card">
                <img src="${post.imagen}" alt="${post.descripcion}">
                <div class="card-body">
                    <div class="card-title">${post.descripcion}</div>
                    <div class="card-subtitle">
                        Subido por <strong>${post.autor}</strong> en <span>${post.grupo}</span> • ${post.fecha}
                    </div>
                </div>
            </div>
        `;
        // Insertamos la tarjeta creada dentro del contenedor
        contenedor.innerHTML += tarjetaHtml;
    });
}
// ==========================================
// 5. CONTROL DE MODALES (SUBIR FOTO Y GRUPOS)
// ==========================================

// Abrir modal para Subir Recuerdo (Fotos)
function abrirModalSubir() {
    const modal = document.getElementById('modal-subir');
    if (modal) {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
    }
}

// Abrir modal para Crear o Unirse a un Grupo
function mostrarModalGrupo(tipo) {
    const modal = document.getElementById('modal-grupo');
    const titulo = modal ? modal.querySelector('h3') : null;
    const campoTexto = modal ? modal.querySelector('input[type="text"]') : null;
    const grupoMode = document.getElementById('grupo-mode');

    if (modal && titulo && campoTexto) {
        if (tipo === 'crear') {
            titulo.textContent = 'Crear un nuevo grupo';
            campoTexto.placeholder = 'Nombre del grupo (ej: Los Chavales ⚽)';
            if (grupoMode) grupoMode.value = 'crear';
        } else {
            titulo.textContent = 'Unirse a un grupo';
            campoTexto.placeholder = 'Código de invitación (ej: CHAVALES-2026)';
            if (grupoMode) grupoMode.value = 'unirse';
        }
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
    }
}

// Cerrar cualquier modal al pulsar "Cancelar"
document.addEventListener('click', (evento) => {
    const botonCerrar = evento.target.closest('[data-close-modal]');
    if (botonCerrar) {
        const tipoModal = botonCerrar.getAttribute('data-close-modal');
        const modal = document.getElementById(`modal-${tipoModal}`);
        if (modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
        }
    }
});

function iniciarRecap() {
    const estado = document.getElementById('recap-status');
    if (estado) {
        estado.textContent = '▶ Reproduciendo Recap... ¡Cargando historias del grupo!';
        estado.style.color = 'var(--accent)';
    }

    // Simulamos la reproducción
    setTimeout(() => {
        if (estado) {
            estado.textContent = '✨ ¡Has revivido todos tus recuerdos de este mes!';
            estado.style.color = 'var(--text-primary)';
        }
    }, 3000);
}


const btnPrivacidad = document.getElementById('btn-privacidad');
if (btnPrivacidad) {
    btnPrivacidad.addEventListener('click', () => {
        alert(
            "🔒 POLÍTICA DE PRIVACIDAD Y FOTOS EN GRUPO\n\n" +
            "1. Tus fotos solo son visibles para los miembros de tu grupo.\n" +
            "2. No compartimos ni vendemos tus imágenes a terceros.\n" +
            "3. Puedes borrar tus publicaciones en cualquier momento.\n\n" +
            "Recuerda subir solo fotos con el consentimiento de tus amigos."
        );
    });
}
// ==========================================
// 1. ESTADO Y DATOS (Arriba del todo)
// ==========================================
// Carga los grupos desde localStorage o inicializa una lista vacía
let misGrupos = JSON.parse(localStorage.getItem('grupos')) || [];
let misRecuerdos = JSON.parse(localStorage.getItem('recuerdos')) || [];


// ==========================================
// 2. FUNCIONES DE LOS GRUPOS
// ==========================================

// Rellena el desplegable del formulario de recuerdos
function cargarOpcionesDeGrupos() {
  const selectGrupo = document.getElementById('select-grupo-recuerdo');
  
  if (!selectGrupo) return; // Control por si no existe en el DOM aún
  
  selectGrupo.innerHTML = ''; // Limpia las opciones anteriores

  if (misGrupos.length === 0) {
    const option = document.createElement('option');
    option.value = "";
    option.textContent = "No tienes grupos (Crea uno primero)";
    option.disabled = true;
    option.selected = true;
    selectGrupo.appendChild(option);
  } else {
    misGrupos.forEach(grupo => {
      const option = document.createElement('option');
      option.value = grupo.id;
      option.textContent = grupo.nombre;
      selectGrupo.appendChild(option);
    });
  }
}

// Guarda un grupo nuevo creado por el usuario
function crearNuevoGrupo(nombreGrupo) {
  const nuevoGrupo = {
    id: Date.now().toString(),
    nombre: nombreGrupo
  };

  misGrupos.push(nuevoGrupo);
  localStorage.setItem('grupos', JSON.stringify(misGrupos));
  
  // Actualiza la lista desplegable inmediatamente
  cargarOpcionesDeGrupos();
}


// ==========================================
// 3. EVENTOS Y FORMULARIOS (Abajo del todo)
// ==========================================

// Se ejecuta cuando todo el HTML ha cargado en la página
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Cargar las opciones del desplegable al iniciar
  cargarOpcionesDeGrupos();

  // 2. Capturar cuando el usuario guarda un nuevo recuerdo
  const formRecuerdo = document.getElementById('form-nuevo-recuerdo');
  if (formRecuerdo) {
    formRecuerdo.addEventListener('submit', (e) => {
      e.preventDefault();

      const tituloInput = document.getElementById('input-titulo');
      const selectGrupo = document.getElementById('select-grupo-recuerdo');

      if (!selectGrupo.value) {
        alert('Debes seleccionar o crear un grupo primero.');
        return;
      }

      const nuevoRecuerdo = {
        id: Date.now().toString(),
        titulo: tituloInput.value,
        grupoId: selectGrupo.value
      };

      misRecuerdos.push(nuevoRecuerdo);
      localStorage.setItem('recuerdos', JSON.stringify(misRecuerdos));

      // Limpia el formulario y avisa
      formRecuerdo.reset();
      alert('Recuerdo guardado con éxito');
    });
  }
});
// ==========================================================
// CÓDIGO AÑADIDO: LÓGICA DE RECAP ALEATORIO DE FIN DE MES
// ==========================================================

// Estado global de la reproducción
let recapState = {
  lista: [],
  indice: 0,
  temporizador: null,
  segundosPorSlide: 4
};

// 1. Algoritmo Fisher-Yates para desordenar aleatoriamente
function mezclarFisherYates(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// 2. Filtrar fotos y vídeos del mes (mes actual o mes anterior)
function obtenerRecuerdosDelMes() {
  // Unificamos las publicaciones de prueba y las que suba el usuario
  const todos = [
    ...(typeof publicacionesPrueba !== 'undefined' ? publicacionesPrueba : []),
    ...(typeof misRecuerdos !== 'undefined' ? misRecuerdos : [])
  ];

  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();

  // Filtramos por fecha (si no tienen fecha ISO válida, los incluimos para no perder fotos)
  const recuerdosMes = todos.filter(item => {
    if (!item.fecha) return true;
    const fechaItem = new Date(item.fecha);
    if (isNaN(fechaItem.getTime())) return true; // Si es texto tipo "Ayer" o "Hace 2 horas"
    return fechaItem.getMonth() === mesActual && fechaItem.getFullYear() === anioActual;
  });

  return recuerdosMes.length > 0 ? recuerdosMes : todos;
}

// 3. Sobrescribimos iniciarRecap() para lanzar la recopilación real
function iniciarRecap() {
  const recuerdos = obtenerRecuerdosDelMes();

  if (!recuerdos || recuerdos.length === 0) {
    alert('No hay recuerdos para recopilar este mes.');
    return;
  }

  // Mezclamos aleatoriamente con Fisher-Yates
  recapState.lista = mezclarFisherYates(recuerdos);
  recapState.indice = 0;

  // Creamos el visor en pantalla si aún no existe en el HTML
  asegurarModalRecap();

  // Abrimos el visor y empezamos la reproducción
  document.getElementById('modal-recap-player').classList.remove('hidden');
  mostrarSlideRecap();
}

// 4. Mostrar la diapositiva actual y avanzar tras 4 segundos
function mostrarSlideRecap() {
  clearTimeout(recapState.temporizador);

  const idx = recapState.indice;
  const item = recapState.lista[idx];
  const total = recapState.lista.length;

  const contMedia = document.getElementById('recap-media-content');
  const txtInfo = document.getElementById('recap-info-content');
  const txtContador = document.getElementById('recap-contador');

  if (txtContador) txtContador.textContent = `${idx + 1} / ${total}`;
  if (txtInfo) {
    const autor = item.autor || 'Tú';
    const grupo = item.grupo || '';
    const desc = item.descripcion || item.titulo || '';
    txtInfo.innerHTML = `<strong>${autor}</strong> ${grupo ? `en <span>${grupo}</span>` : ''}<p>${desc}</p>`;
  }

  // Comprobar si es vídeo o foto
  const urlMedia = item.imagen || item.url;
  const esVideo = item.tipo === 'video' || (urlMedia && urlMedia.match(/\.(mp4|webm|ogg)$/i));

  if (contMedia) {
    if (esVideo) {
      contMedia.innerHTML = `<video src="${urlMedia}" autoplay playsinline style="width:100%; height:100%; object-fit:contain;"></video>`;
    } else {
      contMedia.innerHTML = `<img src="${urlMedia}" alt="Recuerdo" style="width:100%; height:100%; object-fit:contain;">`;
    }
  }

  // Programa el avance automático en 4 segundos
  recapState.temporizador = setTimeout(() => {
    recapSiguiente();
  }, recapState.segundosPorSlide * 1000);
}

// 5. Controles de diapositiva
function recapSiguiente() {
  if (recapState.indice < recapState.lista.length - 1) {
    recapState.indice++;
    mostrarSlideRecap();
  } else {
    cerrarRecap();
  }
}

function recapAnterior() {
  if (recapState.indice > 0) {
    recapState.indice--;
    mostrarSlideRecap();
  }
}

function cerrarRecap() {
  clearTimeout(recapState.temporizador);
  const modal = document.getElementById('modal-recap-player');
  if (modal) modal.classList.add('hidden');

  const estado = document.getElementById('recap-status');
  if (estado) {
    estado.textContent = '✨ ¡Has revivido tu recopilación del mes!';
    estado.style.color = 'var(--accent)';
  }
}

// 6. Crea la estructura visual del visor si no estaba en tu HTML
function asegurarModalRecap() {
  if (document.getElementById('modal-recap-player')) return;

  const modalHtml = `
    <div id="modal-recap-player" class="modal hidden" style="background: rgba(0,0,0,0.95); z-index: 9999;">
      <div style="position: relative; width: 100%; max-width: 450px; height: 85vh; display: flex; flex-direction: column; justify-content: space-between; background: #0a0f0d; border-radius: 16px; overflow: hidden; border: 1px solid var(--border);">
        <!-- Barra superior -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; z-index: 10;">
          <span id="recap-contador" style="color: var(--accent); font-weight: bold; font-size: 0.9rem;"></span>
          <button type="button" onclick="cerrarRecap()" style="background: transparent; border: none; color: white; font-size: 1.8rem; cursor: pointer; line-height: 1;">&times;</button>
        </div>

        <!-- Foto / Vídeo -->
        <div id="recap-media-content" style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;"></div>

        <!-- Zonas de clic táctil (Izquierda: retroceder, Derecha: avanzar) -->
        <div onclick="recapAnterior()" style="position: absolute; left: 0; top: 60px; bottom: 80px; width: 40%; cursor: pointer;"></div>
        <div onclick="recapSiguiente()" style="position: absolute; right: 0; top: 60px; bottom: 80px; width: 60%; cursor: pointer;"></div>

        <!-- Pie de foto -->
        <div id="recap-info-content" style="padding: 16px; background: rgba(0,0,0,0.7); color: white; font-size: 0.9rem; z-index: 10;"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}
// Añádelo al final de tu app.js:
const formGrupo = document.querySelector('#modal-grupo form');

if (formGrupo) {
  formGrupo.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Aquí dentro lees el nombre del grupo y lo guardas
  });
}