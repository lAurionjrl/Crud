import { input, number } from "@inquirer/prompts"

const produto = { nome: 'Fone de ouvido', preco: 80, estoque: 12 };

console.log(`
    FICHA DO PRODUTO:

    Nome: ${produto["nome"]}
    Preço: ${produto["preco"].toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
    Estoque: ${produto["estoque"]}
    
    `)

let novoPreco = await number({message:"Digite o novo preço: ", step:0.01})

//AQUI FICARIAM AS VERIFICAÇÕES

produto["preco"] = novoPreco

let unidadesVendidas = await number({message:"Digite quantas unidades foram vendidas:"})

let novoEstoque = produto["estoque"] - unidadesVendidas

// VERIFICAÇÕES DO ESTOQUE

produto["estoque"] = novoEstoque

produto["categoria"] = "Eletrônicos"

console.log(`
    FICHA DO PRODUTO:

    Nome: ${produto["nome"]}
    Categoria: ${produto["categoria"]}
    Preço: ${produto["preco"].toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
    Estoque: ${produto["estoque"]}
    
    `)

if (produto["estoque"] === 0){
    console.log("SEM ESTOQUE DO PRODUTO SELECIONADO")
}