// Task 3: ES6 Modules - Sistema Moderno (8 minutos)
// ES6 Modules es el estándar moderno para módulos en JavaScript.

// Exportar en ES6 Modules
// archivo: operaciones.js

// Export nombrado (puede haber múltiples)
export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Export por defecto (uno por archivo)
export default class Calculadora {
  constructor() {
    this.memoria = 0;
  }

  multiplicar(a, b) {
    const resultado = a * b;
    this.memoria = resultado;
    return resultado;
  }

  dividir(a, b) {
    if (b === 0) throw new Error('División por cero');
    return a / b;
  }
}

// También se puede hacer:
// const Calculadora = class { ... };
// export default Calculadora;

// O al final del archivo:
// export { sumar, restar, PI };
// export default Calculadora;


// Importar en ES6 Modules


// archivo: app.js

// Import nombrado
import { sumar, restar, PI } from './operaciones.js';

// Import por defecto
import Calculadora from './operaciones.js';

// Usar las importaciones
console.log('2 + 3 =', sumar(2, 3));
console.log('PI =', PI);

const calc = new Calculadora();
console.log('4 × 6 =', calc.multiplicar(4, 6));

// Importar todo como objeto
import * as operaciones from './operaciones.js';
console.log('5 - 2 =', operaciones.restar(5, 2));

// Alias para imports
import { sumar as addition, restar as subtraction } from './operaciones.js';
console.log('10 + 5 =', addition(10, 5));

// Import por defecto con alias
import MiCalculadora from './operaciones.js';

// Configuración para ES6 Modules

// package.json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "type": "module",  // Habilita ES6 modules
  "scripts": {
    "start": "node app.js"
  }
}


// Extensiones de archivo:

// CommonJS: .js
// ES6 Modules: .js (con "type": "module" en package.json) o .mjs