const argv = require('yargs')
                .option('b' , {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Numero que desea multiplicarse'
                })
                .option('l' , {
                    alias: 'limite',
                    type: 'number',
                    demandOption: false,
                    default: 10,
                    describe: 'Hasta que numero se multiplicara'
                })
                .option('i', {
                    alias: 'imprimir',
                    type: 'boolean',
                    demandOption: false,
                    default: false,
                    describe: 'Imprimir multiplicacion en consola'
                })
                .check((argv, options) => {
                    if (isNaN(argv.b && argv.l)){
                        throw 'La base y el limite deben ser un numero'
                    }
                    return true;
                })
                .argv;

module.exports = {
    argv,
}