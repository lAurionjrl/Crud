import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";


const numero = await number({ 
    message: "Digite um número:" });

const limite = await number({ 
    message: "Digite o número da tabuada:" });


for (let i = 1; i <= limite; i++) {
  console.log(`${numero} x ${i} = ${numero * i}`);
}