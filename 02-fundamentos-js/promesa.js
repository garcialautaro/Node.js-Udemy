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

const getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        const empleado = empleados.find((empleado) => empleado.id === id)

        empleado ? resolve(empleado) : reject(`El empleado con id ${id} no existe`);
        // if(empleado) resolve(empleado);
        // else reject(`El empleado con id ${id} no existe`);
    });
}

const getSalario = (id) => {

    return new Promise((resolve, reject) => {
        const salario = salarios.find((salario) => salario.id === id)

        salario ? resolve(salario) : reject(`El salario con id ${id} no existe`);
    });
}

const id = 3;

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch((err) => console.log(err));

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch((err) => console.log(err));

const getSalarioEmpleado = (id) => {
    getEmpleado(id)
        .then(empleado => {
            getSalario(id)
                .then(salario => {
                    console.log(`El empleado ${empleado.nombre} tiene un salario de ${salario.salario}`);
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}

getSalarioEmpleado(id);