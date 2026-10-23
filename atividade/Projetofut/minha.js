import { select, input, confirm } from '@inquirer/prompts';


/*
  Fontes: MDN > JavaScript > Reference > Global_Objects > Array (find, filter, map, sort, push)
          MDN > JavaScript > Reference > Global_Objects > RegExp > test
*/

let times = [];
let jogadores = [];
let partidas = [];

let idTime = 1;
let idJogador = 1;
let idPartida = 1;

const posicoes = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meio-campista', 'Atacante'];

// pega o nome do time pelo id
function nomeDoTime(id) {
  const time = times.find((t) => t.id === id);
  if (time) {
    return time.nome;
  }
  return '(time removido)';
}

// mostra os times

async function escolherTime(mensagem, ignorarId) {
  const lista = times.filter((t) => t.id !== ignorarId);

  if (lista.length === 0) {
    console.log('Nenhum time disponível. Cadastre times primeiro.');
    return null;
  }

  return await select({
    message: mensagem,
    choices: lista.map((t) => ({ name: `#${t.id} - ${t.nome}`, value: t.id })),
  });
}

async function escolherJogador() {
  if (jogadores.length === 0) {
    console.log('Nenhum jogador cadastrado.');
    return null;
  }

  return await select({
    message: 'Escolha o jogador:',
    choices: jogadores.map((j) => ({
      name: `#${j.id} - ${j.nome} (${j.posicao}, ${nomeDoTime(j.timeId)})`,
      value: j.id,
    })),
  });
}

// só aceita número inteiro (0 ou mais)
function validarNumero(texto) {
  if (/^\d+$/.test(texto.trim())) {
    return true;
  }
  return 'Digite um número inteiro (0 ou mais).';
}

function validarTexto(texto) {
  if (texto.trim() !== '') {
    return true;
  }
  return 'Esse campo é obrigatório.';
}

//TIMES 

async function cadastrarTime() {
  const nome = await input({ message: 'Nome do time:', validate: validarTexto });
  const cidade = await input({ message: 'Cidade:', validate: validarTexto });

  times.push({ id: idTime, nome: nome.trim(), cidade: cidade.trim() });
  idTime++;

  console.log('Time cadastrado!');
}

function listarTimes() {
  if (times.length === 0) {
    console.log('Nenhum time cadastrado.');
    return;
  }
  console.table(times);
}

async function atualizarTime() {
  const id = await escolherTime('Qual time quer atualizar?');
  if (id === null) return;

  const time = times.find((t) => t.id === id);

  time.nome = (await input({ message: 'Novo nome:', default: time.nome, validate: validarTexto })).trim();
  time.cidade = (await input({ message: 'Nova cidade:', default: time.cidade, validate: validarTexto })).trim();

  console.log('Time atualizado!');
}

async function removerTime() {
  const id = await escolherTime('Qual time quer remover?');
  if (id === null) return;

  const certeza = await confirm({
    message: 'Isso apaga também os jogadores e as partidas desse time. Continuar?',
    default: false,
  });
  if (!certeza) return;

  times = times.filter((t) => t.id !== id);
  jogadores = jogadores.filter((j) => j.timeId !== id);
  partidas = partidas.filter((p) => p.mandanteId !== id && p.visitanteId !== id);

  console.log('Time removido!');
}

async function menuTimes() {
  const opcao = await select({
    message: 'TIMES',
    choices: [
      { name: 'Cadastrar', value: 'cadastrar' },
      { name: 'Listar', value: 'listar' },
      { name: 'Atualizar', value: 'atualizar' },
      { name: 'Remover', value: 'remover' },
      { name: 'Voltar', value: 'voltar' },
    ],
  });

  if (opcao === 'cadastrar') await cadastrarTime();
  if (opcao === 'listar') listarTimes();
  if (opcao === 'atualizar') await atualizarTime();
  if (opcao === 'remover') await removerTime();
}

