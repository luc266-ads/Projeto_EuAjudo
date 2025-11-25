import { Component } from '@angular/core';
import { Api } from '../serviceApi/api';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
 

  constructor() { }
  modoAtual: 'login' | 'cadastro' = 'login';

  mostrarSenha = false;
  mostrarConfirmarSenha = false;

  formLogin = {
    email: '',
    senha: ''
  };

  formCadastro = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  handleLogin() {
    console.log('Login:', this.formLogin);
  }

  handleCadastro() {
    console.log('Cadastro:', this.formCadastro);
  }

}
