// const data = {
//     "articulo_1" : {
//         "id": 1,
//         "nombre": "Alebrije de león",
//         "detalle": "Alebrije con figura tallada de león",
//         "composición": "Madera",
//         "medidas": "24x19x90cm",
//         "precio": 390,
//         "divisa": "MXN",
//         "imagenes": [
//             "articulo1_leon_1.png",
//             "articulo1_leon_2.png",
//             "articulo1_leon_3.png",
//             "articulo1_leon_4.png"
//         ]
//     },
//     "articulo_2" : {
//         "nombre": "Alebrije de zorro",
//         "detalle": "Alebrije con figura tallada de zorro",
//         "composición": "Madera",
//         "medidas": "29x12x90cm",
//         "precio": 790,
//         "divisa": "MXN",
//         "imagenes": [
//           "articulo2_zorro_1.png",
//           "articulo2_zorro_2.png",
//           "articulo2_zorro_3.png",
//           "articulo2_zorro_4.png",
//         ]
//     }
// }

function consultarLocalStorage(clave) {
  if (localStorage.getItem(clave) === null) {
    return false;
  } else {
    return localStorage.getItem(clave);
  }
}

function guardarLocalStorage(clave, valor) {
  if (localStorage.getItem(clave) === null) {
    // no existe en localStorage, entonces lo creamos
    localStorage.setItem(clave, 1);
  } else {
    // si ya existe en localStorage, lo actualizamos
    localStorage.setItem(clave, valor);
  }
}

class Articulo {
  constructor(
    id,
    nombre,
    detalle,
    composicion,
    medidas,
    precio,
    divisa,
    imagenes,
    impuestos,
    cantidad
  ) {
    this.id = id;
    this.nombre = nombre;
    this.detalle = detalle;
    this.composicion = composicion;
    this.medidas = medidas;
    this.precio = precio;
    this.divisa = divisa;
    this.imagenes = imagenes;
    this.impuestos = impuestos;
    this.cantidad = cantidad;
  }

  // agregar(cantidad) {
  //     this.cantidad = cantidad;
  // }
}

class Carrito {
  constructor(articulos, tieneDescuento, descuento) {
    this.articulos = [];
    this.tieneDescuento = tieneDescuento;
    this.descuento = descuento;
  }

  agregarArticulo(articulo) {
    let yaExiste = carrito.articuloYaEnCarrito(articulo.id);

    if (yaExiste) {
      // si ya existe, solo habria que actualizar la cantidad
      for (let i = 0; i < this.articulos.length; i++) {
        if (this.articulos[i].id == articulo.id) {
          this.articulos[i].cantidad = this.articulos[i].cantidad + 1; // agregamos 1 en cantidad
        }
      }
      console.log(this.articulos);
    } else {
      this.articulos.push(articulo);
    }

    let items_en_carrito = parseInt(consultarLocalStorage("items_en_carro"));
    items_en_carrito != false
      ? guardarLocalStorage("items_en_carro", items_en_carrito + 1)
      : alert("Este item no está en tu carrito");

    this.actualizarContadorPreview();
  }

  articuloYaEnCarrito(id) {
    if (this.articulos.filter((item) => item.id == id).length > 0) {
      return true;
    }
  }

  quitarArticulo(id) {}

  calcularTotal() {}

  actualizarContadorPreview() {
    let cantidad = parseInt(consultarLocalStorage("items_en_carro"));
    let carro_icono = document.getElementById("icono_carrito");
    carro_icono.innerHTML = `&nbsp; <span id='articulos_carrito'>${cantidad}</span>&nbsp;`;
  }
}

const IVA = 16;
const carrito = new Carrito();

let articulos_disponibles = [];
let articulos = []; // articulos que el usuario agrega al carrito
let total = 0;
let terminar = false;

let placeholder = document.getElementById("elementos_placeholder");

