const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "AGREGAR AL CARRITO"
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar curso (cantidad)
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    });
};

// Funciones
function agregarCurso(e) {
    e.preventDefault(); // previene el comportamiento por default; en este caso evita que vaya a un id inexistente

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        console.log(leerDatosCurso(cursoSeleccionado));
    };
};

// Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.map(curso => { // Disminuye en 1 la cantidad para el curso seleccionado
            if (curso.id === cursoId) {
                curso.cantidad--
            };
            return curso
        });

        articulosCarrito = articulosCarrito.filter(curso => curso.cantidad !== 0) // Filtra por cantidad mayor a 0

        carritoHTML(); // Generamos de nuevo el HTML
    };
};

// Leer el contenido HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
    // console.log(curso.innerHTML)
    // console.log(curso.outerHTML)
    // console.log(curso)

    // Crea un objeto con la información del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // Revisa si un curso ya existe en el carrito
    let noExiste = true; // Suponemos que el curso no existe
    articulosCarrito = articulosCarrito.map(curso => {
        if (curso.id === infoCurso.id) {
            curso.cantidad += 1
            noExiste = false
        };
        return curso
    })

    if (noExiste) { // agregamos el artículo/curso si no existe
        // Agrega elementos al arreglo de articulosCarrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // console.log(articulosCarrito);
    
    carritoHTML();
};

// Muestra carrito de compras (articulosCarrito) en el HTML
function carritoHTML() {
    // limpiar HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr'); // para cada curso creamos un elemento tr (table row)
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" >
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenidoCarrito.appendChild(row);
    });
};


function limpiarHTML() {
    // Forma lenta
    // contenidoCarrito.innerHTML = ''

    while (contenidoCarrito.firstChild) {
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    };
};