const api = '/api/tasks';

// Insertar una fila en la tabla
function pintaFila(t) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${t.id}</td>
        <td>${t.title}</td>
        <td>${t.priority}</td>
        <td>${t.status}</td>`;
    document.querySelector('#tabla tbody').appendChild(fila);
}

// Cargar lista al entrar o recargar la página
async function cargaTareas() {
    const res  = await fetch(api);
    console.log(res);
    const data = await res.json();
    console.log(data);
    data.forEach(pintaFila);
}

// Manejar el submit del formulario
document.getElementById('NuevaTarea').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo   = document.getElementById('titulo').value;
    const prioridad= document.getElementById('priority').value;

    const res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titulo, priority: prioridad })
    });

    if (res.ok) {
        const nueva = await res.json();
        pintaFila(nueva);
        e.target.reset();
    } else {
        alert('Error al crear tarea');
    }
 });

// Arranque inicial
cargaTareas();


