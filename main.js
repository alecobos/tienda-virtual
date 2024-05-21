const url = "./datos.json"
//funciona sin json
//const productos = JSON.parse(localStorage.getItem("productos")) || []
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

//funciona bien probar ahora con json
// const renderizarProductos = (arrayUtilizado)=>{
//     const contenedorProductos = document.getElementById("contenedorProductos")
//     contenedorProductos.innerHTML = ""
//     arrayUtilizado.forEach(({id, nombre, tipo, precio, stock, descripcion})=>{
//         const prodCard = document.createElement("div")
//         prodCard.classList.add("col-xs")
//         prodCard.classList.add("card")
//         prodCard.classList.add("productos")
//         prodCard.id = id
//         prodCard.innerHTML = `
//                 <img src="./assets/${id}.png" class="card-img-top" alt="${nombre}">
//                 <div class="card-body">
//                     <h5 class="card-title espaciado">${nombre}</h5>
//                     <h6 class= "espaciado">${tipo}</h6>
//                     <p class="card-text espaciado">${descripcion}</p>
//                     <label class= "espaciado">$ ${precio}</label>
//                     <form id="form${id}">
//                         <label class= "espaciado" for="contador${id}">Cantidad</label>
//                         <input type="number" placeholder="0" id="contador${id}" min="0">
//                         <p></p>
//                         <button class="btn btn-primary" id="botonProd${id}">Agregar</button>
//                         <p class= "espaciado">Stock: ${stock}</p>
//                     </form>
//                 </div>`
//         contenedorProductos.appendChild(prodCard)
//         const btn = document.getElementById(`botonProd${id}`)
//         console.log(btn)
//         btn.addEventListener("click",(evento)=>{
//             evento.preventDefault()
//             const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
//             if(contadorQuantity>0){
//                 agregarCarrito({id, nombre, tipo, precio, stock, descripcion, cantidad:contadorQuantity})
//                 renderizarCarrito()
//                 const form = document.getElementById(`form${id}`)
//                 form.reset()
//             }
//         })
//     })
// }

//prueba de traer los objetos de json
fetch(url)
.then(res => res.json())
.then(data => renderizarProductos(data))

//funcion para poder visualizar los productos
const renderizarProductos = (articulos)=>{
    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""
    articulos.forEach(({id, nombre, tipo, precio, stock, descripcion, img})=>{
        const prodCard = document.createElement("div")
        prodCard.classList.add("col-xs")
        prodCard.classList.add("card")
        prodCard.classList.add("productos")
        prodCard.id = id
        prodCard.innerHTML = `
                <img src="${img}" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <h5 class="card-title espaciado">${nombre}</h5>
                    <h6 class= "espaciado">${tipo}</h6>
                    <p class="card-text espaciado">${descripcion}</p>
                    <label class= "espaciado">$ ${precio}</label>
                    <form id="form${id}">
                        <label class= "espaciado" for="contador${id}">Cantidad</label>
                        <input type="number" placeholder="0" id="contador${id}" min="0">
                        <p></p>
                        <button class="btn btn-primary" id="botonProd${id}">Agregar</button>
                        <p class= "espaciado">Stock: ${stock}</p>
                    </form>
                </div>`
        contenedorProductos.appendChild(prodCard)
        const btn = document.getElementById(`botonProd${id}`)
        console.log(btn)
        btn.addEventListener("click",(evento)=>{

            evento.preventDefault()
            const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
            if(contadorQuantity>0){
                Toastify({
                    text: "producto agregado al carrito",
                    duration: 2000
                    }).showToast();
                agregarCarrito({id, nombre, tipo, precio, stock, descripcion, cantidad:contadorQuantity})
                renderizarCarrito()
                const form = document.getElementById(`form${id}`)
                form.reset()
            }
        })
    })
}


// const renderizarProductos = (arrayUtilizado)=>{
//     const contenedorProductos = document.getElementById("contenedorProductos")
//     contenedorProductos.innerHTML = ""
//     arrayUtilizado.forEach(({id, nombre, tipo, precio, stock, descripcion, img})=>{
//         const prodCard = document.createElement("div")
//         prodCard.classList.add("col-xs")
//         prodCard.classList.add("card")
//         prodCard.classList.add("productos")
//         prodCard.id = id
//         prodCard.innerHTML = `
//                 <img src="${img}" class="card-img-top" alt="${nombre}">
//                 <div class="card-body">
//                     <h5 class="card-title espaciado">${nombre}</h5>
//                     <h6 class= "espaciado">${tipo}</h6>
//                     <p class="card-text espaciado">${descripcion}</p>
//                     <label class= "espaciado">$ ${precio}</label>
//                     <form id="form${id}">
//                         <label class= "espaciado" for="contador${id}">Cantidad</label>
//                         <input type="number" placeholder="0" id="contador${id}" min="0">
//                         <p></p>
//                         <button class="btn btn-primary" id="botonProd${id}">Agregar</button>
//                         <p class= "espaciado">Stock: ${stock}</p>
//                     </form>
//                 </div>`
//         contenedorProductos.appendChild(prodCard)
//         const btn = document.getElementById(`botonProd${id}`)
//         console.log(btn)
//         btn.addEventListener("click",(evento)=>{
//             evento.preventDefault()
//             const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
//             if(contadorQuantity>0){
//                 agregarCarrito({id, nombre, tipo, precio, stock, descripcion, cantidad:contadorQuantity})
//                 renderizarCarrito()
//                 const form = document.getElementById(`form${id}`)
//                 form.reset()
//             }
//         })
//     })
// }

