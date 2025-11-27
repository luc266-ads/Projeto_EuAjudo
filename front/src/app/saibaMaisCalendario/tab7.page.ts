import { Component, OnInit } from '@angular/core';
import { CidadesPE } from '../serviceMP/cidades-pe';
import { Api } from '../serviceApi/api';
import { __values } from 'tslib';
import { Router } from '@angular/router';

interface Evento {
  id: number;
  titulo: string;
  data: string;
  responsavel: string;
  tipo: string;
  endereco: string;
  horario: string;
  descricao: string;
  vagas: number;
  participantes: number;
}

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss'],
  standalone: false,
})
export class Tab7Page implements OnInit {

  constructor(private CidadesPE: CidadesPE,
    private Api: Api, private router: Router
  ) { }
  menuAtivo: string = '';
  mostrarPerfil: boolean = false;


  eventoSelecionado: Evento | null = null;
  presencasMarcadas: number[] = [];
  mostrarConfirmacao = false;

  menuItems = [
    { id: 'inicio', label: 'Início', icone: 'home-outline' },
    { id: 'calendario', label: 'Calendário', icone: 'calendar-outline' },
    { id: 'quemsomos', label: 'Quem Somos', icone: 'people-outline' },
    { id: 'sair', label: 'Sair', icone: 'log-out-outline' }
  ];
  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Palestra: Uso Consciente da Tecnologia',
      data: '15/12/2025',
      responsavel: 'Dr. Carlos Mendes',
      tipo: 'Palestra',
      endereco: 'Auditório da Universidade Federal, Sala 301',
      horario: '14:00 - 16:00',
      descricao: 'Palestra educativa sobre os impactos do uso excessivo de tecnologia na saúde mental, com foco em jovens e adolescentes. Serão abordados sinais de alerta, estratégias de prevenção e dicas práticas para um uso equilibrado das redes sociais e dispositivos digitais.',
      vagas: 120,
      participantes: 45
    },
    {
      id: 2,
      titulo: 'Workshop: Desintoxicação Digital',
      data: '20/12/2025',
      responsavel: 'Profa. Ana Paula Santos',
      tipo: 'Workshop',
      endereco: 'Centro Comunitário Vila Nova, Rua das Flores, 123',
      horario: '09:00 - 12:00',
      descricao: 'Workshop prático com técnicas e exercícios para reduzir a dependência de dispositivos digitais. Os participantes aprenderão a estabelecer limites saudáveis, criar rotinas off-line e desenvolver hobbies alternativos. Inclui dinâmicas em grupo e material de apoio.',
      vagas: 40,
      participantes: 32
    },
    {
      id: 3,
      titulo: 'Campanha: Família Conectada, Família Presente',
      data: '28/12/2025',
      responsavel: 'Instituto Bem-Estar Digital',
      tipo: 'Campanha',
      endereco: 'Praça Central da Cidade',
      horario: '10:00 - 18:00',
      descricao: 'Campanha de conscientização com atividades para toda a família. Haverá distribuição de materiais educativos, jogos interativos sem tela, área de orientação psicológica gratuita e depoimentos de pessoas que superaram a dependência digital. Evento aberto ao público.',
      vagas: 500,
      participantes: 156
    },
    {
      id: 4,
      titulo: 'Grupo de Apoio: Pais e Filhos Conectados',
      data: '05/01/2026',
      responsavel: 'Psicóloga Maria Silva',
      tipo: 'Grupo de Apoio',
      endereco: 'Clínica Saúde Mental, Av. Principal, 456',
      horario: '19:00 - 21:00',
      descricao: 'Encontro mensal para pais que desejam ajudar seus filhos a desenvolverem uma relação saudável com a tecnologia. Espaço seguro para compartilhar experiências, receber orientação profissional e construir uma rede de apoio entre famílias.',
      vagas: 25,
      participantes: 18
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

  ngOnInit(): void { }

  marcarPresenca(eventoId: number) {
    if (!this.presencasMarcadas.includes(eventoId)) {
      this.presencasMarcadas = [...this.presencasMarcadas, eventoId];
      this.mostrarConfirmacao = true;
      // esconder notificação após 3s
      window.setTimeout(() => {
        this.mostrarConfirmacao = false;
      }, 3000);
    }
  }

  desmarcarPresenca(eventoId: number) {
    this.presencasMarcadas = this.presencasMarcadas.filter(id => id !== eventoId);
    // se estava no modal, fecha confirmação (opcional)
  }

  abrirDetalhes(evento: Evento) {
    this.eventoSelecionado = evento;
  }

  fecharDetalhes() {
    this.eventoSelecionado = null;
  }

  getCorTipo(tipo: string) {
    const cores: { [k: string]: string } = {
      'Palestra': 'grad-blue',
      'Workshop': 'grad-green',
      'Campanha': 'grad-purple',
      'Grupo de Apoio': 'grad-orange'
    };
    return cores[tipo] || 'grad-blue';
  }

  percentualOcupacao(evento: Evento): number {
    if (!evento.vagas) return 0;
    return Math.round((evento.participantes / evento.vagas) * 100);
  }

  vagasDisponiveis(evento: Evento): number {
    return Math.max(0, evento.vagas - evento.participantes);
  }


}
