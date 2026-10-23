//4. Faça um programa que exibe os 20 primeiros números pares e sua soma.

import { input, number } from "@inquirer/prompts"

let numero = 0
let qtdPares = 0
let somaPares = 0

while (qtdPares < 20){
    
    if (numero % 2 == 0){
        console.log(numero)
        qtdPares++
        somaPares += numero
    }

    numero++
    
}

console.log("Soma dos pares: ", somaPares)