import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";

// 1. O programa deverá pedir as seguintes informações de um funcionário: Nome, CPF, Cargo, Departamento, Salário e CPF

// 2. Exiba uma ficha contendo as informações do funcionário cadastrado. Ex:
/*

--------------------------
FICHA DO FUNCIONÁRIO:

Nome: {nome}
Cargo: {cargo}
...
--------------------------
*/

// 3. Adicione validações para os campos, exiba um mensagem de erro caso alguma das informações fique vazia. Para o campo de salário verifique se o salário é um número positivo igual ou maior ao salário mínimo (R$ 1621.00), para o campo CPF verifique se o tamanho do CPF é exatamente 11.


const nome = await input({
    message: "Digite o nome do funcionário:",
    validate: (value) => value !== ""
});

const salario = await number({
    message: "Digite o salário do funcionário:",
    validate: (value) => value >=1621

});
const cpf = await input({ 
    message: "Digite o CPF do funcionário:",
    validate: (value)
 });
const cargo = await input({ message: "Digite o cargo do funcionário:" });
const Setor = await input({ message: "Digite o departamento:" });


console.log("\n--- Dados Cadastrados ---");
console.log(`Nome: ${nome}`);
console.log(`Salário: R$ ${salario}`);
console.log(`CPF: ${cpf}`);
console.log(`Cargo: ${cargo}`);
console.log(`Setor: ${Setor}`);

