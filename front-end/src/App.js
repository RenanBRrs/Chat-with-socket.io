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
  HeaderChat,
  ImgUsuario,
  NomeUsuario,
  ChatBox,
  ConteudoChat,
  MsgEnviada,
  DetMsgEnviada,
  TextoMsgEnviada,
  MsgRecebida,
  DetMsgRecebida,
  TextoMsg,
  EnviarMsg,
  CampoMsg,
  BtnEnviarMsg,
} from './styles/styles';

let socket;

function App() {
  const ENDPOINT = 'http://localhost:8080/';

  const [logado, setLogado] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sala, setSala] = useState('');

  // const [logado, setLogado] = useState(true);
  // const [nome, setNome] = useState('Renan');
  // const [sala, setSala] = useState('1');

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
  const conectarSala = async e => {
    e.preventDefault();

    console.log('Voce acessou a sala ' + sala + ' com o usuario ' + email);
    // setLogado(true);
    // socket.emit('sala_conectar', sala);
  };

  const enviarMensagem = async () => {
    console.log('Mensagem ' + mensagem);
    const conteudoMensagem = {
      sala,
      conteudo: {
        email,
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
          <Form onSubmit={conectarSala}>
            <Campo>
              <Label>E-mail </Label>
              <Input
                type='text'
                placeholder='E-mail'
                name='email'
                value={email}
                onChange={(texto) => {
                  setEmail(texto.target.value);
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
            <BtnAcessar>Acessar</BtnAcessar>
          </Form>
        </Conteudo>
      ) : (
        <ConteudoChat>
          <HeaderChat>
            <ImgUsuario src='kratos.png' alt={email} />
            <NomeUsuario>{nome}</NomeUsuario>
          </HeaderChat>
          <ChatBox>
            {listaMensagem.map((msg, key) => {
              return (
                <>
                  {email === msg.email ? (
                    <MsgEnviada key={key}>
                      <DetMsgEnviada>
                        <TextoMsgEnviada>
                          {msg.email} diz: {msg.mensagem}
                        </TextoMsgEnviada>
                      </DetMsgEnviada>
                    </MsgEnviada>
                  ) : (
                    <MsgRecebida key={key}>
                      <DetMsgRecebida>
                        <TextoMsg>
                          {msg.email} diz: {msg.mensagem}
                        </TextoMsg>
                      </DetMsgRecebida>
                    </MsgRecebida>
                  )}
                </>
              );
            })}
          </ChatBox>
          <EnviarMsg>
            <CampoMsg
              type='text'
              name='mensagem'
              placeholder='Mensagem...'
              value={mensagem}
              onChange={(texto) => {
                setMensagem(texto.target.value);
              }}
            />
            <BtnEnviarMsg onClick={enviarMensagem}>Enviar</BtnEnviarMsg>
          </EnviarMsg>
        </ConteudoChat>
      )}
    </Container>
  );
}

export default App;
