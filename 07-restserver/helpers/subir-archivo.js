const { v4: uuidv4 } = require('uuid');
const path = require("path");

const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'] //por defecto

const subirArchivo = (files, extensionesValidas = extensionesValidas, carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1]

        // Validar la extension:
        if(!extensionesValidas.includes(extension)) {
            return reject(`El archivo no tiene una extensión válida (${extensionesValidas})`);
        }
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve(nombreTemp)
        });
    
    })

}

module.exports = {
    subirArchivo
}