const carrito = document.getElementById("carrito");

const elementos1 = document.getElementById("lista-1");

const lista = document.querySelector("#lista-carrito tbody");

const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  elementos1.addEventListener("click", comprarElemento);

  carrito.addEventListener("click", eliminarElemento);

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const elemento = e.target.parentElement.parentElement;
    leerDatosElemento(elemento);
  }
}

function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector("img").src,
    titulo: elemento.querySelector("h3").textContent,
    precio: elemento.querySelector(".precio").textContent,
    id: elemento.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width=100 />
    
    </td>
    
    <td>
        ${elemento.titulo}
    </td>

    <td>
        ${elemento.precio}
    </td>

    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X </a>
    </td>
    
    `;

  lista.appendChild(row);
}

function eliminarElemento(e) {
  e.preventDefault();
  let elemento, elmentoId;
  if (e.target.classList.contains("borrar")) {
    e.target.parentElement.parentElement.remove();
    elemento = e.target.parentElement.parentElement;
    elementoId = elemento.querySelector("a").getAttribute("data-id");
  }
}

function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  return false;
}

// Función para validar el formulario
function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name.trim() === "") {
    alert("Por favor, ingrese su nombre.");
    return false;
  }

  if (email.trim() === "" || !isValidEmail(email)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return false;
  }

  if (message.trim() === "") {
    alert("Por favor, ingrese su mensaje.");
    return false;
  }

  // Si todos los campos son válidos, el formulario se envía
  return true;
}

// Función para validar una dirección de correo electrónico
function isValidEmail(email) {
  const emailPattern = /\S+@\S+\.\S+/;
  return emailPattern.test(email);
}

// Escuchar el evento de envío del formulario
const form = document.getElementById("contact-form");
form.addEventListener("submit", function (e) {
  if (!validateForm()) {
    e.preventDefault(); // Evitar el envío del formulario si no es válido
  }
});
