import { Component } from '@angular/core';
import { CidadesPE } from '../serviceMP/cidades-pe';
import { Api } from '../serviceApi/api';
import { __values } from 'tslib';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(private CidadesPE: CidadesPE,
    private Api: Api, private router: Router
  ) { }

  menuAtivo: string = 'calendario';
  mostrarPerfil: boolean = false;


  //// VAR TIMER INPUT_OUTROS01 ////
  tempoInicial: number = 1;
  tempoRestante: number = this.tempoInicial;
  intervalo: any;

  //// VAR TIMER INPUT_OUTROS02 ////
  tempoInicial02: number = 1;
  tempoRestante02: number = this.tempoInicial02;
  intervalo02: any;




  ///////// FOOTER NAVEGAÇÃO ///////////

  menuItems = [
    { id: 'inicio', label: 'Início', icone: 'home-outline' },
    { id: 'calendario', label: 'Calendário', icone: 'calendar-outline' },
    { id: 'quemsomos', label: 'Quem Somos', icone: 'people-outline' },
    { id: 'sair', label: 'Sair', icone: 'log-out-outline' }
  ];

  ////// ESTRUTURA API //////
  sugestoes: {
    sugestao: string;
    tipoSugestao: string;
    tipoPublico: string;
    tipoParentesco: string;
    objetivoSugestao: string;

  } = {
      sugestao: '',
      tipoSugestao: '',
      tipoPublico: '',
      objetivoSugestao: '',
      tipoParentesco: '',
    };
  formData = {
    sugestao: '',
    categoria: '',
    publico: '',
    proximidade: '',
    objetivo: ''
  };

  categorias = [
    'Prevenção',
    'Diagnóstico',
    'Conscientização',
    'Suporte emocional',
    'Educação',
    'Recursos digitais',
    'Comunidade/Apoio Social'
  ];

  publicos = [
    'Idoso',
    'Adulto',
    'Jovem',
    'Adolescente',
    'Criança'
  ];

  proximidades = [
    'Familiar',
    'Marido/Esposa',
    'Filho',
    'Amigo(a)',
  ];

  objetivos = [
    'Reduzir o tempo de uso',
    'Monitorar a saúde mental',
    'Promover atividades offline',
    'Incentivar hábitos saudáveis',
    'Promover interação social',
    'Auxiliar na organização da rotina',
  ];

  nome: any = [];
  guardaSugestao: any[] = [];
  sugestao: string = "";


  ///// CATEGORIA DA SUGESTÃO //////

  tipoSugestao: string = ""


  ////// PUBLICO /////
  tipoPublico: string = ""


  ///// TIPO DE APROXIMIDADE COM A VITIMA /////
  tipoParentesco: string = ""
  teste: string = ""
  outroInput01: string = ""


  //// OBJETIVO PRINCIPAL DA SUGESTÃO ////

  objetivoSugestao: string = ""
  outroInput02: string = ""
  outroOB: boolean = false;
  outro: boolean = false;

  ///// CADS /////

  buscarCidade: boolean = false;
  bodyCalendario: boolean = true;
  sugestaoOk: boolean = false;
  menuEncontro: boolean = false;
  submitted: boolean = false;

  ///// INPUTS OUTROS ////
  outroObjetivo: boolean = false;
  outroTipoV: boolean = false;


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



  ngOnInit() {
    this.listarSugestoes();

  }



  handleReset() {
    this.formData = {
      sugestao: '',
      categoria: '',
      publico: '',
      proximidade: '',
      objetivo: ''
    };
    this.submitted = false;
    this.bodyCalendario = true;

  }
  handleSubmit() {
    if (
      this.formData.sugestao.trim() &&
      this.formData.categoria &&
      this.formData.publico &&
      this.formData.proximidade &&
      this.formData.objetivo

    ) {
      this.submitted = false;
      console.log('Dados enviados:', this.formData);

    }
    // Monta o objeto ANTES da requisição
    this.sugestoes = {
      sugestao: this.formData.sugestao,
      tipoSugestao: this.formData.categoria,
      tipoPublico: this.formData.publico,
      tipoParentesco: this.formData.proximidade,
      objetivoSugestao: this.formData.objetivo,


    };

    this.Api.cadastrarSugestao(this.sugestoes).subscribe({
      next: () => {
        this.listarSugestoes();
        this.sugestaoOk = true
        // Limpa o formulário

        this.sugestao = '';
        this.tipoSugestao = '';
        this.tipoPublico = '';
        this.tipoParentesco = '';
        this.objetivoSugestao = '';

      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  listarSugestoes() {
    this.Api.listarSugestoes().subscribe({
      next: (dados: any[]) => (this.guardaSugestao = dados),
      error: (err) => console.error(err),
    });
  }
  public results = [...this.CidadesPE.data];

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.CidadesPE.data.filter((d) => d.toLowerCase().includes(query));

  }


  EncontroLeft() {
    this.menuEncontro = !this.menuEncontro;

  }
  procurarMunicipio() {

    this.buscarCidade = true


  }
  mundarCidade() {

    this.buscarCidade = false


  }
  MeusEncontrosJaneiro() {
    this.submitted = true
    this.bodyCalendario = false;



  }
  voltarCalendario() {

    this.bodyCalendario = true;


  }
  voltarSugestaoOk() {
    this.sugestaoOk = false;
    this.bodyCalendario = true;
    this.outroInput01 = ''
    this.outroInput02 = ''
    this.sugestao = ''
    this.outroObjetivo = false
    this.outroTipoV = false


  }


  currentMonth = 0; // Janeiro
  selectedDates: string[] = [];


  meses = [
    'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
    'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
  ];

  diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  getDiasNoMes(mes: number) {
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return diasPorMes[mes];
  }
   
  saibaMais(){
  this.router.navigate(['/tabs/tab7']);
}

  getPrimeiroDiaSemana(mes: number) {
    const ano = 2025;
    const data = new Date(ano, mes, 1);
    return data.getDay();
  }

  gerarCalendario() {
    const diasNoMes = this.getDiasNoMes(this.currentMonth);
    const primeiroDia = this.getPrimeiroDiaSemana(this.currentMonth);
    const dias: (number | null)[] = [];

    // Preenche dias vazios
    for (let i = 0; i < primeiroDia; i++) dias.push(null);

    // Preenche dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) dias.push(dia);

    return dias;
  }

  toggleData(dia: number | null) {
    if (!dia) return;

    const dataStr = `${dia}/${this.currentMonth + 1}/2025`;

    if (this.selectedDates.includes(dataStr)) {
      this.selectedDates = this.selectedDates.filter(d => d !== dataStr);
    } else {
      this.selectedDates = [...this.selectedDates, dataStr];
    }
  }

  proximoMes() {
    this.currentMonth = (this.currentMonth + 1) % 12;
  }

  mesAnterior() {
    this.currentMonth = (this.currentMonth - 1 + 12) % 12;
  }



}
