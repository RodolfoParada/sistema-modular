class Logger {
  constructor(nombreModulo) {
    this.nombreModulo = nombreModulo;
  }

  // Registra eventos críticos o errores
  error(mensaje) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR] [${this.nombreModulo}] ${mensaje}`);
  }

  // Registra eventos importantes del ciclo de vida
  info(mensaje) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO] [${this.nombreModulo}] ${mensaje}`);
  }

  // Registra eventos de depuración o detalles de operación
  debug(mensaje) {
    // Podrías implementar lógica para desactivar el debug en producción
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [DEBUG] [${this.nombreModulo}] ${mensaje}`);
  }
}

// Exportamos una instancia para uso global en el gestor
module.exports = new Logger('GestorTareas');