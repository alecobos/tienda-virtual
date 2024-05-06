class Producto{
    constructor(id, nombre, tipo, precio, stock, descripcion){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion;
    }
}

const productosBase = [
    {
        id:"001",
        nombre:"Camiseta Titular",        
        tipo:"Camiseta", 
        precio:45000, 
        stock:100, 
        descripcion:"Camiseta Titular tipo juego"
    },
    {
        id:"002", 
        nombre:"Pantalon Titular", 
        tipo:"Pantalon", 
        precio:20000, 
        stock:100, 
        descripcion:"Pantalón Titular tipo juego"
    },
    {
        id:"003", 
        nombre:"Camiseta Suplente", 
        tipo:"Camiseta", 
        precio:45000, 
        stock:50, 
        descripcion:"Camiseta Suplente tipo juego"
    },
    {
        id:"004", 
        nombre:"Pantalon Suplente", 
        tipo:"Pantalon", 
        precio:20000, 
        stock:30, 
        descripcion:"Pantalón Suplente tipo juego"
    },
    {
        id:"005", 
        nombre:"Camiseta Entrenamiento", 
        tipo:"Camiseta", 
        precio:18000, 
        stock:40, 
        descripcion:"Camiseta de Entrenamiento Azul"
    },
    {
        id:"006", 
        nombre:"Camperon", 
        tipo:"Campera", 
        precio:60000, 
        stock:15, 
        descripcion:"Camperon Largo Azul"
    },
]