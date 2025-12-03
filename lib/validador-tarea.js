class ValidadorTarea {
  static validarCreacion(titulo, prioridad) {
    if (typeof titulo !== 'string' || titulo.trim().length === 0) {
      throw new Error("El título de la tarea es obligatorio y debe ser una cadena no vacía.");
    }

    const prioridadesValidas = ['baja', 'media', 'alta'];
    if (prioridad && !prioridadesValidas.includes(prioridad.toLowerCase())) {
      throw new Error(`Prioridad inválida: "${prioridad}". Debe ser una de las siguientes: ${prioridadesValidas.join(', ')}.`);
    }
  }

  static validarActualizacion(datos) {
    if (!datos || typeof datos !== 'object') {
      throw new Error("Los datos de actualización deben ser un objeto.");
    }
    
    // Si se intenta actualizar la prioridad, validar que sea válida.
    if (datos.prioridad) {
      this.validarCreacion('Título temporal', datos.prioridad); // Reutilizamos la validación de prioridad
    }

    // Se pueden añadir más validaciones específicas aquí, si es necesario.
  }
}

module.exports = ValidadorTarea;