import { input } from "@inquirer/prompts";

const nascimento = await input({ message: "Digite sua data de nascimento no padrão internacional 'ano-mes-dia':" })

const dataNascimento = new Date(nascimento + "T00:00");

const hoje = new Date();

let idade = hoje.getFullYear() - dataNascimento.getFullYear()

if (hoje.getMonth() < dataNascimento.getMonth() || (hoje.getMonth() === dataNascimento.getMonth && hoje.getDate() < dataNascimento.getDate())) {
    idade -= 1
}

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