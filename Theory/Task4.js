// Task 4: Creación de Módulos Personalizados (4 minutos)
// Estrategias para organizar el código en módulos efectivos.

// Estructura de Proyecto Modular
// mi-proyecto/
// ├── package.json
// ├── index.js          # Punto de entrada
// ├── lib/
// │   ├── math.js       # Utilidades matemáticas
// │   ├── database.js   # Conexión a BD
// │   └── logger.js     # Sistema de logging
// ├── models/
// │   ├── user.js       # Modelo de usuario
// │   └── product.js    # Modelo de producto
// ├── routes/
// │   ├── users.js      # Rutas de usuarios
// │   └── products.js   # Rutas de productos
// └── utils/
//     ├── validation.js # Utilidades de validación
//     └── formatting.js # Utilidades de formato
// Patrón de Módulo con Inicialización
// archivo: lib/database.js

class Database {
  constructor(config) {
    this.config = config;
    this.conectado = false;
    this.conexiones = 0;
  }

  conectar() {
    // Simulación de conexión
    return new Promise((resolve) => {
      setTimeout(() => {
        this.conectado = true;
        this.conexiones++;
        console.log(`Conectado a ${this.config.host}:${this.config.port}`);
        resolve(this);
      }, 1000);
    });
  }

  desconectar() {
    this.conectado = false;
    console.log('Desconectado de la base de datos');
  }

  ejecutar(query, params = []) {
    if (!this.conectado) {
      throw new Error('No hay conexión a la base de datos');
    }

    // Simulación de consulta
    return new Promise((resolve) => {
      setTimeout(() => {
        const resultado = {
          query,
          params,
          filas: Math.floor(Math.random() * 10) + 1
        };
        resolve(resultado);
      }, Math.random() * 500 + 100);
    });
  }
}

// Exportar una instancia singleton
let instancia = null;

function crearConexion(config = {}) {
  if (!instancia) {
    instancia = new Database({
      host: config.host || 'localhost',
      port: config.port || 5432,
      database: config.database || 'miapp'
    });
  }
  return instancia;
}

module.exports = crearConexion;

// Uso:
// const crearConexion = require('./lib/database');
// const db = crearConexion({ host: 'mi-servidor' });
// await db.conectar();