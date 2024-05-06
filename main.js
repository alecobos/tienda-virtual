const productos = JSON.parse(localStorage.getItem("productos")) || [] 
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []


const renderizarProductos = (arrayUtilizado)=>{
    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""
    arrayUtilizado.forEach(({id, nombre, tipo, precio, stock, descripcion})=>{
        const prodCard = document.createElement("div")
        prodCard.classList.add("col-xs")
        prodCard.classList.add("card")
        prodCard.classList.add("productos")
        prodCard.id = id
        prodCard.innerHTML = `
                <img src="./assets/${nombre+id}.png" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <h4 class="card-title">${nombre}</h4>
                    <h5>${tipo}</h5>
                    <p class="card-text">${descripcion}</p>
                    <label>$ ${precio}</label>
                    <form id="form${id}">
                        <label for="contador${id}">Cantidad</label>
                        <input type="number" placeholder="0" id="contador${id}" min="0">
                        <button class="btn btn-primary" id="botonProd${id}">Agregar</button>
                        <p>Stock: ${stock}</p>
                    </form>
                </div>`
        contenedorProductos.appendChild(prodCard)
        const btn = document.getElementById(`botonProd${id}`)
        console.log(btn)
        btn.addEventListener("click",(evento)=>{
            evento.preventDefault()
            const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
            if(contadorQuantity>0){
                agregarCarrito({id, nombre, tipo, precio, stock, descripcion, cantidad:contadorQuantity})
                renderizarCarrito()
                const form = document.getElementById(`form${id}`)
                form.reset()
            }
        }) 
    })
}

const agregarProducto = ({id, nombre, tipo, precio, stock, descripcion})=>{
    if(productos.some(prod=>prod.id===id)){
        // console.warn("Ya existe un producto con ese id") // esto lo podemos ahcer a futuro con librerias
    } else {
        const productoNuevo = new Producto(id, nombre, tipo, precio, stock, descripcion)
        productos.push(productoNuevo)
        //guarda el nuevo array de productos
        localStorage.setItem('productos', JSON.stringify(productos))
    }
}

const productosPreexistentes = ()=>{
    // Si el array de productos esta vacio, utiliza el array de productos pre-existente
    if (productos.length===0){
        productosBase.forEach(prod=>{
            let dato = JSON.parse(JSON.stringify(prod))
                agregarProducto(dato)}
            )
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
    carrito.push(objetoCarrito)
    totalCarritoRender()
}

const renderizarCarrito = ()=>{
    const listaCarrito = document.getElementById("listaCarrito")
    listaCarrito.innerHTML=""
    carrito.forEach(({nombre, precio, cantidad, id}) =>{
        let elementoLista = document.createElement("li")
        elementoLista.innerHTML=`${nombre} | P/u: ${precio} | Cant.: ${cantidad} <button id="eliminarCarrito${id}">X</button>`
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
    mensaje.innerHTML = "Muchas gracias por su compra, los esperamos pronto"

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





// const renderizarCarrito = ()=>{
//     const listaCarrito = document.getElementById("listaCarrito")
//     listaCarrito.innerHTML=""
//     carrito.forEach(({nombre, precio, cantidad, id}) =>{
//         let elementoLista = document.createElement("li")
//         //elementoLista.innerHTML=`${nombre} | P/u: ${precio} | Cant.: ${cantidad} <button id="eliminarCarrito${id}">X</button>`
//         elementoLista.innerHTML=`${nombre} | P/u: ${precio} | Cant.: ${cantidad}`
        
//         listaCarrito.appendChild(elementoLista)
//         let carritoString = JSON.stringify(carrito)
//         localStorage.setItem("carrito", carritoString)
//     })
// }

// Testing
const app = ()=>{
    
    renderizarProductos(productos)
    productosPreexistentes()
    renderizarCarrito()
    totalCarritoRender()
}

//ejecuto mi aplicacion
app()