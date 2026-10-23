import { select, input, confirm } from '@inquirer/prompts';

/*
Fontes: MDN > JavaScript > Reference > Global_Objects > Array (find, filter, map, sort, push)
MDN > JavaScript > Reference > Global_Objects > RegExp > test
*/

// Dados guardados de tudo 
let times = [];
let jogadores = [];
let partidas = [];
let proximoId = { time: 1, jogador: 1, partida: 1 };

const POSICOES = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meio-campista', 'Atacante'];

const obrigatorio = (v) => v.trim() !== '' || 'Campo obrigatório.';
const numero = (v) => /^\d+$/.test(v.trim()) || 'Digite um número inteiro (0 ou mais).';

function nomeTime(id) {
  const t = times.find((t) => t.id === id);
  return t ? t.nome : '(removido)';
}

async function escolherTime(msg, ignorarId) {
  const lista = times.filter((t) => t.id !== ignorarId);
  if (lista.length === 0) {
    console.log('\nNenhum time disponível.\n');
    return null;
  }
  return select({
    message: msg,
    choices: lista.map((t) => ({ name: `#${t.id} - ${t.nome}`, value: t.id })),
  });
}

async function escolherJogador() {
  if (jogadores.length === 0) {
    console.log('\nNenhum jogador cadastrado.\n');
    return null;
  }
  return select({
    message: 'Escolha o jogador:',
    choices: jogadores.map((j) => ({
      name: `#${j.id} - ${j.nome} (${j.posicao}, ${nomeTime(j.timeId)})`,
      value: j.id,
    })),
  });
}

async function escolherPartida() {
  if (partidas.length === 0) {
    console.log('\nNenhuma partida cadastrada.\n');
    return null;
  }
  return select({
    message: 'Escolha a partida:',
    choices: partidas.map((p) => ({
      name: `#${p.id} - ${nomeTime(p.mandanteId)} ${p.golsMandante} x ${p.golsVisitante} ${nomeTime(p.visitanteId)}`,
      value: p.id,
    })),
  });
}

const menuCrud = (titulo, nome) =>
  select({
    message: titulo,
    choices: [
      { name: `Cadastrar ${nome}`, value: 'criar' },
      { name: `Listar ${nome}s`, value: 'listar' },
      { name: `Atualizar ${nome}`, value: 'atualizar' },
      { name: `Remover ${nome}`, value: 'remover' },
      { name: 'Voltar', value: 'voltar' },
    ],
  });

// Times
async function menuTimes() {
  const op = await menuCrud('TIMES', 'time');

  if (op === 'criar') {
    const nome = (await input({ message: 'Nome do time:', validate: obrigatorio })).trim();
    const cidade = (await input({ message: 'Cidade:', validate: obrigatorio })).trim();
    times.push({ id: proximoId.time++, nome, cidade });
    console.log('\nTime cadastrado!\n');
  }

  if (op === 'listar') {
    if (times.length === 0) console.log('\nNenhum time cadastrado.\n');
    else console.table(times);
  }

  if (op === 'atualizar') {
    const id = await escolherTime('Qual time atualizar?');
    if (id === null) return;
    const t = times.find((t) => t.id === id);
    t.nome = (await input({ message: 'Novo nome:', default: t.nome, validate: obrigatorio })).trim();
    t.cidade = (await input({ message: 'Nova cidade:', default: t.cidade, validate: obrigatorio })).trim();
    console.log('\nTime atualizado!\n');
  }

  if (op === 'remover') {
    const id = await escolherTime('Qual time remover?');
    if (id === null) return;
    if (!(await confirm({ message: 'Remove também jogadores e partidas do time. Continuar?', default: false }))) return;
    times = times.filter((t) => t.id !== id);
    jogadores = jogadores.filter((j) => j.timeId !== id);
    partidas = partidas.filter((p) => p.mandanteId !== id && p.visitanteId !== id);
    console.log('\nTime removido!\n');
  }
}

// Jogadores
async function menuJogadores() {
  const op = await menuCrud('JOGADORES', 'jogador');

  if (op === 'criar') {
    const timeId = await escolherTime('Time do jogador:');
    if (timeId === null) return;
    const nome = (await input({ message: 'Nome do jogador:', validate: obrigatorio })).trim();
    const posicao = await select({
      message: 'Posição:',
      choices: POSICOES.map((p) => ({ name: p, value: p })),
    });
    jogadores.push({ id: proximoId.jogador++, nome, posicao, timeId });
    console.log('\nJogador cadastrado!\n');
  }

  if (op === 'listar') {
    if (jogadores.length === 0) console.log('\nNenhum jogador cadastrado.\n');
    else
      console.table(
        jogadores.map((j) => ({ id: j.id, nome: j.nome, posicao: j.posicao, time: nomeTime(j.timeId) }))
      );
  }

  if (op === 'atualizar') {
    const id = await escolherJogador();
    if (id === null) return;
    const j = jogadores.find((j) => j.id === id);
    j.nome = (await input({ message: 'Novo nome:', default: j.nome, validate: obrigatorio })).trim();
    j.posicao = await select({
      message: 'Nova posição:',
      default: j.posicao,
      choices: POSICOES.map((p) => ({ name: p, value: p })),
    });

    const novoTime = await escolherTime('Novo time:');
    if (novoTime !== null) j.timeId = novoTime;
    console.log('\nJogador atualizado!\n');
  }

  if (op === 'remover') {
    const id = await escolherJogador();
    if (id === null) return;
    if (!(await confirm({ message: 'Confirma a remoção?', default: false }))) return;
    jogadores = jogadores.filter((j) => j.id !== id);
    console.log('\nJogador removido!\n');
  }
}

