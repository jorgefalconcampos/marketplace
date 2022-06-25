// import { consultarLocalStorage } from "./main.js";

function consultarLocalStorage(clave) {
  if (localStorage.getItem(clave) === null) {
    return false;
  } else {
    return localStorage.getItem(clave);
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


    console.log(arts.articulos[i])

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
              <div class="row">
                <div class="input-group">
                  <button type="button" class="quantity-left-minus btn btn-danger btn-number"  data-type="minus" data-field="">
                    <span class="fas fa-solid fa-minus"></span>
                  </button>
                  
                  <input type="text" id="quantity" name="quantity" class="text-center form-control input-number" value="10" min="1" max="100">

                  <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field="">
                    <span class="fas fa-solid fa-plus"></span>
                  </button>
                </div>
              </div>
              <hr>
              <button type="button" id="" class="btn btn-outline-danger">
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



}



// borra todos los artículos del mismo tipo del carrito
function borrarTodosLosArticulos() {
  
  Swal.fire({
    icon: "question",
    title: "¿Realmente deseas borrar todos los artículos?",
    text: "El producto 'ss' se eliminará por ",
    // footer: 'cart>Ver carrito</a>',
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