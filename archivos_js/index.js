
const div = document.getElementById("div");
/* const botonMostrarCarrito = document.getElementById("botonMostrarCarrito"); */
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
const carritoIcon = document.getElementById("carritoIcon");
const carritoTabla = document.getElementById("carritoTabla");
const tablaCarrito = document.getElementById("tablaCarrito");
const carritoCompras = document.getElementById("carrito")
const vacio = document.getElementById("vacio")
const finalizar = document.getElementById("finalizarCompra")


const traerProductos = async () => {
    const response = await fetch('./db/productos.json')
    const data = await response.json()
    /*     console.log(data) */
    return data
}
const tipoMonedas = await traerProductos();

/* function nuevoProducto(id, nombre, precio, imagen){
    this.id = id,
    this.nombre = nombre,
    this.precio = precio,
    this.imagen = imagen,
    this.cantidad = 1
} */


//---CARRITO---//
const carrito = []
/* if (div !== null) { */
/*  const { imagen, nombre, precio, id } = producto */
tipoMonedas.forEach(producto => {
    let monedaRenderizada = document.createElement("div")
    monedaRenderizada.innerHTML = `         
             <div class="card" style="width: 18rem;">
                     <img src="${producto.imagen}" class="card-img-top" alt="...">
                     <div class="card-body">
                         <h5 class="card-title">${producto.nombre}</h5>
                          <p class="card-text">Precio $: ${producto.precio}</p>
                             <div>
                                 <button class="btn btn-primary" id= "${producto.id}">Comprar</button>  
                             </div> 
                     </div>
              </div> 
     `
    div.append(monedaRenderizada);
    const boton = document.getElementById(producto.id)
    boton.addEventListener("click", () => comprarProducto(producto))
})
/* } */

const revisarStorage = () => {
    carrito.length = 0
    const storage = JSON.parse(localStorage.getItem("carrito"))
    if (storage !== null) {
        const carrito = storage
    }
}

const comprarProducto = (producto) => {
    const { imagen, precio, nombre, id } = producto
    /*     Toastify({
            text: `Se agregó 1 ${producto.nombre} al carrito`,
            duration: 2000,
        }).showToast(); */
    let productoComprado = carrito.find(item => item.id === producto.id)
    if (productoComprado === undefined) {
        carrito.push({
            ...producto,
            cantidad: 1,
            /*  nombre: producto.nombre,
             precio: producto.precio,
             imagen: producto.imagen, */
        })
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    else {
        productoComprado.precio = productoComprado.precio + producto.precio;
        productoComprado.cantidad = productoComprado.cantidad + 1
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
   dibujarcarrito()
}

/* botonVaciarCarrito.addEventListener("click", () => {
    localStorage.clear();
    carrito.innerHTML = "";
    alert("productos borrados");
}) */
/* let moneda = prompt("Ingrese tipo de moneda a convertir a usd  (sólo monedas del mercosur)");
let cantidad = parseInt(prompt("Ingrese la cantidad que quiere convertir")); */

/* function conversion(moneda, cantidad) {
    switch (moneda) {
        case "ars":
            let totalArs = Math.round(cantidad / 280);
            return totalArs
            break;

        case "real":
            let totalReal = Math.round(cantidad * 0.19);
            return totalReal
            break;

        case "uyu":
            let totalUyu = Math.round(cantidad / 40.99);
            return totalUyu
            break;

        case "clp":
            let totalClp = Math.round(cantidad / 892.51);
            return totalClp
            break;

        case "bs":
            let totalBs = Math.round(cantidad / 6.92);
            return totalBs
            break;

        case "pyg":
            let totalPyg = Math.round(cantidad / 6093.65);
            return totalPyg
            break;
    }
}
while (moneda !== "ESC") {
    alert(`Ud está convirtiendo la cantidad de $ ${cantidad} ${moneda} y recibe la cantidad de  : 
    ${conversion(moneda, cantidad)} dolares`);
    moneda = prompt("Ingrese tipo de moneda a convertir a USD (solo monedas del mercosur)");
    if (moneda !== "ESC") {
        cantidad = parseInt(prompt("Ingrese la cantidad que quiere convertir"));
    } else {
        alert("Ud salio de la sección conversor de moneda")
    }
}

/* tipoMonedas.push(moneda1, moneda2, moneda3, moneda4, moneda5, moneda6); */

// -- filter: filtra todos los elementos que cumplan la condicion -- //
/* let monedaCotizada = prompt("Ingrese la moneda a consultar la cotizacion");
let filtrado = tipoMonedas.filter(item => item.name === monedaCotizada); */

//-- Recorre el array y se muestra si el ingreso cumple con la condicion -- //
/* filtrado.forEach((item) => {
    let mensaje = `El precio de la ${item.name} es de ${price.value} por dolar`;
    alert(mensaje);
})
 */

//NO FUNCIONA!!!
const sumarProducto = (producto) => {
    let productoOriginal = tipoMonedas.find(item => item.id === producto.id)
    let productoModificar = carrito.find(item => item.id === producto.id)
    productoModificar.precio = productoModificar.precio + productoOriginal.precio
    productoModificar.cantidad = productoModificar.cantidad + 1
    localStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarcarrito()
}
//NO FUNCIONA!!!
const restarProducto = (producto) => {
    let productoOriginal = tipoMonedas.find(item => item.id === producto.id)
    let productoABorrar = carrito.find(item => item.id === producto.id)
    let indice = carrito.findIndex(item => item.id === producto.id)
    productoABorrar.precio = productoABorrar.precio - productoOriginal.precio
    productoABorrar.cantidad = productoABorrar.cantidad - 1
    if (productoABorrar.cantidad < 1) {
        carrito.splice(indice, 1)
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarcarrito()
}


//tabla para el modal
const dibujarcarrito = () => {
    carritoTabla.innerHTML = ''
    carrito.forEach(producto => {
        /* const { imagen, precio, cantidad, id, nombre } = producto */
        let monedaRenderizada = document.createElement("tr")
        monedaRenderizada.innerHTML =
            `         
        <td> <img class="fotoProductoCarrito" src="${producto.imagen}" alt="imagen producto"> </td>
        <td> <p class="nombreProducto"> ${producto.nombre}</p></td>
        <td> <p class="cantidadProducto"> ${producto.cantidad}</p></td>
        <td> <p class="precioProducto"> $${producto.precio}</p></td>
        <td> <button id="sumar ${producto.id}"class="btn btn-success">+</button></td>
        <td> <button id="restar${producto.id}"class="btn btn-danger">-</button></td>
    `
        carritoTabla.append(monedaRenderizada);
        const sumar = document.getElementById(`sumar${producto.id}`)
        sumar.addEventListener("click", () => sumarProducto(producto))
        const restar = document.getElementById(`restar${producto.id}`)
        restar.addEventListener("click", () => restarProducto(producto))

    })
    if(carrito.length < 1){
        vacio.localName = "on"
        tablaCarrito.className = "off"
    } else {
        tablaCarrito.className = "on"
        vacio.localName = "off "
    }
}

const mostrarCarrito = () => {
    carritoCompras.classList.toggle("carritoOn")
    dibujarcarrito()
}

const finalizarCompra = () => {
   /*  Swal.fire({
        title: 'Desea finalizar compra?',
        text: "Finalizar compra!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      }) */

}
finalizar.addEventListener("click", finalizarCompra)
//---- BOTON PARA MOSTRAR CARRITO ---- //
carritoIcon.addEventListener("click", mostrarCarrito /* () => localStorage.setItem("carrito", JSON.stringify(carrito)) */);

revisarStorage()
