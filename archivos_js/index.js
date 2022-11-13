const div = document.getElementById("div");
const carritoIcon = document.getElementById("carritoIcon");
const carritoTabla = document.getElementById("carritoTabla");
const tablaCarrito = document.getElementById("tablaCarrito");
const carritoCompras = document.getElementById("carrito");
const vacio = document.getElementById("vacio");
const finalizar = document.getElementById("finalizarCompra");
const finalizarTabla = document.getElementById("tablaFinalBody");
const tablaFinal = document.getElementById("tablaFinal");

//FETCH
const traerProductos = async () => {
  const response = await fetch("./db/productos.json");
  const data = await response.json();
  return data;
};

const tipoMonedas = await traerProductos();

//---CARRITO---//
let carrito = [];
if (div !== null) {
  /*    const { imagen, nombre, precio, id } = producto */
  tipoMonedas.forEach((producto) => {
    let monedaRenderizada = document.createElement("div");
    monedaRenderizada.innerHTML = `         
             <div class="card" style="width: 14rem;">
                     <img src="${producto.imagen}" class="card-img-top" alt="...">
                     <div class="card-body">
                         <h5 class="card-title">${producto.nombre}</h5>
                          <p class="card-text">Precio $: ${producto.precio}</p>
                             <div>
                                 <button class="btn btn-success" id= "${producto.id}">Comprar</button>  
                             </div> 
                     </div>
              </div> 
     `;
    div.append(monedaRenderizada);
    const boton = document.getElementById(producto.id);
    boton.addEventListener("click", () => comprarProducto(producto));
  });
}

//TOASTIFY
const comprarProducto = (producto) => {
  /*   const { imagen, precio, nombre, id } = producto */
  Toastify({
    destination: "https://github.com/apvarun/toastify-js",
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #000000, #3e3edf)",
    },
    text: `Se ha agregado 1 ${producto.nombre} al carrito`,
    duration: 1000,
  }).showToast();
  let productoComprado = carrito.find((item) => item.id === producto.id);
  if (productoComprado === undefined) {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    productoComprado.precio = productoComprado.precio + producto.precio;
    productoComprado.cantidad = productoComprado.cantidad + 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  dibujarcarrito();
};

const sumarProducto = (producto) => {
  let productoOriginal = tipoMonedas.find((item) => item.id === producto.id);
  let productoModificar = carrito.find((item) => item.id === producto.id);
  productoModificar.precio = productoModificar.precio + productoOriginal.precio;
  productoModificar.cantidad = productoModificar.cantidad + 1;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  dibujarcarrito();
};
const restarProducto = (producto) => {
  let productoOriginal = tipoMonedas.find((item) => item.id === producto.id);
  let productoABorrar = carrito.find((item) => item.id === producto.id);
  let indice = carrito.findIndex((item) => item.id === producto.id);
  productoABorrar.precio = productoABorrar.precio - productoOriginal.precio;
  productoABorrar.cantidad = productoABorrar.cantidad - 1;
  if (productoABorrar.cantidad < 1) {
    carrito.splice(indice, 1);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  dibujarcarrito();
};

//TABLA PARA EL MODAL
const dibujarcarrito = () => {
 carritoTabla.innerHTML = "";
  carrito.forEach((producto) => {
    /*       const { imagen, precio, cantidad, id, nombre } = producto */
    let monedaRenderizada = document.createElement("tr");
    monedaRenderizada.innerHTML = `    
        <td> <p class="cantidadProducto"> ${producto.cantidad}</p></td> 
        <td> <p class="nombreProducto"> ${producto.nombre}</p></td>    
        <td> <img class="fotoProductoCarrito" src="${producto.imagen}" alt="imagen producto"> </td>
        <td> <p class="precioProducto"> $${producto.precio}</p></td>
        <td> <button id="sumar${producto.id}" class="btn btn-success">+</button></td>
        <td> <button id="restar${producto.id}" class="btn btn-danger">-</button></td>
        `;
    carritoTabla.append(monedaRenderizada);
    const sumar = document.getElementById(`sumar${producto.id}`);
    sumar.addEventListener("click", () => sumarProducto(producto));
    const restar = document.getElementById(`restar${producto.id}`);
    restar.addEventListener("click", () => restarProducto(producto));
  });

  if (carrito.length < 0) {
    vacio.className = "on";
    tablaCarrito.className = "off";

  } else {
    tablaCarrito.className = "on";
    vacio.className = "off ";
  }
  
};

 const mostrarCarrito = () => {
  carritoCompras.classList.toggle("carritoOn");
  dibujarcarrito();
};

//////////////////////////////////////////////////
const revisarStorage = () => {
  carrito.length = 0
  const storage = JSON.parse(localStorage.getItem("carrito"))
  if (storage !== null) {
      carrito = storage
      /* console.log("carrito") */
  }
} 
///////////////////////////////////////////////


// SWIT ALERT
const finalizarCompra = () => {
  Swal.fire({
    title: "Finalizar Compra?",
    text: "Desea finalizar su compra?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo finalizar",
    cancelButtonText: "No, no deseo",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        localStorage.clear(),
        (vacio.className = "on"),
        (tablaCarrito.className = "off")
        ((carrito.length = 0))
      );
    }
  });
};

if (carritoCompras !== null) {
  finalizar.addEventListener("click", finalizarCompra);
  carritoIcon.addEventListener("click", mostrarCarrito);
}

//////////////////////////////////////////
revisarStorage();

/////////////////////////////////////////
