// 4. Faça um sistema de lanchonete. O sistema deve exibir uma lista de lanches contendo código, nome e preço de um lanche e deverá perguntar para o usuário qual lanche ele gostaria de escolher, após isso ele deve perguntar a quantidade desejada e se o cliente deseja continuar comprando, se a resposta for afirmativa o sistema deve pedir o código do próximo lanche. Ao final exiba o total que o cliente deverá pagar. 
// DESAFIO 1: Aplique um desconto de 10 reais para compras com total a partir de 100 reais e um desconto de 15 reais para compras com total a partir de 200 reais
// DESAFIO 2: Monte a nota fiscal do cliente, contendo os itens que foram comprados, seus preços, o desconto aplicado e o total da compra.

import { input, number } from "@inquirer/prompts"

let totalVenda = 0

let pedidos = ""

while (true) {
    console.log(`
        
        Bem vindo ao Pará Lanches

        CÓD |   NOME     | PREÇO (R$)
        001 | XIS BURGER | R$ 10,00
        002 | XIS SALADA | R$ 12,00
        003 | BAURU      | R$ 15,00
        004 | KURIRIN NO PÃO BOLA | R$ 20,00
        005 | X-BACON COM PICOLLO | R$ 25,00
        006 | COCA ZERO 350ML | R$ 5,00
        
        `)
        let cod = await input({message:"Digite o código do lanche desejado: "})

        let nome = undefined
        let preco = undefined

        if (cod == "001"){
            nome = "XIS BURGER"
            preco = 10
        } else if (cod == "002"){
            nome = "XIS SALADA"
            preco = 12
        } else if (cod == "003"){
            nome = "BAURU"
            preco = 15
        } else{
            console.log("PRODUTO NÃO ENCONTRADO. ESCOLHA UMA OPÇÃO VÁLIDA DO CARDÁPIO")
            continue
        }

        // if (!nome || !preco){
        //     console.log("ERRO NA COLETA DE DADOS DO PRODUTO")
        //     continue
        // }
        console.log(`Você escolheu ${nome} por R$ ${preco.toFixed(2)}`)
        let quantidade = await number({message:"Digite quantas unidades deseja: "})

        totalVenda += (preco * quantidade)
        pedidos += `${cod} | ${nome} | ${preco.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} | ${quantidade} | ${(preco*quantidade).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})} \n`


        let continuar = await input({message:"DESEJA COMPRAR OUTRO PRODUTO? (S/N)"})

        if (continuar == "N"){
            console.log("Venda Finalizada!")
            break
        } 
        
}

let desconto = 0
if (totalVenda >= 200){
    totalVenda = totalVenda - 15
    desconto = 15
    
}else if (totalVenda >= 100){
    totalVenda = totalVenda - 10  
    desconto = 10
}

console.log(`
NOTA FISCAL

COD | NOME | PREÇO | QTD | TOTAL
${pedidos}


DESCONTO: -R$ ${desconto.toFixed(2)}
    `)
console.log(`Total a Pagar: ${totalVenda.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}`)