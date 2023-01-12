const nombre = 'Deadpool';
const real = 'Wade Winston';

const normal = nombre + ' ' + real;
const template = `${nombre} ${real}`;

console.log(normal);

console.log(template);

console.log(normal === template);

const html = 
`
<h1>${nombre}</h1>
<h2>${real}</h2>
`

console.log(html);