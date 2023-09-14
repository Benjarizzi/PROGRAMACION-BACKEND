const fs = require('fs'); // Necesitarás el módulo 'fs' para leer y escribir en archivos.

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.loadProductsFromJson();
  }

  loadProductsFromJson() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los productos desde el archivo JSON:', error.message);
      return [];
    }
  }

  saveProductsToJson() {
    try {
      const jsonData = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, jsonData, 'utf8');
    } catch (error) {
      console.error('Error al guardar los productos en el archivo JSON:', error.message);
    }
  }

  generateNextId() {
    const maxId = this.products.reduce((max, product) => (product.ID > max ? product.ID : max), 0);
    return maxId + 1;
  }

  addProduct(newProduct) {
    const id = this.generateNextId();
    newProduct.ID = id;
    this.products.push(newProduct);
    this.saveProductsToJson(); // Guardamos los cambios en el archivo JSON.
    return id;
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find((product) => product.ID === productId);
  }

  updateProduct(productId, fieldToUpdate, newValue) {
    const productToUpdate = this.getProductById(productId);
    if (productToUpdate) {
      // Actualizamos el campo especificado sin borrar el ID.
      productToUpdate[fieldToUpdate] = newValue;
      this.saveProductsToJson(); // Guardamos los cambios en el archivo JSON.
      return true;
    } else {
      console.error('Producto no encontrado.');
      return false;
    }
  }

  deleteProduct(productId) {
    const index = this.products.findIndex((product) => product.ID === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProductsToJson(); // Guardamos los cambios en el archivo JSON.
      return true;
    } else {
      console.error('Producto no encontrado.');
      return false;
    }
  }
}

// Ejemplo de uso:
const productManager = new ProductManager('/productos.json');

// Agregar un nuevo producto
const newProduct = {
  title: 'Nuevo Producto',
  description: 'Descripción del Nuevo Producto',
  price: 39.99,
  img: 'nueva_imagen.jpg',
  code: 67890,
  stock: 20,
};
const newProductId = productManager.addProduct(newProduct);
console.log('Nuevo Producto ID:', newProductId);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);