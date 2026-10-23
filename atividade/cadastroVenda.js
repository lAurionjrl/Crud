// 3. Faça um cadastro de compras. O programa deverá pedir nome do produto, preço e quantidade. O programa deverá calcular o valor total da compra e continuar até que o total atinja R$ 1000,00.

import { input, number } from "@inquirer/prompts"

let nomeProduto = ""
let precoProduto = 0
let qtdProduto = 0

let totalCompra = 0

while (totalCompra < 1000){
    nomeProduto = await input({message:"Digite o nome do produto: "})

    precoProduto = await number({message:"Digite o preço do produto: ", step: 0.01})

    qtdProduto = await number({message:"Digite quantas unidades deseja: "})

    totalCompra += (precoProduto * qtdProduto)

    console.log(`Sub-Total: R$ ${totalCompra.toFixed(2)}`)

}

console.log(`Valor Final: R$ ${totalCompra.toFixed(2)}`)