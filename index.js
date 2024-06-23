const fs = require('fs');
const rd = require('readline-sync');

function carregarDados(info) {
    try {
        const data = fs.readFileSync(info, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function salvarDados(info, dados) {
    fs.writeFileSync(info, JSON.stringify(dados, null, 2), 'utf8');
}

let pacientes = carregarDados('./data/pacientes.json');
let agendamentos = carregarDados('./data/agendamentos.json');



function cadastroPaciente() {
    const nome = rd.question('Nome do paciente: ');
    const telefone = rd.question('Telefone do paciente: ');

    const pacienteExistente = pacientes.find(p => p.telefone === telefone);
    if (pacienteExistente) {
        console.log('Paciente ja cadastrado!');
    } else {
        pacientes.push({ nome, telefone });
        console.log('Paciente cadastrado com sucesso!');
    }
    menu();
}

function marcarConsulta() {
    if (pacientes.length === 0) {
        console.log('Nenhum paciente cadastrado!');
        return menu();
    }
    console.clear();
    console.log('\n=== Pacientes Cadastrados ===');
    pacientes.forEach((paciente, index) => {
        console.log(`${index + 1}. ${paciente.nome} - ${paciente.telefone}`);
    });

    const pacienteIndex = rd.questionInt('Escolha o numero do paciente: ') - 1;
    if (pacienteIndex < 0 || pacienteIndex >= pacientes.length) {
        console.log('Numero de paciente inválido!');
        return menu();
    }

    const dia = rd.question('Dia da consulta (YYYY-MM-DD): ');
    const hora = rd.question('Hora da consulta (HH:MM): ');
    const especialidade = rd.question('Especialidade desejada: ');

    const dataConsulta = new Date(`${dia}T${hora}:00`);
    const agora = new Date();

    if (dataConsulta <= agora) {
        console.log('Consultas nao podem ser marcadas antes da data atual!');
        return menu();
    }

    const conflito = agendamentos.find(a => a.dia === dia && a.hora === hora);
    if (conflito) {
        console.log('Horario ja agendado!');
        return menu();
    }

    agendamentos.push({
        paciente: pacientes[pacienteIndex].nome,
        dia,
        hora,
        especialidade
    });

    console.log('Consulta agendada com sucesso!');
    menu();
}

function cancelarConsulta() {
    if (agendamentos.length === 0) {
        console.log('Nenhuma consulta agendada!');
        return menu();
    }
    console.clear();
    console.log('\n=== Consultas Agendadas ===');
    agendamentos.forEach((agendamento, index) => {
        console.log(`${index + 1}. ${agendamento.paciente} - ${agendamento.dia} ${agendamento.hora} (${agendamento.especialidade})`);
    });

    const agendamentoIndex = rd.questionInt('Escolha o numero da consulta para cancelar: ') - 1;
    if (agendamentoIndex < 0 || agendamentoIndex >= agendamentos.length) {
        console.log('Numero de consulta invalido!');
        return menu();
    }

    const consulta = agendamentos[agendamentoIndex];
    console.log(`Consulta agendada para ${consulta.dia} ${consulta.hora} (${consulta.especialidade})`);
    const confirmacao = rd.question('Tem certeza que deseja cancelar esta consulta? (s/n): ');

    if (confirmacao.toLowerCase() === 's') {
        agendamentos.splice(agendamentoIndex, 1);
        console.log('Consulta cancelada com sucesso!');
    } else {
        console.log('Cancelamento abortado.');
    }

    menu();
}

function menu() {
    console.log('\n=== Clínica de Consultas ===');
    console.log('1. Cadastrar paciente');
    console.log('2. Marcar consulta');
    console.log('3. Cancelar consulta');
    console.log('4. Sair');
    const escolha = rd.question('Escolha uma opcao: ');

    switch (escolha) {
        case '1':
            cadastroPaciente();
            break;
        case '2':
            marcarConsulta();
            break;
        case '3':
            cancelarConsulta();
            break;
        case '4':
            console.log('Finalizando o programa...');
            salvarDados('./data/pacientes.json', pacientes);
            salvarDados('./data/agendamentos.json', agendamentos);
            process.exit(0);
        default:
            console.log('Opção invalida!');
            menu();
    }
}


menu();

