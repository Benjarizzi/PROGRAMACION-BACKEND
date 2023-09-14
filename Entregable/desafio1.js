class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1; // Inicializamos el contador de IDs en 1
    }
  
    // Método para agregar un nuevo producto al conjunto
    addProduct(title, description, price, image, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !image || !code || !stock) {
        console.log("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que el código del producto no esté duplicado
      if (this.products.some(product => product.code === code)) {
        console.log(`El producto con código '${code}' ya existe.`);
        return;
      }
  
      const product = {
        id: this.productIdCounter++, // Generar un ID autoincrementable
        title: title,
        description: description,
        price: price,
        image: image,
        code: code,
        stock: stock
      };
      this.products.push(product);
    }
  
    // Método para obtener todos los productos
    getProducts() {
      return this.products;
    }
  
    // Método para obtener un producto por su ID
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado.");
        return null;
      }
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  // Agregar productos
  productManager.addProduct("Producto 1", "Descripción del producto 1", 19.99, "imagen1.jpg", "P1", 100);
  productManager.addProduct("Producto 2", "Descripción del producto 2", 29.99, "imagen2.jpg", "P2", 50);
  
  // Listar productos
  console.log(productManager.getProducts());
  
  // Obtener un producto por ID
  const product = productManager.getProductById(1);
  console.log(product);
  
  // Intentar obtener un producto inexistente
  productManager.getProductById(3);