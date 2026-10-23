import { number, input } from "@inquirer/prompts"

let somaNotas = 0

const nomeAluno = await input({message:"Digite o nome do aluno avaliado: "})

const qtdNotas = await number({message:"Digite quantas notas deseja registrar: "})

let qtdNotasValidas = 0

let boletim = ""

for (let i = 1; i <= qtdNotas; i++){
    const nota = await number({message:`Digite a nota ${i}: `, step:0.1})

    if (nota < 0 || nota > 10){
        console.log("NOTA INVÁLIDA!")
        boletim += `AVALIAÇÃO ${i} - INVÁLIDA\n`
    } else{
        somaNotas += nota
        qtdNotasValidas += 1
        boletim += `AVALIAÇÃO ${i} - ${nota.toFixed(1)}\n`
    }
}

const media = somaNotas/qtdNotasValidas

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
RESULTADO ESCOLAR DO ALUNO ${nomeAluno.toUpperCase()}

Média - ${media.toFixed(1)}
Situação - ${situacao}

BOLETIM

${boletim}
    
    `)