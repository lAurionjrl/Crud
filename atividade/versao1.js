import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";

// 1. O programa deverá pedir as seguintes informações de um funcionário: Nome, CPF, Cargo, Departamento, Salário e CPF



const nome = await input({ message: "Digite o nome do funcionário:" });
const cpf = await input({ message: "Digite o CPF do funcionário:" });
const cargo = await input({ message: "Digite o cargo do funcionário:" });
const departamento = await input({ message: "Digite o departamento:" });
const salario = await number({ message: "Digite o salário do funcionário:" });

console.log("\n--- Dados Cadastrados ---");
console.log(`Nome: ${nome}`);
console.log(`CPF: ${cpf}`);
console.log(`Cargo: ${cargo}`);
console.log(`Departamento: ${departamento}`);
console.log(`Salário: R$ ${salario}`);


