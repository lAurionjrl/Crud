function cadastrar(e){
    e.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value
    const tel = document.getElementById("tel").value
    const estadoCivil = document.querySelector("input[name='estado-civil']:checked").value 

    if (!nome || !cargo || !email || !cpf || !tel || !estadoCivil){
        alert("Alguma das informações ficou em branco!")
        return
    }


    alert(`Cadastro Realizado
        
        Nome: ${nome}
        Cargo: ${cargo}
        Email: ${email}
        `);

    // Reset manual, capturando cada input e substituindo seu valor por nada
    // document.getElementById("nome").value = ""

    // Utilizando o evento que ativou a função. Capturando a origem do evento e rodando reset()
    // e.target.reset()

    // Captura o formulário e roda sua função de reset
    document.getElementById("form-cadastro").reset()


    // Mostrar o funcionário no HTML

    const listaFunc = document.getElementById("lista-funcionarios")
        
    const novoFuncionario = document.createElement("li")
    novoFuncionario.innerHTML = `Nome - ${nome} | Cargo - ${cargo} | Email - ${email} | `

    const botaoRemover = document.createElement("button")
    botaoRemover.textContent = "REMOVER"
    botaoRemover.onclick = () => {novoFuncionario.remove()}
    novoFuncionario.appendChild(botaoRemover)

    // <button onclick="this.parentElement.remove()">REMOVER</button>
    
    // if (estadoCivil == "Solteiro"){
    //     novoFuncionario.classList.add("funcionario-solteiro")
    // } else if (estadoCivil == "Casado"){
    //     novoFuncionario.classList.add("funcionario-casado")
    // }else {
    //     novoFuncionario.classList.add("funcionario-divorciado")
    // }

    novoFuncionario.classList.add(`funcionario-${estadoCivil.toLowerCase()}`)

    listaFunc.appendChild(novoFuncionario)
}