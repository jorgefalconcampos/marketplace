// import { consultarLocalStorage } from "./main.js";

function consultarLocalStorage(clave) {
  if (localStorage.getItem(clave) === null) {
    return false;
  } else {
    return localStorage.getItem(clave);
  }
}

function guardarLocalStorage(clave, valor) {
  if (localStorage.getItem(clave) === null && clave != "cart") {
    // no existe en localStorage, entonces lo creamos
    localStorage.setItem(clave, 1);

  } else {
    // si ya existe en localStorage, lo actualizamos
    localStorage.setItem(clave, valor);
  }
}



function consultarNumDeArticulos() {
  const num_articulos = consultarLocalStorage("items_en_carro");
  
  if (num_articulos) {
    let titulo = "";
    parseInt(num_articulos) < 2 
      ? titulo = `Tienes ${num_articulos} artículo en tu carrito` 
      : titulo = `Tienes ${num_articulos} artículos en tu carrito`;
    document.getElementById("carrito_titulo").innerHTML = titulo;
  }
  else {

    document.getElementById("accordion_products").remove()
    document.getElementById("carrito_titulo").innerHTML = "Aún no tienes artículos en tu carrito";
  }
};

function cargarArticulos() {

  let arts = JSON.parse(consultarLocalStorage("cart"));
  let placeholder = document.getElementById("articulos_placeholder");


  for (let i=0; i<arts.articulos.length; i++) {
    let articulo = arts.articulos[i];
    placeholder.innerHTML += `
      <div class="py-3 accordion" id="accordion_products_${i+1}">
      <div class="accordion-item">
        <div class="row">
          <h2 class="col-10" id="heading_${i+1}">
            <button 
              id="producto_${i+1}_accordion_title"
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse_${i+1}"
              aria-expanded="true"
              aria-controls="collapse_${i+1}"
              >
              Artículo #${i+1}: ${articulo.nombre}             
            </button>
          </h2>
          <div class="col-2 pt-3 lead">
            Total: $${articulo.precio*articulo.cantidad} ${articulo.divisa}
          </div>
        </div>
        
        <div
          id="collapse_${i+1}"
          class="accordion-collapse collapse show"
          aria-labelledby="heading_${i+1}"
          data-bs-parent="#accordionExample"
        >
        <div id="producto_${i+1}_accordion_body" class="accordion-body">
          <div class="row border border-dark p-3">
            <div class="col-10">
              <p>${articulo.detalle} | ${articulo.medidas}</p>
              <p class="h4">$${articulo.precio} <b>(x${articulo.cantidad})</b></p>
            </div>
            <div class="col-2 text-center">
             
              <button data-id="${i}" data-name="${articulo.nombre}"  title="Quitar ${articulo.nombre} del carrito" type="button" id="quitar_art_${i+1}" class="btn btn-outline-danger">
                <i class="fas fa-solid fa-trash fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    `;
  }

  placeholder.innerHTML += `
  <div class="row text-center">
  <div class="col">
    <button
    type="button"
    id="btn_comprar_todo"
    class="text-uppercase mt-3 btn btn-success btn-lg"
    >
    comprar todo
  </button>
</div>
</div>
  `


  const botones_eliminar = document.querySelectorAll(`[id^="quitar_art_"]`);

  // para cada uno de los botones, agregamos el eventListener "click"
  botones_eliminar.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id_articulo = document.getElementById(btn.id).getAttribute("data-id");
      let nombre_articulo = document.getElementById(btn.id).getAttribute("data-name");
      borrarArticulo(id_articulo, nombre_articulo); 
    });
  });

  const boton_comprar = document.getElementById("btn_comprar_todo");

  boton_comprar.addEventListener("click", () => {
    Swal.fire(
      'Artículos comprados',
      'Los artículos se han preparado para el envío.',
      'success'
    )
  });





}



// borra todos los artículos del mismo tipo del carrito
function borrarArticulo(id, nombre) {
  Swal.fire({
    icon: "question",
    title: `¿Realmente deseas borrar tu ${nombre} del carrito?`,
    text: "El producto está se quitará en su totalidad de tu carrito, incluso si lo has agregado más de una vez. ",
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'El artículo ha sido quitado del carrito.',
        'success'
      )
      // actualizamos localStorage, UI y los items en carrito
      let arts = JSON.parse(consultarLocalStorage("cart"));
      // console.log(arts.articulos[id]);

      let qtty = arts.articulos[id].cantidad;
      let items_en_carrito = parseInt(consultarLocalStorage("items_en_carro"));
      items_en_carrito != false
      ? guardarLocalStorage("items_en_carro", items_en_carrito - qtty)
      : alert("Este item no está en tu carrito");

      arts.articulos.pop(id)

      guardarLocalStorage("cart", JSON.stringify(arts));
      document.location.reload()
    }
  });

}







// if (localStorage.length === 0) {
//   document.getElementById("carrito_titulo").innerHTML = "Aún no tienes artículos en tu carrito";
// }
// else {
//   document.getElementById("carrito_titulo").innerHTML = `Hay 1 artículo en tu carrito`;
//   const art = JSON.parse(localStorage.getItem("articulo"));

//   document.getElementById("producto_accordion_title").innerHTML = "Artículo #1"
//   console.log(art.descripcion)
//   document.getElementById("producto_accordion-body").innerHTML = `${art.detalle} ($${art.precio} ${art.divisa})` 


// }


(function cargaInicial() {
  consultarNumDeArticulos();
  cargarArticulos();
}());