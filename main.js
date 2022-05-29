
const archivoJson = {
    "articulo_1" : {
        "id": 1,
        "nombre": "Alebrije de león",
        "detalle": "Alebrije con figura tallada de león",
        "composición": "Madera",
        "medidas": "24x19x90cm",
        "precio": 390,
        "divisa": "MXN",
        "imagenes": [
            "articulo1_leon_1.png",
            "articulo1_leon_2.png",
            "articulo1_leon_3.png",
            "articulo1_leon_4.png"
        ]
    },
    // "articulo_2" : {
    //     "nombre": "Alebrije de jaguar",
    //     "detalle": "Alebrije con figura tallada de jaguar",
    //     "composición": "Madera",
    //     "medidas": "29x12x90cm",
    //     "precio": 790,
    //     "divisa": "MXN",
    //     "imagenes": [
    //     ]
    // }
}


const IVA = 16;
let articulos_disponibles = [];
let articulos = []; // articulos que el usuario agrega al carrito
let total = 0;
let terminar = false;



let placeholder = document.getElementById("elementos_placeholder");


// añadiendo productos al DOM dinámicamente
for (const key in archivoJson) {
    const contenido = archivoJson[key];
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
                id="btn_comprar"
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
    for (let i=0; i<imagenes.length; i++) {
        document.getElementById(`placeholder_imagenes_${key}`).innerHTML += `
        <div class="col-3">
            <img class="img-fluid" src="./static/img/${imagenes[i]}" alt="" />
        </div>
        `;
    }
}






let btn = document.getElementById("btn_comprar");

btn.addEventListener("click", () => {
    let carro_icono = document.getElementById("icono_carrito");
    carro_icono.innerHTML = "&nbsp; <span id='articulos_carrito'>1</span>&nbsp;";
    alert("¡Producto agregado al carrito!");

    localStorage.setItem("articulo", JSON.stringify(archivoJson.articulo_1));




    


});

class Articulo {
    constructor(id, sku, nombre, precio, impuestos, descripcion) {
        this.id = id;
        this.sku = sku;
        this.nombre = nombre;
        this.precio = precio;
        this.impuestos = impuestos;
        this.descripcion = descripcion;
        // this.cantidad = 0;
    }

    agregar(cantidad) {
        this.cantidad = cantidad;
    }
}

class Carrito {
    constructor(articulos, tieneDescuento, descuento) {
        this.articulos = articulos;
        this.tieneDescuento = tieneDescuento;
        this.descuento = descuento;
    }
}

let articulo_1 = new Articulo(123, "P00JHDGNB132", "Alebrije de león", 100, IVA, "Alebrije de Oaxaca hecho a mano, tallado en madera  y pintado con finos detalles.")
let articulo_2 = new Articulo(487, "AP826MSNDGN2", "Alebrije de toro", 320, IVA, "Alebrije hecho a mano, tallado en madera  y pintado con colores brillantes.")

articulos_disponibles.push(articulo_1, articulo_2);















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


