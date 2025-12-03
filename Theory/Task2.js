// Task 2: CommonJS - Sistema Tradicional (10 minutos)
// CommonJS es el sistema de módulos original de Node.js.

// Exportar en CommonJS
// archivo: matematicas.js

// Función básica
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

// Variable privada (no exportada)
const PI = 3.14159;

// Clase
class Calculadora {
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

// Exportar múltiples elementos
module.exports = {
  sumar,
  restar,
  Calculadora
};

// O exportar uno por uno
// module.exports.sumar = sumar;
// module.exports.restar = restar;
// module.exports.Calculadora = Calculadora;

// O exportar un solo elemento (patrón común)
// module.exports = function() { ... };


// Importar en CommonJS


// archivo: app.js

// Importar el módulo completo
const matematicas = require('./Task1');

// Usar las funciones exportadas
console.log('2 + 3 =', matematicas.sumar(2, 3));
console.log('5 - 2 =', matematicas.restar(5, 2));

// Usar la clase
const calc = new matematicas.Calculadora();
console.log('4 × 6 =', calc.multiplicar(4, 6));

// Importar módulos del core de Node.js
const fs = require('fs');
const path = require('path');
const http = require('http');

// Importar módulos de NPM
const express = require('express');
const lodash = require('lodash');


// Patrón de Exportación Única


// archivo: usuario.js

class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.activo = true;
  }

  obtenerPerfil() {
    return {
      nombre: this.nombre,
      email: this.email,
      activo: this.activo
    };
  }

  cambiarEstado(activo) {
    this.activo = activo;
  }
}

// Exportar la clase directamente
module.exports = Usuario;

// En otro archivo:
// const Usuario = require('./usuario');
// const usuario = new Usuario('Ana', 'ana@email.com');



// Patrón Factory


// archivo: logger.js

class Logger {
  constructor(nivel = 'info') {
    this.nivel = nivel;
    this.mensajes = [];
  }

  log(mensaje, nivel = 'info') {
    const entrada = {
      mensaje,
      nivel,
      timestamp: new Date(),
      pid: process.pid
    };

    this.mensajes.push(entrada);

    // Solo mostrar si el nivel es apropiado
    if (this.nivelPrioridad(nivel) >= this.nivelPrioridad(this.nivel)) {
      console.log(`[${entrada.timestamp.toISOString()}] ${nivel.toUpperCase()}: ${mensaje}`);
    }
  }

  nivelPrioridad(nivel) {
    const prioridades = { error: 0, warn: 1, info: 2, debug: 3 };
    return prioridades[nivel] || 2;
  }

  obtenerHistorial() {
    return [...this.mensajes];
  }
}

// Factory function para crear loggers con configuración
function crearLogger(config = {}) {
  const logger = new Logger(config.nivel);

  // Métodos adicionales basados en configuración
  if (config.persistir) {
    logger.persistir = function() {
      // Lógica para guardar en archivo
      console.log('Guardando logs en archivo...');
    };
  }

  return logger;
}

// Exportar la factory
module.exports = crearLogger;

// Uso:
// const crearLogger = require('./logger');
// const logger = crearLogger({ nivel: 'debug', persistir: true });
