
import { consultarLocalStorage } from "./main.js";

(function consultarArticulos() {
  alert("1")
  const num_articulos = consultarLocalStorage("items_en_carro");
  
  if (num_articulos) {
    let titulo = "";
    parseInt(num_articulos) < 2 
      ? titulo = `Tienes ${num_articulos} artículo en tu carrito` 
      : titulo = `Tienes ${num_articulos} artículos en tu carrito`;
    document.getElementById("carrito_titulo").innerHTML = titulo;
    setearProductos();
  }
  else {

    document.getElementById("accordion_products").remove()
    document.getElementById("carrito_titulo").innerHTML = "Aún no tienes artículos en tu carrito";
  }
})();

function setearProductos() {


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