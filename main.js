class Producto{
    constructor(id, nombre, tipo, precio, stock, descripcion, img){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion;
        this.img = img;
    }
}

const productos = JSON.parse(localStorage.getItem("productos")) || []
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []


//funcion para poder visualizar los productos
const renderizarProductos = (productos)=>{
    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""
    productos.forEach(({id, nombre, tipo, precio, stock, descripcion, img})=>{
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
        //console.log(btn)
        btn.addEventListener("click",(evento)=>{
            evento.preventDefault()
            const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
            // const nombreProd = document.getElementById()
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


const productosPreexistentes = async ()=>{
    if (productos.length===0){
        try{
            const URLraiz = "/TiendaVirtual/datos.json" 
            const URLprodJson = "./datos.json" 
            const productosBasePuro = await fetch(URLprodJson)
            const productosBase = await productosBasePuro.json()
            productosBase.forEach(prod=>{
                let dato = JSON.parse(JSON.stringify(prod))
                agregarProducto(dato)}
                )
        } catch(err) {
            console.error("Se produjo un error al realizar el fetch:", err)
        }finally{
            renderizarProductos(productos)
        }
    } else {
        renderizarProductos(productos)
    }
}

const agregarProducto = ({id, nombre, tipo, precio, stock, descripcion, img})=>{
    if(productos.some(prod=>prod.id===id)){
        
    } else {
        const productoNuevo = new Producto(id, nombre, tipo, precio, stock, descripcion, img)
        productos.push(productoNuevo)
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
}


const agregarCarrito = (objetoCarrito)=>{
    const verifica = carrito.some((elemento)=>{
        return elemento.id === objetoCarrito.id
    })
    if (verifica){
        const indice = carrito.findIndex((elemento)=> elemento.id === objetoCarrito.id)
        carrito[indice].cantidad = parseInt(carrito[indice].cantidad) + parseInt(objetoCarrito.cantidad)
    } else{
        carrito.push(objetoCarrito)
    }
    totalCarritoRender()
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
            Toastify({
                text: "productos eliminados del carrito",
                style: {
                    background: "red",
                },
                duration: 2000
                }).showToast();
            carrito = carrito.filter((elemento)=>{
                if(elemento.id !== id){
                    return elemento
                }
            })
            let carritoString = JSON.stringify(carrito)
            localStorage.setItem("carrito", carritoString)
            renderizarCarrito()
        })
        totalCarritoRender() 
        let carritoString = JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoString)
    })
}


const borrarCarrito = ()=>{
    carrito.length = 0  
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
    Swal.fire({
        icon: 'success',
        title: `Muchas gracias por su compra. Esperamos que disfrute su pedido!!!`,
        showConfirmButton: true,
    })

}

// DOM
const compraFinal = document.getElementById("formCompraFinal")
compraFinal.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(carrito.length>0){
        finalizarCompra(event)
    } else {
        Swal.fire({
            icon: 'error',
            title: `Su carrito esta vacío`,
            showConfirmButton: true,
            timer: 2500
        })
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

const app = ()=>{
    productosPreexistentes()
    renderizarCarrito()
    totalCarritoRender()
}
app()