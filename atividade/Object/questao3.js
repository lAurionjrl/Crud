import { input, number } from "@inquirer/prompts"

// Objeto que guarda cada categoria de gasto e seu respectivo valor inicial.
let gastos = {
    "Alimentação": 1000,
    "Transporte": 600,
    "Moradia": 700

}

// Pergunta quantas novas entradas de gasto serão informadas.
let qtdCategorias = await number({ message: "Digite quantas categorias deseja registrar: " })

// Repete a coleta de dados a quantidade de vezes indicada pelo usuário.
for (let i = 0; i < qtdCategorias; i++) {
    let nomeCategoria = await input({ message: "Digite a categoria do gasto: " })
    let valorGasto = await number({ message: "Digite o valor do gasto: ", step: 0.01 })


    // Se a categoria já tiver um valor diferente de zero, soma o novo gasto a ele.
    // Caso contrário, cria/define a propriedade com o valor informado.
    if (gastos[nomeCategoria]) {
        gastos[nomeCategoria] += valorGasto
    } else {
        gastos[nomeCategoria] = valorGasto
    }
}

// Prepara os acumuladores para calcular o total e identificar a maior categoria.
console.log("GASTOS DO MÊS")

let totalGasto = 0
let maiorGastoValor = Object.values(gastos)[0]
let maiorGastoCategoria = Object.keys(gastos)[0]

// Percorre as categorias, mostra cada valor e atualiza os cálculos.
for (const categoria in gastos) {
    // Formata o valor de cada categoria como moeda brasileira.
    console.log(`${categoria} - ${gastos[categoria].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`)

    // Soma o valor atual ao total acumulado.
    totalGasto += gastos[categoria]

    // Quando encontra um valor maior, guarda também a categoria correspondente.
    if (gastos[categoria] > maiorGastoValor){
        maiorGastoValor = gastos[categoria]
        maiorGastoCategoria = categoria
    }
}

// Apresenta o total e a categoria de maior gasto encontrados durante a iteração.
console.log(`
    GASTO TOTAL: ${totalGasto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}

    MAIOR GASTO: ${maiorGastoCategoria} - ${maiorGastoValor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    `)