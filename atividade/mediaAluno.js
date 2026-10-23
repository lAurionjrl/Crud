// Crie um programa que recebe 4 notas de um aluno e ao final exibe 
// a média do aluno e a situação do aluno. A situação do aluno é definida por:

// Nota maior ou igual a 7 = Aprovado
// Nota maior ou igual a 4 = Recuperação
// Nota menor que 4 = Reprovado

// Melhore o programa para permitir ao professor perguntar quantas notas ele
// pretende preencher.

// Ajuste o programa para permitir apenas notas válidas (entre 0 e 10)

// Peça também o nome do aluno e ao final exiba um boletim com as notas 
// aluno a média e a situação

import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";


let somaNotas = 0

for (let i = 1; i <= 4; i++){
    const nota = await number({message:`Digite a nota ${i}: `, step:0.1})

    somaNotas += nota
}

const media = somaNotas/4

let situacao = "Indefinido"

if (media >= 7 && media <= 10){
    situacao = "Aprovado"
} else if (media >= 4 && media < 7){
    situacao = "Recuperação"
} else if (media >= 0 && media < 4){
    situacao = "Reprovado"
} else{
    situacao = "VALOR DE MÉDIA INVÁLIDA"
}

console.log(`
RESULTADO ESCOLAR

Média - ${media.toFixed(1)}
Situação - ${situacao}
    
    `)