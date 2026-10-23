
const produto = 'Fone Bluetooth';
const preco = 129.9;
const quantidade = 3;
const desconto = 0.15;

const percoAtual = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const descontoNovo = desconto.toLocaleString('pt-BR', { style: 'percent' });

const linha = '-'.repeat(35);

console.log(linha);
console.log('FICHA DO PRODUTO');
console.log(linha);

console.log(`Produto`.padEnd(18) + produto.padStart(17));
console.log(`Preço`.padEnd(18) + percoAtual.padStart(17));
console.log(`Quantidade`.padEnd(18) + String(quantidade).padStart(17));
console.log(`Desconto`.padEnd(18) + descontoNovo.padStart(17));

console.log(linha);

const ficha = {
  'Produto': produto,
  'Preço': percoAtual,
  'Quantidade': quantidade,
  'Desconto': descontoNovo
};

console.table(ficha);