// Colete a idade de um usuário e classifique esse usuário pela sua faixa etária. Exiba na tela uma mensagem com a idade da pessoa e a faixa etária atribuída. Regra:

// 0 - 13 -> Criança
// 14 - 19 -> Adolescente
// 20 - 69 -> Adulto
// 70 - ... -> Sênior
// Em caso de idade inválida atribua Alienigena

// Desafio: Peça a data de nascimento da pessoa e calcule sua idade
import { number, input } from "@inquirer/prompts";

const idade = await number({ message: "Digite sua idade:" });

let faixaEtaria;

if (idade >= 0 && idade <= 13) {
    faixaEtaria = "Criança"
} else if (idade >= 14 && idade <= 19) {
    faixaEtaria = "Adolescente"
} else if (idade >= 20 && idade <= 69) {
    faixaEtaria = "Adulto"
} else if (idade >= 70) {
    faixaEtaria = "Sênior"
} else {
    faixaEtaria = "Alienigena 👽"
}

console.log(`Idade: ${idade} anos -> Faixa Etária: ${faixaEtaria}`)