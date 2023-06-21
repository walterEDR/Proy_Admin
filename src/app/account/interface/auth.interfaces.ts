export interface IRegistroUsuario {
  nombre: string;
  email: string;
  password: string;
  paswword2: string;
  terminos: boolean;
}

export interface ILoginUsuario {
  email: string;
  password: string;
  remember: boolean;
}
