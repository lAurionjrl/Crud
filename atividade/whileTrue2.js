// 2. Usando while(true) faça um programa de coleta de temperaturas. O programa deverá pedir uma temperatura em Celsius, quando o usuário digitar "SAIR", a coleta deverá ser encerrada e a média das temperaturas inseridas deverá ser calculada e exibida no terminal. Só devem ser aceitas temperaturas no intervalo de -50 a 50 graus celsius, do contrário exiba uma mensagem de erro.

import { input, number } from "@inquirer/prompts"

let mediaTemp = 0 //undefined
let somaTemp = 0
let qtdTemp = 0

while (true) {
    let temperatura = await input({ message: `Digite a temperatura ${qtdTemp + 1} em Celsius (SAIR para encerrar):` })

    if (temperatura == "SAIR") {
        console.log("Encerrando coleta...")
        break
    }

    temperatura = Number(temperatura) // NaN

    if (isNaN(temperatura)) {
        console.log("Você escreveu algo inválido! Escreva um número usando '.' para os decimais!")
        continue
    }


    if (temperatura < -50 || temperatura > 50) {
        console.log("DIGITE UMA TEMPERATURA NO INTERVALO DE -50°C e 50°C!")
        continue
    }


    somaTemp += temperatura
    qtdTemp += 1


}


mediaTemp = somaTemp / qtdTemp

console.log(`Média de Temperatura: ${mediaTemp.toFixed(1)}°C`)