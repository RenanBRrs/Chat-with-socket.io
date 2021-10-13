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
import api from './config/configAPI';

let socket;

function App() {
  const ENDPOINT = 'http://localhost:8080/';

  const [logado, setLogado] = useState(false);
  const [usuarioId, setUsuarioId] = useState('');
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
  const conectarSala = async (e) => {
    e.preventDefault();

    console.log('Voce acessou a sala ' + sala + ' com o usuario ' + email);

    const headers = {
      'Content-Type': 'application/json',
    };

    await api
      .post('/validar-acesso', { email }, { headers })
      .then((response) => {
        console.log(response.data.usuario.id);
        console.log(response.data.usuario.nome);
        console.log(response.data.mensagem);
        setNome(response.data.usuario.nome);
        setUsuarioId(response.data.usuario.id);
        setLogado(true);
        socket.emit('sala_conectar', sala);
        listarMensagens();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.mensagem);
        } else {
          console.log('Erro: Tente mais tarde. ');
        }
      });
  };

  const listarMensagens = async () => {
    await api
      .get('/listar-mensagens/' + sala)
      .then((response) => {
        console.log(response);
        console.log(response.data.mensagens);
        // setListaMensagem([...listaMensagem, response.data.mensagens]);
        setListaMensagem(response.data.mensagens);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.mensagem);
        } else {
          console.log('Erro: Tente mais tarde!');
        }
      });
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();
    console.log('Mensagem ' + mensagem);
    const conteudoMensagem = {
      sala,
      conteudo: {
        mensagem,
        usuario: {
          id: usuarioId,
          nome,
        },
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
            <ImgUsuario src='kratos.png' alt={nome} />
            <NomeUsuario>{nome}</NomeUsuario>
          </HeaderChat>
          <ChatBox>
            {listaMensagem.map((msg, key) => {
              return (
                <>
                  {usuarioId === msg.usuario.id ? (
                    <MsgEnviada key={key}>
                      <DetMsgEnviada>
                        <TextoMsgEnviada>
                          {msg.usuario.nome} diz: {msg.mensagem}
                        </TextoMsgEnviada>
                      </DetMsgEnviada>
                    </MsgEnviada>
                  ) : (
                    <MsgRecebida key={key}>
                      <DetMsgRecebida>
                        <TextoMsg>
                          {msg.usuario.nome} diz: {msg.mensagem}
                        </TextoMsg>
                      </DetMsgRecebida>
                    </MsgRecebida>
                  )}
                </>
              );
            })}
          </ChatBox>
          <EnviarMsg onSubmit={enviarMensagem}>
            <CampoMsg
              type='text'
              name='mensagem'
              placeholder='Mensagem...'
              value={mensagem}
              onChange={(texto) => {
                setMensagem(texto.target.value);
              }}
            />
            <BtnEnviarMsg>Enviar</BtnEnviarMsg>
          </EnviarMsg>
        </ConteudoChat>
      )}
    </Container>
  );
}

export default App;
