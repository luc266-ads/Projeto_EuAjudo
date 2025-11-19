import { Component } from '@angular/core';
import { Api } from '../serviceApi/api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

 usuario: { nome: string; email: string; senha: string ; cpf: string} = { nome: '', email: '', senha: '', cpf: '' };

  usuarios: any[] = [];
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmaSenha: string = '';
  cpf: string = '';

  
  constructor(private Api: Api) {}



  ngOnInit() {
    this.listarUsuarios();
  }


  enviar() {
    // Monta o objeto ANTES da requisição
    this.usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      cpf: this.cpf
    };

    this.Api.cadastrarUsuario(this.usuario).subscribe({
      next: (res: any) => {
        alert(res.message || 'Usuário cadastrado com sucesso!');
        this.listarUsuarios();

        // Limpa o formulário
        this.nome = '';
        this.email = '';
        this.senha = '';
        this.cpf = '';
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar');
      },
    });
  }

  listarUsuarios() {
    this.Api.listarUsuarios().subscribe({
      next: (dados: any[]) => (this.usuarios = dados),
      error: (err) => console.error(err),
    });
  }

}