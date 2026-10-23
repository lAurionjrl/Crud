import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";


let contador = await number
({ message: "Digita um número inicial:" });


while (contador >= 1) {
  console.log(contador);
  contador--; 
}


console.log("Lançamento!");