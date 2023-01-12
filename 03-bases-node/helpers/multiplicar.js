const fs = require('fs');
const colors = require('colors');

const crearArchivo = async(base, limite, imprimir) => {
    
    try {
        let salida = '';

        salida += '=======================\n';
        salida += `===== tabla del ${base} =====\n`;
        salida += '=======================\n';

        for(let i = 0; i <=limite; i++) {
            salida += `${ base } x ${ i } = ${ base * i }\n`;
        }
        if(imprimir) {
            console.log(colors.blue(colors.bold(salida)));
        }
        fs.writeFileSync(`tabla-${base}`, salida);

        //console.log(`tabla-${base}.txt creada`);
        return colors.red(`tabla-${base}.txt`.bold);

    } catch(err) {
        throw new err;
    }

}

module.exports = {
    crearArchivo,
}