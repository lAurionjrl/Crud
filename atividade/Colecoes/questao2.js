import { input, number } from "@inquirer/prompts"

let numeros = []

for (let i = 0; i < 5; i++){
    let novoNumero = await number({message:`Digite o ${i+1}º numero:`})
    
    numeros.push(novoNumero)

}

console.log("Números cadastrados:", numeros)

let qtdNumeros = numeros.length
let somaNumeros = 0

for (let i=0; i < qtdNumeros;i++){
    somaNumeros += numeros[i]
}


let mediaNumeros = somaNumeros/qtdNumeros

let menorNumero = numeros[0]

for (let i = 0; i < qtdNumeros; i++){
    if (numeros[i] < menorNumero){
        menorNumero = numeros[i]
    }
}

let maiorNumero = numeros[0]

for (let i = 0; i < qtdNumeros; i++){
    if (numeros[i] > maiorNumero){
        maiorNumero = numeros[i]
    }
}


console.log(`
    Quantidade de Numeros: ${qtdNumeros}
    Soma dos Números: ${somaNumeros}
    Média dos Números: ${mediaNumeros}

    Maior Número: ${maiorNumero}
    Menor Número: ${menorNumero}
    
    `)