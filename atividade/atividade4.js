const preco = 1234.5;
const brl = { style: 'currency', currency: 'BRL' };

preco.toFixed(2);                   // "1234.50"    (texto!)
preco.toLocaleString('pt-BR');       // "1.234,5"
preco.toLocaleString('pt-BR', brl);  // "R$ 1.234,50"
console.log((0.256).toLocaleString('pt-BR', { style: 'percent' }));   // "26%"