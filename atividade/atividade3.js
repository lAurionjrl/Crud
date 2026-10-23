const preco = 1499.9
const desconto = 0.15

const total = preco - (preco * desconto)

console.log(`Preço: ${preco.toFixed(2)} - ${typeof(preco.toFixed(2))}`)

console.log(`Preço: ${preco.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}`)

console.log(`Desconto: ${desconto.toLocaleString("pt-BR", {style:"percent"})}`)

console.log(`Total: ${total.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}`)