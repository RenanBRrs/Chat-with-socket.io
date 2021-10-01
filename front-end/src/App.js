import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import {
  Container,
  Conteudo,
  Header,
  Form,
  Campo,
  Label,
  Input,
  Select,
  BtnAcessar,
  BtnEnviar,
  HeaderChat,
  ImgUsuario,
} from './styles/styles';

let socket;

function App() {
  const ENDPOINT = 'http://localhost:8080/';

  // const [logado, setLogado] = useState(false);
  // const [nome, setNome] = useState('');
  // const [sala, setSala] = useState('');

  const [logado, setLogado] = useState(true);
  const [nome, setNome] = useState('Renan');
  const [sala, setSala] = useState('1');

  const [mensagem, setMensagem] = useState('');
  const [listaMensagem, setListaMensagem] = useState([]);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
  }, []);
  useEffect(() => {
    socket.on('receber_mensagem', (dados) => {
      setListaMensagem([...listaMensagem, dados]);
    });
  });
  const conectarSala = () => {
    console.log('Voce acessou a sala ' + sala + ' com o usuario ' + nome);
    setLogado(true);
    socket.emit('sala_conectar', sala);
  };

  const enviarMensagem = async () => {
    console.log('Mensagem ' + mensagem);
    const conteudoMensagem = {
      sala,
      conteudo: {
        nome,
        mensagem,
      },
    };
    console.log(conteudoMensagem);

    await socket.emit('enviar_mensagem', conteudoMensagem);
    setListaMensagem([...listaMensagem, conteudoMensagem.conteudo]);
    setMensagem('');
  };
  return (
    <Container>
      {!logado ? (
        <Conteudo>
          <Header>My chat about coding...</Header>
          <Form>
            <Campo>
              <Label>Nome </Label>
              <Input
                type='text'
                placeholder='Nome'
                name='nome'
                value={nome}
                onChange={(texto) => {
                  setNome(texto.target.value);
                }}
              />
            </Campo>
            <Campo>
              <Label>Sala </Label>
              {/* <input
            type='text'
            placeholder='Sala'
            name='sala'
            value={sala}
            onChange={(text) => {
              setSala(text.target.value);
            }}
          /> */}

              <Select
                name='sala'
                value={sala}
                onChange={(texto) => setSala(texto.target.value)}>
                <option value=''>Selecione</option>
                <option value='1'>Node</option>
                <option value='2'>React</option>
                <option value='3'>React Native</option>
                <option value='4'>PHP</option>
              </Select>
            </Campo>
            <BtnAcessar onClick={conectarSala}>Acessar</BtnAcessar>
          </Form>
        </Conteudo>
      ) : (
        <Conteudo>
          <HeaderChat>
            <ImgUsuario src='renan.jpg' alt={nome} />
          </HeaderChat>
          {listaMensagem.map((msg, key) => {
            return (
              <div key={key}>
                {msg.nome}: {msg.mensagem}
              </div>
            );
          })}
          <Input
            type='text'
            name='mensagem'
            placeholder='Mensagem...'
            value={mensagem}
            onChange={(texto) => {
              setMensagem(texto.target.value);
            }}
          />
          <BtnEnviar onClick={enviarMensagem}>Enviar</BtnEnviar>
        </Conteudo>
      )}
    </Container>
  );
}

export default App;
