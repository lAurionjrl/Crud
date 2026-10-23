import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";

let numeroSecreto = Math.floor(Math.random() * 11) // 0 ao 10

let palpite = 0

do {
    palpite = await number({message:"Digite um número de 0 a 10: "})
}
while(palpite != numeroSecreto)

console.log("Você acertou!")