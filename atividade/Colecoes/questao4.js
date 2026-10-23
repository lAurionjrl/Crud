import { input, number } from "@inquirer/prompts"

let alunos = []
let notas = []
let situacoes = []

while (true){
    console.log(`BEM VINDO AO SISTEMA ESCOLAR XYZ
        
    MENU:
    
    1. CADASTRAR ALUNO
    2. VER RESULTADOS DA TURMA
    
    0. SAIR`)

    let op = await input({message:"DIGITE O NÚMERO DA OPÇÃO DESEJADA:"})


    if (op === "1"){
        console.log("CADASTRO DE ALUNOS")

        let nome

        while(true){
            nome = await input({message:"Digite o nome do aluno:"})
            if (!nome.trim()){
                console.warn("NOME DEVE SER PREENCHIDO! TENTE NOVAMENTE")
                continue
            }else{
                break
            }
        }

        let nota

        while (true){
            nota = await number({message:"Digite uma nota entre 0 e 10:", step: 0.1})
            if (nota < 0 || nota > 10){
                console.warn('VOCÊ ESCREVEU UMA NOTA INVÁLIDA. INSIRA NOVAMENTE...')
                continue
            }else{
                break
            }
        }

        let situacao

        if (nota >= 7 && nota <= 10){
            situacao = "Aprovado"
        } else if(nota >= 4 && nota < 7){
            situacao = "Recuperação"
        } else if (nota >= 0 && nota < 4){
            situacao = "Reprovado"
        } else{
            situacao = "INVÁLIDO"
        }

        alunos.push(nome)
        notas.push(nota)
        situacoes.push(situacao)

        console.log("NOVO ALUNO CADASTRADO")

    }else if (op === "2"){

        console.log("LISTA DE ALUNOS:")

        let somaNotas = 0

        for (let i = 0; i < alunos.length; i++){
            console.log(`${i+1}. ${alunos[i]} - ${notas[i].toFixed(1)} - ${situacoes[i]}`)
            somaNotas += notas[i]
        }

        let mediaTurma = somaNotas/notas.length

        console.log(`Média da Turma: ${mediaTurma.toFixed(2)}`)

    }else if (op === "0"){
        console.warn("PROGRAMA SENDO ENCERRADO...")
        break
    }else{
        console.error("DIGITE UMA OPÇÃO VÁLIDA!")
    }

    await input({message:"TECLE ENTER PARA CONTINUAR!"})
}