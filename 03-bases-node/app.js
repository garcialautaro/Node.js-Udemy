
const { argv } = require('./config/yargs');
const { crearArchivo } = require('./helpers/multiplicar');

console.clear();

// const [ , , arg3] = process.argv; 
// const [ , base = 1] = arg3.split('=');


const {base, limite, imprimir} = argv;

crearArchivo(base, limite, imprimir)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(err => console.error(err));