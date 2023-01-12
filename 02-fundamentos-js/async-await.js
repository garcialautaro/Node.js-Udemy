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
    });
}

const getSalario = (id) => {

    return new Promise((resolve, reject) => {
        const salario = salarios.find((salario) => salario.id === id)

        salario ? resolve(salario) : reject(`El salario con id ${id} no existe`);
    });
}

// const getInfoUsuario = async(id) => {return 'Hola mundo'}

// getInfoUsuario().then((info) => console.log(info))


const id = 1;

const getInfoUsuario = async(id) => {

    const emp = await getEmpleado(id);
    const sal = await getSalario(id);

    return {emp, sal};

}


getInfoUsuario(id)
    .then((i) => console.log(`el empleado ${i.emp.nombre} tiene un salario de ${i.sal.salario}`))
    .catch((err) => console.log(err))
