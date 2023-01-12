const empleados = [
    {
        id: 1,
        nombre: 'Lautaro'
    },{
        id: 2,
        nombre: 'Fernando'
    },{
        id: 3,
        nombre: 'Karen'
    },
]

const salarios = [
    {
        id: 1,
        salario: 1000
    },{
        id: 2,
        salario: 1500
    },
];

const getEmpleado = (id, callback) => {

    const empleado = empleados.find((empleado) => empleado.id === id)

    if(!empleado) return callback(`El empleado con id ${id} no existe`);

    return callback(null, empleado);

}
const getSalario = (id, callback) => { 
    const salario = salarios.find((salario) => salario.id === id);

    if(!salario) return callback(`El salario con id ${id} no existe`);

    return callback(null, salario);
}

getEmpleado(10, (err, empleado) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log(empleado);
});

getSalario(1, (err, salario) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(salario);
})