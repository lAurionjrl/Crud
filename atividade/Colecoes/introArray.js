import { input, number } from "@inquirer/prompts"
// 1. Crie uma lista de animais que contenha pelo menos 5 animais. Imprima a lista completa na tela.

let animais = ["Papagaio", "Ovelha", "Cachorro", "Gato", "Leão", "Macaco", "Arara", "Urso"]

console.log(animais)
console.log("------------------------------------")
// 2. Permita que o usuário escreva o nome de um novo animal e adicione na lista. Imprima a nova lista. (.push())

let novoAnimal = await input({ message: "Digite o nome de um animal: " })

animais.push(novoAnimal)

console.log(animais)

console.log("------------------------------------")
// 3. Imprima o primeiro animal da lista, o último animal da lista e o animal da posição 3

console.log(animais[0])

console.log(animais[animais.length - 1])

console.log(animais[2])
console.log("------------------------------------")
// 4. Imprima a lista de animais de forma numerada. (Use o for) 
// Ex:
// 1. Leão
// 2. Cachorro
// ...

for (let i = 0; i < animais.length; i++) {
    console.log(`${i + 1}. ${animais[i]}`)

}

// let contador = 1
// for (const animal of animais){
//     console.log(`${contador} ${animal}`)
//     contador += 1
// }



animais.forEach((animal,i) => {
    console.log(`${i+1} ${animal}`)
})
console.log("------------------------------------")
// 5. Imprima somente os animais que começarem com vogais

// for (let i = 0; i < animais.length; i++) {

//     if (animais[i][0] == "A" || animais[i][0] == "E" || animais[i][0] == "I" || animais[i][0] == "O" || animais[i][0] == "U")
//         console.log(`${i + 1}. ${animais[i]}`)
// }

for (let i = 0; i < animais.length; i++) {

    if (["A","E","I","O","U"].includes(animais[i][0].toUpperCase()))
        console.log(`${i + 1}. ${animais[i]}`)
}