fetch("./static/productos.json")
  .then((resp) => resp.json())
  // añadiendo productos al DOM dinámicamente
  .then((data) => {
    for (const key in data) {
      const contenido = data[key];
      const imagenes = contenido.imagenes;

      // agregando info del producto
      placeholder.innerHTML += `
          <div class="table-title">${contenido.nombre}</div>

          <div class="row table-head">
            <div class="column">Detalle</div>
            <div class="column">Composición</div>
            <div class="column">Medidas</div>
            <div class="column">Precio</div>
          </div>
          <div class="row">
            <div class="column">${contenido.detalle}</div>
            <div class="column">${contenido.composición}</div>
            <div class="column">${contenido.medidas}</div>
            <div class="column">${contenido.precio} ${contenido.divisa}</div>
          </div>
          
          <div class="row py-5">
            <h1 class="text-center mb-5">Imágenes</h1>
            <div class="row" id="placeholder_imagenes_${key}">
            </div>
            <div class="row text-center">
              <div class="col mt-5">
                <button
                  type="button"
                  id="btn_comprar_${contenido.id}"
                  data-id="${contenido.id}"
                  class="text-uppercase mt-3 btn btn-primary"
                >
                  comprar
                </button>
              </div>
            </div>
          </div>
          <hr><hr><hr>
      `;

      // agregando las imágenes
      for (let i = 0; i < imagenes.length; i++) {
        document.getElementById(`placeholder_imagenes_${key}`).innerHTML += `
          <div class="col-3">
              <img class="img-fluid" src="./static/img/${imagenes[i]}" alt="" />
          </div>
          `;
      }
    }
  })
  .then(() => {
    // creamos un array de elementos que empiecen con "btn_comprar"
    const botones_comprar = document.querySelectorAll(`[id^="btn_comprar"]`);

    // para cada uno de los botones, agregamos el eventListener "click"
    botones_comprar.forEach((btn) => {
      btn.addEventListener("click", () => {
        let id_articulo = document
          .getElementById(btn.id)
          .getAttribute("data-id");
        createOrUpdateCart(id_articulo, 1); // agregamos el ID del articulo al carrito
      });
    });

    // let btn = document.getElementById("btn_comprar");
    // btn.addEventListener("click", () => {
    //   let carro_icono = document.getElementById("icono_carrito");
    //   carro_icono.innerHTML = "&nbsp; <span id='articulos_carrito'>1</span>&nbsp;";

    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Muy buena elección!',
    //     text: 'Producto agregado al carrito!',
    //     footer: '<a href="/marketplace/cart.html">Ver carrito</a>'
    //   })
    //   localStorage.setItem("articulo", JSON.stringify(data.articulo_1));
    // });
  });

// retorna los datos del producto pasándole un ID
async function returnProductData(id) {
  return fetch("./static/productos.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (const item in data) {
        if (data[item].id == id) {
          return data[item];
        }
      }
    });
}

function createOrUpdateCart(id, cantidad) {
  let articulo;

  returnProductData(id).then((r) => {
    articulo = new Articulo(
      r.id,
      r.nombre,
      r.detalle,
      r.composicion,
      r.medidas,
      r.precio,
      r.divisa,
      r.imagenes,
      IVA / 100,
      cantidad
    );

    carrito.agregarArticulo(articulo);

    // console.log(articulo)
    console.log(carrito);
  });

  Swal.fire({
    icon: "success",
    title: "¡Muy buena elección!",
    text: "El producto ha sido agregado al carrito",
    footer: '<a href="/marketplace/cart.html">Ver carrito</a>',
  });
}

// articulos_disponibles.push(articulo_1, articulo_2);

// function preguntarCliente() {

//     const longitud = articulos_disponibles.length;

//     alert(`Actualmente, tenemos a la venta ${longitud} artículos especiales:`);

//     for (let item=0; item<longitud; item++){
//         alert(`Artículo ${item+1}: \n\n ${JSON.stringify(articulos_disponibles[item])}`);
//     }

//     let articulo = Number(prompt(`¿Qué artcículo de los ${longitud} deseas agregar?`));

//     switch(articulo) {
//         case 1:
//             articulos.push(articulo_1);
//             alert(`¡El ${articulo_1["nombre"]} es una buena elección!`);
//         break;

//         case 2:
//             articulos.push(articulo_2);
//             alert(`¡El ${articulo_2["nombre"]} es una buena elección!`);
//         break;

//         default:
//             alert("Al parecer no has agregado artículos a tu carrito o esta opción no está disponible...")
//         break;
//     }

//     const carrito = new Carrito(articulos, false, 0); // no crear un nuevo carrito, si no verificar si existe uno y agregarlo

//     alert("Tu carrito se ve así hasta ahora: ");

//     console.log(carrito)

//     for(let art=0; art<carrito["articulos"].length; art++){
//         alert(JSON.stringify(carrito["articulos"][art]));
//     }

//     total = 0; // solucionado "reiniciando" el total

//     for(let item=0; item<carrito["articulos"].length; item++){
//         total += carrito["articulos"][item].precio; // una vez reiniciado, se hace la suma
//     }

//     alert("Tu total es de: " + total)

//     terminar = JSON.parse(prompt("¿Deseas finalizar? (escribe 'false' sin comillas para agregar otro, o 'true' para finalizar)"));

// }

// let nombre = prompt("¡Hola! ¿Me puedes dar tu nombre?");
// alert(`Hola ${nombre}, estamos encantados de tenerte en nuestra tienda.`)

// while(terminar === false) {
//     preguntarCliente();
// }

// export { consultarLocalStorage }
