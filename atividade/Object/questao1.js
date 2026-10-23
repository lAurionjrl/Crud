import { input, number } from "@inquirer/prompts"

let nome = await input({message:"Digite seu nome: "})
let idade = await number({message:"Digite seu idade: "})
let cidade = await input({message:"Digite seu cidade: "})
let estado = await input({message:"Digite seu estado: "})

let pessoa = {
    "nome": nome,
    "idade": idade,
    "cidade": cidade,
    "estado": estado
}

// let pessoaAlternativo = {
//     nome,
//     idade,
//     cidade
// }

console.log(pessoa) // Object object

console.log("FICHA DO CLIENTE")

for(const info in pessoa){
    console.log(`${info.toUpperCase()} - ${pessoa[info]}`)
}