//JOGADORES 
async function cadastrarJogador() {
  const timeId = await escolherTime('Time do jogador:');
  if (timeId === null) return;

  const nome = await input({ message: 'Nome do jogador:', validate: validarTexto });
  const posicao = await select({
    message: 'Posição:',
    choices: posicoes.map((p) => ({ name: p, value: p })),
  });

  jogadores.push({ id: idJogador, nome: nome.trim(), posicao: posicao, timeId: timeId });
  idJogador++;

  console.log('Jogador cadastrado!');
}

function listarJogadores() {
  if (jogadores.length === 0) {
    console.log('Nenhum jogador cadastrado.');
    return;
  }

  // map: transforma cada jogador numa linha da tabela, trocando timeId pelo nome do time
  const tabela = jogadores.map((j) => ({
    id: j.id,
    nome: j.nome,
    posicao: j.posicao,
    time: nomeDoTime(j.timeId),
  }));
  console.table(tabela);
}

async function atualizarJogador() {
  const id = await escolherJogador();
  if (id === null) return;

  const jogador = jogadores.find((j) => j.id === id);

  jogador.nome = (await input({ message: 'Novo nome:', default: jogador.nome, validate: validarTexto })).trim();
  jogador.posicao = await select({
    message: 'Nova posição:',
    default: jogador.posicao,
    choices: posicoes.map((p) => ({ name: p, value: p })),
  });

  const novoTime = await escolherTime('Novo time:');
  if (novoTime !== null) {
    jogador.timeId = novoTime;
  }

  console.log('Jogador atualizado!');
}

async function removerJogador() {
  const id = await escolherJogador();
  if (id === null) return;

  const certeza = await confirm({ message: 'Tem certeza?', default: false });
  if (!certeza) return;

  jogadores = jogadores.filter((j) => j.id !== id);
  console.log('Jogador removido!');
}

async function menuJogadores() {
  const opcao = await select({
    message: 'JOGADORES',
    choices: [
      { name: 'Cadastrar', value: 'cadastrar' },
      { name: 'Listar', value: 'listar' },
      { name: 'Atualizar', value: 'atualizar' },
      { name: 'Remover', value: 'remover' },
      { name: 'Voltar', value: 'voltar' },
    ],
  });

  if (opcao === 'cadastrar') await cadastrarJogador();
  if (opcao === 'listar') listarJogadores();
  if (opcao === 'atualizar') await atualizarJogador();
  if (opcao === 'remover') await removerJogador();
}

//PARTIDAS 

async function cadastrarPartida() {
  if (times.length < 2) {
    console.log('Cadastre pelo menos 2 times primeiro.');
    return;
  }

  const mandanteId = await escolherTime('Time mandante:');
  // o segundo parâmetro tira o mandante da lista, pra um time não jogar contra ele mesmo
  const visitanteId = await escolherTime('Time visitante:', mandanteId);

  const golsMandante = await input({ message: `Gols do ${nomeDoTime(mandanteId)}:`, validate: validarNumero });
  const golsVisitante = await input({ message: `Gols do ${nomeDoTime(visitanteId)}:`, validate: validarNumero });

  partidas.push({
    id: idPartida,
    mandanteId: mandanteId,
    visitanteId: visitanteId,
    golsMandante: Number(golsMandante),
    golsVisitante: Number(golsVisitante),
  });
  idPartida++;

  console.log('Partida registrada!');
}

function listarPartidas() {
  if (partidas.length === 0) {
    console.log('Nenhuma partida cadastrada.');
    return;
  }

  const tabela = partidas.map((p) => ({
    id: p.id,
    mandante: nomeDoTime(p.mandanteId),
    placar: `${p.golsMandante} x ${p.golsVisitante}`,
    visitante: nomeDoTime(p.visitanteId),
  }));
  console.table(tabela);
}

