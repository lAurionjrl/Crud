// Crie um programa que recebe dois representando um intervalo
// e exibe a soma desse intervala na tela.

import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";


const inicio = await number
({ message: "Digita o número inicial:" });
const fim = await number
({ message: "Digita o número final:" });

let soma = 0;


for (let i = inicio; i <= fim; i++) {
  soma += i;
}


console.log(`A soma do intervalo de ${inicio} até ${fim} é: ${soma}`);