// partidas
async function menuPartidas() {
  const op = await menuCrud('PARTIDAS', 'partida');

  if (op === 'criar') {
    if (times.length < 2) {
      console.log('\nCadastre pelo menos 2 times primeiro.\n');
      return;
    }
    const mandanteId = await escolherTime('Time mandante:');
    const visitanteId = await escolherTime('Time visitante:', mandanteId);
    const golsMandante = Number(await input({ message: `Gols do ${nomeTime(mandanteId)}:`, validate: numero }));
    const golsVisitante = Number(await input({ message: `Gols do ${nomeTime(visitanteId)}:`, validate: numero }));
    partidas.push({ id: proximoId.partida++, mandanteId, visitanteId, golsMandante, golsVisitante });
    console.log('\nPartida registrada!\n');
  }

  if (op === 'listar') {
    if (partidas.length === 0) console.log('\nNenhuma partida cadastrada.\n');
    else
      console.table(
        partidas.map((p) => ({
          id: p.id,
          mandante: nomeTime(p.mandanteId),
          placar: `${p.golsMandante} x ${p.golsVisitante}`,
          visitante: nomeTime(p.visitanteId),
        }))
      );
  }

  if (op === 'atualizar') {
    const id = await escolherPartida();
    if (id === null) return;
    const p = partidas.find((p) => p.id === id);
    p.golsMandante = Number(
      await input({ message: 'Gols do mandante:', default: String(p.golsMandante), validate: numero })
    );
    p.golsVisitante = Number(
      await input({ message: 'Gols do visitante:', default: String(p.golsVisitante), validate: numero })
    );
    console.log('\nPlacar atualizado!\n');
  }

  if (op === 'remover') {
    const id = await escolherPartida();
    if (id === null) return;
    if (!(await confirm({ message: 'Confirma a remoção?', default: false }))) return;
    partidas = partidas.filter((p) => p.id !== id);
    console.log('\nPartida removida!\n');
  }
}

// Pontuacao
// Vitória = 3 pontos, empate = 1, derrota = 0
function mostrarPontuacao() {
  if (times.length === 0) {
    console.log('\nNenhum time cadastrado.\n');
    return;
  }

  const tabela = times.map((t) => ({
    time: t.nome,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    saldoGols: 0,
    id: t.id,
  }));
  const linha = (id) => tabela.find((l) => l.id === id);

  for (const p of partidas) {
    const m = linha(p.mandanteId);
    const v = linha(p.visitanteId);
    m.jogos++;
    v.jogos++;
    m.saldoGols += p.golsMandante - p.golsVisitante;
    v.saldoGols += p.golsVisitante - p.golsMandante;

    if (p.golsMandante > p.golsVisitante) {
      m.vitorias++;
      m.pontos += 3;
      v.derrotas++;
    } else if (p.golsMandante < p.golsVisitante) {
      v.vitorias++;
      v.pontos += 3;
      m.derrotas++;
    } else {
      m.empates++;
      v.empates++;
      m.pontos++;
      v.pontos++;
    }
  }

  tabela.sort((a, b) => b.pontos - a.pontos || b.saldoGols - a.saldoGols);
  console.log('\n=== CLASSIFICAÇÃO ===');
  console.table(tabela.map(({ id, ...resto }, i) => ({ posicao: i + 1, ...resto })));
}

//MENU PRINCIPAL
async function main() {
  console.log('\n⚽ CAMPEONATO DE FUTEBOL ⚽\n');

  while (true) {
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

    if (opcao === 'sair') break;
    if (opcao === 'times') await menuTimes();
    if (opcao === 'jogadores') await menuJogadores();
    if (opcao === 'partidas') await menuPartidas();
    if (opcao === 'pontuacao') mostrarPontuacao();
  }

  console.log('\nAté logo!\n');
}

main().catch((erro) => {
  if (erro?.name === 'ExitPromptError') console.log('\nPrograma encerrado.\n');
  else console.error(erro);
});