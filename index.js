// Esperar a que el DOM cargue completamente

document.addEventListener('DOMContentLoaded', function() {
    const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

    // Cargar los comentarios guardados en localStorage
    storedComentarios.forEach(comentario => agregarComentario(comentario.texto, comentario.fecha));
});

// Manejar el envío del formulario
document.getElementById('comentarioForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que la página se recargue

    const input = document.getElementById('comentarioInput');
    const comentarioTexto = input.value.trim();

    if (comentarioTexto === '') return; // Evitar comentarios vacíos

    const fecha = new Date().toLocaleString();
    
    // Agregar el comentario a la página y al almacenamiento local
    agregarComentario(comentarioTexto, fecha);
    
    const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    storedComentarios.push({ texto: comentarioTexto, fecha: fecha });
    localStorage.setItem('comentarios', JSON.stringify(storedComentarios));

    input.value = ''; // Limpiar el campo de entrada
});

// Función para agregar un comentario al DOM
function agregarComentario(texto, fecha) {
    const comentarioDiv = document.createElement('div');
    comentarioDiv.classList.add('comentario');
    comentarioDiv.innerHTML = `<p>${texto}</p><small>${fecha}</small> <button class="eliminar">Eliminar</button>`;

    document.getElementById('comentarios').appendChild(comentarioDiv);

    // Agregar evento para eliminar el comentario
    comentarioDiv.querySelector('.eliminar').addEventListener('click', function() {
        comentarioDiv.remove();
        eliminarDeLocalStorage(texto, fecha);
    });
}

// Función para eliminar un comentario del localStorage
function eliminarDeLocalStorage(texto, fecha) {
    let storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    storedComentarios = storedComentarios.filter(comentario => comentario.texto !== texto || comentario.fecha !== fecha);
    localStorage.setItem('comentarios', JSON.stringify(storedComentarios));
}