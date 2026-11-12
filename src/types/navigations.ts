export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipoPerfil: 'Cidadao' | 'Voluntario';
  pontosReciclagem: number;
}

export interface PontoColeta {
  id: string;
  nome: string;
  categoria: string;
  endereco: string;
  bairro: string;
  horarioFuncionamento: string;
  latitude: number;
  longitude: number;
  imagemUri: string;
  telefoneContato: string;
  aceitaEntulho: boolean;
  materiaisResumo?: string;
  destaqueSocial?: string;
}

export type BottomTabParamList = {
  Explorar: undefined;
  Mapa: undefined;
  Favoritos: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  MainTabs: undefined;
  DetalhesEcoponto: { ponto: PontoColeta };
};
