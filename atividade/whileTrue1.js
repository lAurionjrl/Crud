// 1. Faça um programa usando while(true) que pede um número inteiro até que o usuário digite 0 ou tenham sido inseridos pelo menos 10 números. Ao final exiba a soma dos números.

import { input, number } from "@inquirer/prompts"

let soma = 0
let qtdNumeros = 0

while(true){
    let numero = await number({message:"Digite seu número"})

    soma += numero
    qtdNumeros += 1

    if(numero == 0 || qtdNumeros >= 10){
        break
    }
}

console.log("Soma: ", soma)