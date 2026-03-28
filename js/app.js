// MANEJO DEL LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.onsubmit = (e) => {
        e.preventDefault(); // Bloquea el refresco de Java
        localStorage.setItem('sesion', 'ok'); // Guarda un "token" de mentira
        window.location.href = 'dashboard.html'; // Nos manda pal dashboard
    };
}

// CAMBIAR ENTRE PESTAÑAS (SPA)
function mostrarVista(id) {
    document.querySelectorAll('.vista').forEach(v => v.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// NUESTRA BASE DE DATOS EN ARRAYS
let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
let duenos = JSON.parse(localStorage.getItem('duenos')) || [];
let vets = JSON.parse(localStorage.getItem('vets')) || [];

//FUNCIÓN PARA PINTAR LAS TABLAS
function refrescarTablas() {
    // Para Mascotas
    pintar(mascotas, 'tabla-mascotas', ['nombre', 'edad', 'tipo', 'propietario']);
    // Para Dueños
    pintar(duenos, 'tabla-propietarios', ['nombre', 'telefono', 'direccion']);
    // Para Vets
    pintar(vets, 'tabla-veterinarios', ['nombre', 'especialidad', 'contacto']);
    
    // Guardamos en el disco para que no se borre al dar F5
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
    localStorage.setItem('duenos', JSON.stringify(duenos));
    localStorage.setItem('vets', JSON.stringify(vets));
}

function pintar(lista, idTabla, campos) {
    const tabla = document.getElementById(idTabla);
    if (!tabla) return;
    const temp = document.getElementById('tpl-fila').content;
    tabla.innerHTML = ''; // Limpiamos la tabla antes de re-dibujar

    lista.forEach((obj, index) => {
        const clone = temp.cloneNode(true);
        campos.forEach((c, i) => {
            clone.querySelector(`.col${i+1}`).textContent = obj[c];
        });

        // Botón borrar
        clone.querySelector('.eliminar').onclick = () => {
            lista.splice(index, 1);
            refrescarTablas();
        };
        // Botón editar
        clone.querySelector('.editar').onclick = () => alert('Editando a ' + obj.nombre);

        tabla.appendChild(clone);
    });
}

//CAPTURAR DATOS DE LOS FORMULARIOS
if (document.getElementById('form-mascota')) {
    refrescarTablas(); // Iniciamos las tablas al entrar

    document.getElementById('form-mascota').onsubmit = (e) => {
        e.preventDefault();
        mascotas.push({
            nombre: document.getElementById('m-nombre').value,
            edad: document.getElementById('m-edad').value,
            tipo: document.getElementById('m-tipo').value,
            propietario: document.getElementById('m-prop').value
        });
        e.target.reset(); refrescarTablas();
    };

    document.getElementById('form-propietario').onsubmit = (e) => {
        e.preventDefault();
        duenos.push({
            nombre: document.getElementById('p-nombre').value,
            telefono: document.getElementById('p-tel').value,
            direccion: document.getElementById('p-dir').value
        });
        e.target.reset(); refrescarTablas();
    };

    document.getElementById('form-veterinario').onsubmit = (e) => {
        e.preventDefault();
        vets.push({
            nombre: document.getElementById('v-nombre').value,
            especialidad: document.getElementById('v-esp').value,
            contacto: document.getElementById('v-contacto').value
        });
        e.target.reset(); refrescarTablas();
    };
}