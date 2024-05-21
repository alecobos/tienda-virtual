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
        descripcion:"Camiseta Titular"
    },
    {
        id:"002", 
        nombre:"Pantalon Titular", 
        tipo:"Pantalon", 
        precio:20000, 
        stock:100, 
        descripcion:"Pantalón Titular"
    },
    {
        id:"003", 
        nombre:"Camiseta Suplente", 
        tipo:"Camiseta", 
        precio:45000, 
        stock:50, 
        descripcion:"Camiseta Suplente"
    },
    {
        id:"004", 
        nombre:"Pantalon Suplente", 
        tipo:"Pantalon", 
        precio:20000, 
        stock:30, 
        descripcion:"Pantalón Suplente"
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
    {
        id:"007", 
        nombre:"Campera Entrenamiento", 
        tipo:"Campera", 
        precio:50000, 
        stock:15, 
        descripcion:"Campera Azul"
    },
    {
        id:"008", 
        nombre:"Gorra", 
        tipo:"Accesorios", 
        precio:12000, 
        stock:15, 
        descripcion:"Gorra Celeste"
    },
    {
        id:"009", 
        nombre:"Buzo con capucha", 
        tipo:"Accesorios", 
        precio:25000, 
        stock:15, 
        descripcion:"Buzo con capucha blanco"
    },
    {
        id:"010", 
        nombre:"Set Matero", 
        tipo:"Accesorios", 
        precio:42000, 
        stock:15, 
        descripcion:"Termo + mate"
    },
]