// ATUALIZAR PARTIDA
async function atualizarPartida() {
  if (partidas.length === 0) {
    console.log('Nenhuma partida cadastrada.');
    return;
  }

  const id = await select({
    message: 'Escolha a partida para atualizar:',
    choices: partidas.map((p) => ({
      name: `${nomeDoTime(p.mandanteId)} ${p.golsMandante} x ${p.golsVisitante} ${nomeDoTime(p.visitanteId)}`,
      value: p.id,
    })),
  });

  const partida = partidas.find((p) => p.id === id);

  const golsMandante = await input({
    message: `Novos gols do ${nomeDoTime(partida.mandanteId)}:`,
    default: String(partida.golsMandante),
    validate: validarNumero,
  });

  const golsVisitante = await input({
    message: `Novos gols do ${nomeDoTime(partida.visitanteId)}:`,
    default: String(partida.golsVisitante),
    validate: validarNumero,
  });

  partida.golsMandante = Number(golsMandante);
  partida.golsVisitante = Number(golsVisitante);

  console.log('Partida atualizada!');
}

// REMOVER PARTIDA
async function removerPartida() {
  if (partidas.length === 0) {
    console.log('Nenhuma partida cadastrada.');
    return;
  }

  const id = await select({
    message: 'Escolha a partida para remover:',
    choices: partidas.map((p) => ({
      name: `${nomeDoTime(p.mandanteId)} ${p.golsMandante} x ${p.golsVisitante} ${nomeDoTime(p.visitanteId)}`,
      value: p.id,
    })),
  });

  const certeza = await confirm({ message: 'Tem certeza?', default: false });
  if (!certeza) return;

  partidas = partidas.filter((p) => p.id !== id);
  console.log('Partida removida!');
}

async function menuPartidas() {
  const opcao = await select({
    message: 'PARTIDAS',
    choices: [
      { name: 'Cadastrar', value: 'cadastrar' },
      { name: 'Listar', value: 'listar' },
      { name: 'Atualizar placar', value: 'atualizar' },
      { name: 'Remover', value: 'remover' },
      { name: 'Voltar', value: 'voltar' },
    ],
  });

  if (opcao === 'cadastrar') await cadastrarPartida();
  if (opcao === 'listar') listarPartidas();
  if (opcao === 'atualizar') await atualizarPartida();
  if (opcao === 'remover') await removerPartida();
}

//PONTUAÇÃO 

async function mostrarPontuacao() {
  if (times.length === 0) {
    console.log('Nenhum time cadastrado.');
    return;
  }

  const tabela = times.map((t) => ({
    id: t.id,
    time: t.nome,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    saldoGols: 0,
  }));

  for (const p of partidas) {
    const mandante = tabela.find((t) => t.id === p.mandanteId);
    const visitante = tabela.find((t) => t.id === p.visitanteId);

    if (mandante && visitante) {
      mandante.jogos++;
      visitante.jogos++;

      mandante.saldoGols += p.golsMandante - p.golsVisitante;
      visitante.saldoGols += p.golsVisitante - p.golsMandante;

      if (p.golsMandante > p.golsVisitante) {
        mandante.vitorias++;
        mandante.pontos += 3;
        visitante.derrotas++;
      } else if (p.golsMandante < p.golsVisitante) {
        visitante.vitorias++;
        visitante.pontos += 3;
        mandante.derrotas++;
      } else {
        mandante.empates++;
        mandante.pontos += 1;
        visitante.empates++;
        visitante.pontos += 1;
      }
    }
  }

  tabela.sort((a, b) => {
    if (b.pontos !== a.pontos) {
      return b.pontos - a.pontos;
    }
    return b.saldoGols - a.saldoGols;
  });

  const tabelaFinal = tabela.map(({ id, ...resto }) => resto);
  console.table(tabelaFinal);
}

//MENU PRINCIPAL 

async function main() {
  console.log('=== CAMPEONATO DE FUTEBOL ===');

  let rodando = true;

  while (rodando) {
    const opcao = await select({
      message: 'Menu principal',
      choices: [
        { name: 'Times', value: 'times' },
        { name: 'Jogadores', value: 'jogadores' },
        { name: 'Partidas', value: 'partidas' },
        { name: 'Pontuação', value: 'pontuacao' },
        { name: 'Sair', value: 'sair' },
      ],
    });

    if (opcao === 'times') await menuTimes();
    if (opcao === 'jogadores') await menuJogadores();
    if (opcao === 'partidas') await menuPartidas();
    if (opcao === 'pontuacao') await mostrarPontuacao();
    if (opcao === 'sair') rodando = false;
  }

  console.log('Até logo!');
}

main();