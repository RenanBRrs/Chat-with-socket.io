import styled from 'styled-components';

export const Container = styled.section`
  background: #fff;
  width: 450px;
  max-width: 450px;
  border-radius: 16px;
  box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),
    0 32px 64px -48px rgba(0, 0, 0, 0.5);
`;
export const Conteudo = styled.section`
  padding: 25px 30px;
`;
export const Header = styled.header`
  font-size: 25px;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
  color: #6fbcde;
`;

export const Form = styled.form`
  margin: 20px 0;
`;

export const Campo = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  position: relative;
`;

export const Label = styled.label`
  margin-bottom: 4px;
  margin-top: 10px;
  color: #6fbcde;
`;

export const Input = styled.input`
  height: 28px;
  width: 350px;
  font-size: 16px;
  padding: 0 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Select = styled.select`
  height: 40px;
  width: 390px;
  font-size: 16px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const BtnAcessar = styled.button`
  border: none;
  color: #fff;
  font-size: 17px;
  background: #6fbcde;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  margin-top: 13px;
`;

export const ConteudoChat = styled.section`
  padding: 25px 0px;
`;
export const HeaderChat = styled.header`
  width: 450px;
  display: flex;
  align-items: center;
  padding: 18px 30px;
  color: #6fbcde;
`;

export const ImgUsuario = styled.img`
  height: 45px;
  width: 45px;
  margin: 0 15px;
`;

export const NomeUsuario = styled.div`
  font-size: 17px;
  font-weight: 500;
`;
export const ChatBox = styled.div`
  position: relative;
  min-height: 390px;
  max-height: 390px;
  overflow-y: auto;
  padding: 10px 10px 20px 10px;
  background-color: #f7f7f7;
  box-shadow: inset 0 32px 32px -32px rgba(0 0 0 / 5%),
    inset 0 32px 32px -32px rgba(0 0 0 / 5%);
`;
export const MsgEnviada = styled.div`
  margin: 15px 19px 15px 0;
  display: flex;
`;
export const DetMsgEnviada = styled.div`
  margin-left: auto;
  max-width: calc(100%-130px);
`;

export const TextoMsgEnviada = styled.p`
  background-color: #6fbcde;
  color: #fff;
  border-radius: 18px 18px 0 18px;
  word-wrap: break-word;
  padding: 8px 16px;
  box-shadow: 0 0 32px rgba(0 0 0 / 8%), 0rem 16px 16px -16px rgba(0 0 0 / 10%);
`;

export const MsgRecebida = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: flex-end;
`;

export const DetMsgRecebida = styled.div`
  margin-right: auto;
  margin-left: 10px;
  max-width: calc(100%-130px);
`;

export const TextoMsg = styled.p`
  background: #58b666;
  color: #fff;
  border-radius: 18px 18px 0;
  word-wrap: break-word;
  padding: 8px 16px;
  box-shadow: 0 0 32px rgba(0 0 0 / 8%), 0rem 16px 16px -16px rgba(0 0 0 / 10%);
`;

export const EnviarMsg = styled.div`
  padding: 18px 15px;
  display: flex;
  justify-content: space-between;
`;
export const CampoMsg = styled.input`
  height: 45px;
  width: calc(100%-62px);
  font-size: 26.5px;
  padding: 0 13px;
  border: 1px solid #e6e6e6;
  outline: none;
  border-radius: 5px 0 0 5px;
`;

export const BtnEnviarMsg = styled.button`
  color: #fff;
  width: 75px;
  border: none;
  outline: none;
  background: #6fbcde;
  font-size: 19px;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
`;
