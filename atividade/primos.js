//5. Faça um programa que exibe os 10 primeiros números primos e sua soma.

import { input, number } from "@inquirer/prompts"


let numero = 2
let qtdPrimos = 0
let somaPrimos = 0

while (qtdPrimos < 10){

    let qtdDivisores = 0 
    for(let i = 2; i < numero; i++){
        if (numero % i == 0){
            qtdDivisores += 1
        }
    }

    if (qtdDivisores == 0){
        console.log(`${numero} é primo!`)
        qtdPrimos++
        somaPrimos += numero
    }

    numero++
}

console.log("Soma dos primos: ", somaPrimos)
