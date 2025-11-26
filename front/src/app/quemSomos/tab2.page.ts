import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {


  constructor(private router: Router) { }

  menuAtivo: string = 'quemsomos';
  mostrarPerfil: boolean = false;


  menuItems = [
    { id: 'inicio', label: 'Início', icone: 'home-outline' },
    { id: 'calendario', label: 'Calendário', icone: 'calendar-outline' },
    { id: 'quemsomos', label: 'Quem Somos', icone: 'people-outline' },
    { id: 'sair', label: 'Sair', icone: 'log-out-outline'  }
  ];

  integrantes = [
    {
      nome: 'Nome do Integrante 1',
      papel: 'Desenvolvedor Frontend',
      curso: 'Ciência da Computação',
      foto: null,
      descricao: 'Responsável pela interface e experiência do usuário.',
      linkedin: '#',
      github: '#',
      email: 'integrante1@email.com'
    },
    {
      nome: 'Nome do Integrante 2',
      papel: 'Desenvolvedor Backend',
      curso: 'Sistemas de Informação',
      foto: null,
      descricao: 'Responsável pela lógica do sistema e banco de dados.',
      linkedin: '#',
      github: '#',
      email: 'integrante2@email.com'
    },
    {
      nome: 'Nome do Integrante 3',
      papel: 'Designer UX/UI',
      curso: 'Design Digital',
      foto: null,
      descricao: 'Responsável pelo design e identidade visual do projeto.',
      linkedin: '#',
      github: '#',
      email: 'integrante3@email.com'
    }
  ];

  valores = [
    {
      icone: 'heart-outline',
      titulo: 'Empatia e Cuidado',
      descricao: 'Acreditamos no poder da escuta ativa e do acolhimento para transformar vidas.'
    },
    {
      icone: 'shield-checkmark-outline',
      titulo: 'Prevenção e Conscientização',
      descricao: 'Trabalhamos para identificar sinais precoces e educar sobre os riscos da dependência digital.'
    },
    {
      icone: 'people-outline',
      titulo: 'Apoio Familiar',
      descricao: 'Envolvemos familiares e amigos no processo de identificação e recuperação.'
    },
    {
      icone: 'bulb-outline',
      titulo: 'Inovação Social',
      descricao: 'Utilizamos tecnologia para combater os efeitos negativos do uso excessivo de tecnologia.'
    }
  ];


  handleMenuClick(id: string) {
    if (id === 'sair') {

      this.router.navigate(['/tabs/tab1']);

      return;
    } if (id === 'inicio') {

      this.router.navigate(['/tabs/tab5']);

      return;
    } if (id === 'calendario') {

      this.router.navigate(['/tabs/tab3']);

      return;
    } if (id === 'quemsomos') {

      this.router.navigate(['/tabs/tab2']);


      return;
    }
    this.menuAtivo = id;
    console.log("Navegando para:", id);
  }




}