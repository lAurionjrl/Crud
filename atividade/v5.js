import { input, number } from "@inquirer/prompts"

let totalFolhaPagamento = 0
let totalFuncionarios = 0
let mediaSalario
let listaFuncionarios = ""

while (true) {
    let nome
    let cargo
    let salario
    let departamento
    let cpf

    while (true) {
        nome = await input({ message: "Digite o nome do funcionário" })
        if (!nome) {
            console.error("NOME VAZIO DETECTADO. TENTE NOVAMENTE")
        } else {
            break
        }
    }

    while (true) {
        cpf = await input({ message: "Digite o cpf do funcionário" })

        if (cpf.length !== 11) {
            console.error("CPF COM TAMANHO INADEQUADO DETECTADO. CPF PRECISA CONTER 11 DIGITOS.")
        } else {
            break
        }
    }

    while (true) {
        cargo = await input({ message: "Digite o cargo do funcionário" })

        if (!cargo) {
            console.error("CARGO VAZIO DETECTADO. TENTE NOVAMENTE")
        } else {
            break
        }
    }

    while (true) {
        departamento = await input({ message: "Digite o departamento do funcionário" })

        if (!departamento) {
            console.error("DEPARTAMENTO VAZIO DETECTADO. TENTE NOVAMENTE")
        } else {
            break
        }
    }

    while (true) {
        salario = await number({ message: "Digite o salário do funcionário", step: 0.01 })
        if (salario < 1621) {
            console.error("VALOR DE SALÁRIO DIGITADO É INVÁLIDO. SALÁRIO MÍNIMO É R$ 1.621,00")
        } else {
            break
        }
    }

    console.log(`
FICHA DO FUNCIONÁRIO:

Nome: ${nome}
CPF: ${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}
Cargo: ${cargo}
Departamento: ${departamento}
Salário: ${salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
`)

    totalFolhaPagamento += salario
    totalFuncionarios += 1
    listaFuncionarios += `${totalFuncionarios}. ${nome} - Cargo: ${cargo}\n`

    // Requisito 8: Menu de opções usando apenas o input padrão
    let opcaoMenu

    while (true) {
        opcaoMenu = await input({ 
            message: "MENU DE OPÇÕES:\n[1] Adicionar um novo funcionário\n[2] Ver os funcionários já cadastrados\n[3] Sair e ver o resumo final\nEscolha uma opção:" 
        })

        if (opcaoMenu === "1" || opcaoMenu === "2" || opcaoMenu === "3") {
            break
        } else {
            console.error("OPÇÃO INVÁLIDA! DIGITE APENAS 1, 2 ou 3.")
        }
    }

    if (opcaoMenu === "2") {
        console.log(`\n----------------------------------------`)
        console.log(`LISTA ATUAL DE FUNCIONÁRIOS CADASTRADOS:`)
        console.log(listaFuncionarios)
        console.log(`----------------------------------------\n`)
        
        // Pergunta novamente se quer sair ou continuar após ver a lista
        let continuar = await input({ message: "Deseja continuar adicionando funcionários? (S/N)" })
        if (continuar.toUpperCase() === "N") {
            console.warn("FINALIZANDO O PROGRAMA...")
            break
        }
    } else if (opcaoMenu === "3") {
        console.warn("FINALIZANDO O PROGRAMA...")
        break
    }
    // Se a opção for "1", o loop principal (`while(true)`) apenas reinicia e cadastra o próximo.
}

// Tratamento caso nenhum funcionário seja cadastrado para evitar divisão por zero
if (totalFuncionarios > 0) {
    mediaSalario = totalFolhaPagamento / totalFuncionarios
} else {
    mediaSalario = 0
}

console.log(`
    RESUMO DA FOLHA

    Total a Pagar: ${totalFolhaPagamento.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    Total Funcionários: ${totalFuncionarios}
    Média Salarial: ${mediaSalario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    
    LISTA DE FUNCIONÁRIOS:
${listaFuncionarios}
`)