import { Component } from '@angular/core';
import { CidadesPE } from '../serviceMP/cidades-pe';
import { Api } from '../serviceApi/api';
import { __values } from 'tslib';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
  standalone: false,
})
export class Tab6Page {

  constructor(private CidadesPE: CidadesPE,
    private Api: Api, private router: Router
  ) { }
  
 


  //// VAR TIMER INPUT_OUTROS01 ////
  tempoInicial: number = 1;
  tempoRestante: number = this.tempoInicial;
  intervalo: any;

  //// VAR TIMER INPUT_OUTROS02 ////
  tempoInicial02: number = 1;
  tempoRestante02: number = this.tempoInicial02;
  intervalo02: any;


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
  sugestaoOk: boolean = false;
  submitted: boolean = true;

  ///// INPUTS OUTROS ////
  outroObjetivo: boolean = false;
  outroTipoV: boolean = false;


  

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
    this.router.navigate(['/tabs/tab4']);


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

  voltarSugestaoOk() {
    this.sugestaoOk = false;
    this.router.navigate(['/tabs/tab5']);
   


  }



}
