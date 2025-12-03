const fs = require('fs').promises;
const path = require('path');

class Exportador {
  constructor() {
    this.directorioExportacion = path.join(__dirname, '..', 'exports');
  }

  // ------------------------------------
  // Helper: convierte un array de objetos a CSV
  // ------------------------------------
  _toCSV(tareas) {
    if (tareas.length === 0) return '';
    
    // Obtener las cabeceras del primer objeto (asumiendo estructura uniforme)
    const headers = Object.keys(tareas[0]).join(',');
    
    // Obtener las filas de datos
    const rows = tareas.map(tarea => {
      // Mapear los valores, manejando el formato de fecha para que sea legible.
      return Object.values(tarea).map(value => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        // Envolver en comillas si contiene comas para evitar problemas en CSV
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',');
    }).join('\n');

    return headers + '\n' + rows;
  }

  // ------------------------------------
  // Métodos de Exportación
  // ------------------------------------
  async exportar(tareas, formato = 'json', nombreArchivo = 'exportacion') {
    const datosPlanos = tareas.map(t => t.obtenerInformacion());
    let contenido;
    let extension;

    switch (formato.toLowerCase()) {
      case 'json':
        contenido = JSON.stringify(datosPlanos, null, 2);
        extension = 'json';
        break;
      case 'csv':
        contenido = this._toCSV(datosPlanos);
        extension = 'csv';
        break;
      default:
        throw new Error(`Formato de exportación no soportado: ${formato}`);
    }

    const rutaCompleta = path.join(this.directorioExportacion, `${nombreArchivo}.${extension}`);
    
    // Asegurar que el directorio existe
    await fs.mkdir(this.directorioExportacion, { recursive: true });
    
    await fs.writeFile(rutaCompleta, contenido, 'utf8');
    
    return rutaCompleta;
  }
}

module.exports = Exportador;