const productosPreexistentes = ()=>{
    if (productos.length===0){
        productosBase.forEach(prod=>{
            let dato = JSON.parse(JSON.stringify(prod))
                agregarProducto(dato)}
            )
    }
}

const agregarProducto = ({id, nombre, tipo, precio, stock, descripcion})=>{
    if(productos.some(prod=>prod.id===id)){
        
    } else {
        const productoNuevo = new Producto(id, nombre, tipo, precio, stock, descripcion)
        productos.push(productoNuevo)
        //guarda el nuevo array de productos
        localStorage.setItem('productos', JSON.stringify(productos))
    }
}

const totalCarrito = ()=>{
    let total = carrito.reduce((acumulador, {precio, cantidad})=>{
        return acumulador + (precio*cantidad)
    }, 0)
    return total
}

const totalCarritoRender = ()=>{
    const carritoTotal = document.getElementById("carritoTotal")
    carritoTotal.innerHTML=`Precio total: $ ${totalCarrito()}`
    //console.log(totalCarrito())
}


const agregarCarrito = (objetoCarrito)=>{
    const verifica = carrito.some((elemento)=>{
        return elemento.id === objetoCarrito.id
    })
    //verificamos si el producto ya existia en el carrito, si existia suma la cantidad ya existente, si no existe lo agrega al pedido
    if (verifica){
        const indice = carrito.findIndex((elemento)=> elemento.id === objetoCarrito.id)
        carrito[indice].cantidad = parseInt(carrito[indice].cantidad) + parseInt(objetoCarrito.cantidad)
        //console.log(carrito[indice])
 
    } else{
        carrito.push(objetoCarrito)

    //console.log(carrito)
    }
    totalCarritoRender()
    //console.log(verifica)

}

const renderizarCarrito = ()=>{
    const listaCarrito = document.getElementById("listaCarrito")
    listaCarrito.innerHTML=""
    carrito.forEach(({nombre, precio, cantidad, id}) =>{
        let elementoLista = document.createElement("li")
        elementoLista.innerHTML=`${nombre} | P/u: ${precio} | Cant.: ${cantidad} <button id="eliminarCarrito${id}"> X </button>`
        listaCarrito.appendChild(elementoLista)
        const botonBorrar = document.getElementById(`eliminarCarrito${id}`)
        botonBorrar.addEventListener("click",()=>{
            // creo un array sin el elemento a borrar y lo igualo a carrito
            carrito = carrito.filter((elemento)=>{
                if(elemento.id !== id){
                    return elemento
                }
            })
            let carritoString = JSON.stringify(carrito)
            localStorage.setItem("carrito", carritoString)
            renderizarCarrito()
        })
        totalCarritoRender() //ver por que no se ejecuta cuando queda un solo elemento en el carrito
        let carritoString = JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoString)
    })
}


const borrarCarrito = ()=>{
    carrito.length = 0  //es una manera de borrar el contenido de un array constante
    let carritoString = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoString)
    renderizarCarrito()
}




const finalizarCompra = (event)=>{
    event.preventDefault()
    const data = new FormData(event.target)
    const cliente = Object.fromEntries(data)
    const ticket = {cliente: cliente, total:totalCarrito(),id:pedidos.length, productos:carrito}
    localStorage.setItem("pedidos", JSON.stringify(pedidos))
    borrarCarrito()
    let mensaje = document.getElementById("carritoTotal")
    mensaje.innerHTML = "Muchas gracias por su compra"

}


// DOM
const compraFinal = document.getElementById("formCompraFinal")
compraFinal.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(carrito.length>0){
        finalizarCompra(event)
    }
})


const selectorTipo = document.getElementById("tipoProducto")
selectorTipo.onchange = (evt)=>{
    const tipoSeleccionado =  evt.target.value
    if(tipoSeleccionado === "0"){
        renderizarProductos(productos)
    } else {
        renderizarProductos(productos.filter(prod=>prod.tipo === tipoSeleccionado))
    }
}







// Testing
const app = ()=>{
    renderizarProductos(articulos)
    //renderizarProductos(productos)
    productosPreexistentes()
    renderizarCarrito()
    totalCarritoRender()
}

//ejecuto mi aplicacion
app()