//Faça um programa que pede o nome de clientes e para apenas quando o usuário digitar "SAIR". Exiba a contagem de clientes cadastrados e exiba um erro quando não for inserido nome algum.

import { input, number } from "@inquirer/prompts"

let nome = ""
let contagemClientes = 0

while (nome != "SAIR") {
    nome = await input({ message: "Digite o nome do cliente: " })

    if (nome == "") {
        console.log("VOCÊ DEIXOU O CAMPO NOME EM BRANCO. ESCREVA NOVAMENTE!")
    }

    if (nome != "SAIR" && nome != "") {
        contagemClientes++
    }

}
console.log(contagemClientes)