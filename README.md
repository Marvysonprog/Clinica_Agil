## Sistema de Clínica de Consultas

Descrição do Projeto:

Este projeto é um sistema de agendamento de consultas para uma clínica, desenvolvido em Node.js. Ele possibilita o registro de pacientes, a marcação de consultas e o cancelamento de consultas, tudo por meio de um menu interativo no terminal. Os dados são armazenados em arquivos JSON para garantir a persistência entre as execuções do programa.

## Funcionalidades

1. **Cadastrar um Paciente**

    - Solicita o nome e o número de telefone do paciente.
    Checa se o paciente já está registrado pelo telefone.
    Adiciona o paciente à lista de pacientes registrados e armazena no arquivo pacientes.json.
    Agendamento de Consultas.

2. **Marcar consulta - Exibe uma lista numerada de pacientes cadastrados.**
    
    - Solicita o dia, a hora e a especialidade médica desejada para a consulta.
    Confirma que a data e hora não conflitam com outros agendamentos e que não são retroativas.
    Adiciona o agendamento à lista de consultas e salva no arquivo agendamentos.json.

3. **Cancelamento de Consultas**

    - Mostra uma lista numerada dos agendamentos atuais.
    Permite escolher um agendamento para cancelar.
    Remove o agendamento escolhido da lista e salva as mudanças.

4. **Sair**

    - Finaliza o programa, assegurando que os dados sejam gravados nos arquivos JSON.

### Estrutura do Projeto ###
    
    - index.js: Código central do sistema.
    - data/pacientes.json: Arquivo JSON utilizado para armazenar as informações dos pacientes.
    - data/agendamentos.json: Arquivo JSON utilizado para armazenar as informações dos agendamentos.

### Design da Solução e Decisões Tomadas ###

**Persistência de Dados**

    - Escolhi armazenar os dados em arquivos JSON (pacientes.json e agendamentos.json) para assegurar a persistência dos dados entre as execuções do programa. As funções carregarDados e salvarDados são encarregadas de ler e escrever esses arquivos, respectivamente.

**Menu Interativo**

    - Usei o pacote readline-sync para desenvolver um menu interativo no terminal. Esse pacote simplifica a entrada de dados pelo usuário e proporciona uma navegação intuitiva pelas opções do sistema.

**Tratamento de Erros**

    - Registro de Pacientes: Verificamos se o número de telefone já está cadastrado para evitar duplicações. Se um paciente já estiver registrado, exibimos uma mensagem de erro.

    - Agendamento de Consultas: Verificamos se a data e hora da consulta não entram em conflito com outros agendamentos e se não são retroativas. Se houver algum problema, exibimos uma mensagem de erro.

    - Cancelamento de Consultas: Validamos se o índice do agendamento selecionado é válido antes de permitir o cancelamento.

**Interface de Usuário**

    - O menu de usuário utiliza uma interface de texto simples, projetada para ser acessível a qualquer pessoa, independentemente de conhecimentos técnicos. Cada funcionalidade é apresentada de forma clara e acessível.

### Fluxo do Programa ###

1. Início: Ao iniciar o programa, os dados dos pacientes e agendamentos são carregados dos arquivos JSON.

2. Menu: O usuário tem à disposição as opções de registrar pacientes, marcar consultas, cancelar consultas e sair.

3. Funcionalidades: O programa realiza a operação selecionada, assegurando o tratamento de erros e a persistência dos dados.

4. Encerramento: Ao encerrar, o programa atualiza e salva os dados nos arquivos JSON.

### Execução do Programa ###

Para executar o programa, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/Marvysonprog/Clinica_Agil.git
```

2. Instale as dependências:

```bash
npm install
```
3. Execute o programa:
```bash
node index.js
```

### Conclusão ###

Este sistema de agendamento de consultas oferece uma solução direta e eficiente para administrar o registro de pacientes e suas consultas em uma clínica. A adoção de Node.js e JSON para armazenamento de dados assegura flexibilidade e facilidade na manutenção. O design do menu interativo promove uma experiência de usuário amigável e intuitiva.