import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
})
export class Tab5Page {

  constructor(private router: Router) { }

  menuAtivo: string = 'inicio';
  mostrarPerfil: boolean = false;

  menuEncontro: boolean = false;
  servicoSelecionado: any = null;
  mostrarDetalhes = false;



  Avancar() {
  this.router.navigate(['/tabs/tab4']);
  
  }
  EncontroLeft() {
    this.menuEncontro = !this.menuEncontro;

  }


  menuItems = [
    { id: 'inicio', label: 'Início', icone: 'home-outline' },
    { id: 'calendario', label: 'Calendário', icone: 'calendar-outline' },
    { id: 'quemsomos', label: 'Quem Somos', icone: 'people-outline' },
    { id: 'sair', label: 'Sair', icone: 'log-out-outline' }
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

  servicos = [
    {
      id: 'cvv',
      nome: 'CVV',
      titulo: 'Centro de Valorização da Vida',
      cor: 'red',
      gradiente: 'gradiente-vermelho',
      icone: 'heart',
      resumo: 'Apoio emocional e prevenção ao suicídio',
      telefone: '188',
      descricao:
        'O CVV realiza apoio emocional e prevenção do suicídio, atendendo gratuitamente...',
      oQueE: 'Associação civil sem fins lucrativos...',
      paraQuem: [
        'Pessoas em sofrimento emocional',
        'Pessoas com pensamentos suicidas',
        'Quem precisa de apoio em crises emocionais'
      ],
      comoAjuda: [
        'Escuta ativa',
        'Apoio em momentos de crise',
        'Conversas confidenciais e anônimas'
      ],
      ondeEncontrar: [
        'Telefone: 188 (24h)',
        'Chat online: www.cvv.org.br',
        'Email: contato@cvv.org.br'
      ],
      gratuito: true,
      disponibilidade: '24h por dia'
    },

    {
      id: 'caps',
      nome: 'CAPS',
      titulo: 'Centro de Atenção Psicossocial',
      cor: 'emerald',
      gradiente: 'gradiente-verde',
      icone: 'users',
      resumo: 'Atendimento integral em saúde mental pelo SUS',
      telefone: 'Varia por região',
      descricao: 'Serviço público do SUS para atendimento...',
      oQueE: 'Serviço de saúde pública que oferece atendimento diário...',
      paraQuem: [
        'Pessoas com transtornos mentais graves',
        'Usuários de álcool e drogas',
        'Crianças e adolescentes (CAPSi)'
      ],
      comoAjuda: [
        'Consultas médicas e psicológicas',
        'Oficinas terapêuticas',
        'Acompanhamento familiar'
      ],
      ondeEncontrar: [
        'Unidades Básicas de Saúde',
        'Demanda espontânea no CAPS',
        'Hospitais'
      ],
      gratuito: true,
      disponibilidade: 'Horário comercial / 24h dependendo do tipo'
    },

    {
      id: 'clinica',
      nome: 'Clínica Escola',
      titulo: 'Clínica-Escola de Psicologia',
      cor: 'blue',
      gradiente: 'gradiente-azul',
      icone: 'brain',
      resumo: 'Atendimento psicológico acessível em universidades',
      telefone: 'Varia por instituição',
      descricao: 'Serviços de psicologia oferecidos por universidades...',
      oQueE: 'Espaço de formação prática em universidades...',
      paraQuem: [
        'Pessoas buscando psicoterapia',
        'Crianças, adolescentes e adultos'
      ],
      comoAjuda: [
        'Psicoterapia individual',
        'Terapia de casal e família'
      ],
      ondeEncontrar: [
        'Universidades com psicologia',
        'Busque "clínica-escola" + sua cidade'
      ],
      gratuito: false,
      disponibilidade: 'Horário comercial'
    }
  ];

  selecionar(servico: any) {
    this.servicoSelecionado = servico;
    this.mostrarDetalhes = true;
  }

  voltar() {
    this.mostrarDetalhes = false;
    this.servicoSelecionado = null;
  }


}
