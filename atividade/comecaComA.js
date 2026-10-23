import {input} from "@inquirer/prompts"

let nome = ""

while (nome.startsWith("A") == false){
    nome = await input({message:"Digite um nome com a letra A:"})
}