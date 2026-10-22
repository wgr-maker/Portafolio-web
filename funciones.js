// Aquí guardé la ruta de cada práctica para cargarla en el iframe.
const practicas = {
  1: "practicas/practica-1.html",
  2: "practicas/practica-2/index.html",
  3: "practicas/practica-3/index.html",
  4: "practicas/practica-4/formulario.html",
  5: "practicas/practica-5/index.html",
  7: "practicas/practica-7/index.html"
};

// Con esta función muestro solamente el apartado que seleccioné en el menú.
function mostrarVista(nombre) {
  const destino = document.getElementById(nombre) ? nombre : "inicio";
  document.querySelectorAll(".vista").forEach(seccion => {
    const visible = seccion.id === destino;
    seccion.hidden = !visible;
    seccion.classList.toggle("activa", visible);
  });
  document.querySelectorAll(".navegacion a").forEach(enlace => {
    const activo = enlace.dataset.vista === destino;
    enlace.classList.toggle("activo", activo);
    if (activo) enlace.setAttribute("aria-current", "page");
    else enlace.removeAttribute("aria-current");
  });
  document.getElementById("navegacion").classList.remove("abierto");
  document.getElementById("menu-boton").setAttribute("aria-expanded", "false");
  window.scrollTo({top: 0, behavior: "smooth"});
}

// Aquí hice que el menú cambie de apartado sin abrir otra página.
document.querySelectorAll("[data-vista]").forEach(enlace => {
  enlace.addEventListener("click", () => mostrarVista(enlace.dataset.vista));
});
window.addEventListener("hashchange", () => mostrarVista(location.hash.slice(1)));
mostrarVista(location.hash.slice(1) || "inicio");

// Este botón abre o cierra el menú cuando utilizo mi página desde el celular.
document.getElementById("menu-boton").addEventListener("click", () => {
  const menu = document.getElementById("navegacion");
  const abierto = menu.classList.toggle("abierto");
  document.getElementById("menu-boton").setAttribute("aria-expanded", String(abierto));
});

// Al seleccionar una práctica cambio el archivo que aparece dentro del iframe.
document.querySelectorAll("[data-practica]").forEach(boton => {
  boton.addEventListener("click", () => {
    const numero = boton.dataset.practica;
    document.getElementById("visor").src = practicas[numero];
    document.getElementById("nombre-practica").textContent = "Práctica " + numero;
    document.getElementById("abrir-practica").href = practicas[numero];
    document.querySelectorAll("[data-practica]").forEach(item => {
      const seleccionado = item === boton;
      item.classList.toggle("seleccionado", seleccionado);
      item.setAttribute("aria-pressed", String(seleccionado));
    });
  });
});
