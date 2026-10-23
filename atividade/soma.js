import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";

// Faça um programa que pede 5 números inteiros e exiba sua soma.

let soma = 0;

for (let i = 1; i <= 5; i++) {
  const numero = await number({
    message: `Digite o ${i}º número inteiro:`,
    required: true,
    validate: (val) => Number.isInteger(val) || "Por favor, digite um número inteiro válido."
  });

  soma += numero;
}

console.log(`\nA soma dos 5 números é: ${soma}`);