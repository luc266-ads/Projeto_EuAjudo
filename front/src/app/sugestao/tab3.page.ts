import { Component } from '@angular/core';
import { CidadesPE } from '../serviceMP/cidades-pe';
import { Api } from '../serviceApi/api';
import { __values } from 'tslib';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(private CidadesPE: CidadesPE,
    private Api: Api
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
    'Comunidade/Apoio mútuo'
  ];

  publicos = [
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
  bodySugestao: boolean = true;
  bodyCalendario: boolean = false;
  sugestaoOk: boolean = false;
  sugestaoNaoOk: boolean = false;
  menuEncontro: boolean = false;

  ///// INPUTS OUTROS ////
  outroObjetivo: boolean = false;
  outroTipoV: boolean = false;


  get bodyCalendarioStyle() {
    if (this.menuEncontro === false) {
      return { 'background': 'linear-gradient( to top #1565c0, #2196f3)' };
    } else if (this.menuEncontro === true) {
      return {
        'opacity': '0.5',
        'transition': 'opacity 0.8s ease',
        'filter': 'blur(10px)'
      };
    }
    return
  }
  get bodySugestaoStyle() {
    if (this.menuEncontro === false) {
      return { 'background': 'linear-gradient( to top #1565c0, #2196f3)' };
    } else if (this.menuEncontro === true) {
      return {
        'opacity': '0.5',
        'transition': 'opacity 0.8s ease',
        'filter': 'blur(10px)'
      };
    }

    return
  }


  ngOnInit() {
    this.listarSugestões();

  }

 submitted = false;

  handleReset() {
    this.formData = {
      sugestao: '',
      categoria: '',
      publico: '',
      proximidade: '',
      objetivo: ''
    };
    this.submitted = false;
  }
  handleSubmit() {
    if (
      this.formData.sugestao.trim() &&
      this.formData.categoria &&
      this.formData.publico &&
      this.formData.proximidade &&
      this.formData.objetivo
      
    ) {
      this.submitted = true;
      console.log('Dados enviados:', this.formData);
      
    }
      // Monta o objeto ANTES da requisição
    this.sugestoes = {
      sugestao:  this.formData.sugestao,
      tipoSugestao: this.formData.categoria,
      tipoPublico: this.formData.publico,
      tipoParentesco:  this.formData.proximidade,
      objetivoSugestao: this.formData.objetivo,


    };

    this.Api.cadastrarSugestao(this.sugestoes).subscribe({
      next: () => {
        this.listarSugestões();
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
        this.sugestaoNaoOk = true;
      },
    });
  }

  listarSugestões() {
    this.Api.listarSugestões().subscribe({
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
    this.bodySugestao = false

  }
  mundarCidade() {
    this.buscarCidade = false
    this.bodySugestao = true

  }
  MeusEncontrosJaneiro() {
    this.bodySugestao = true;
    this.bodyCalendario = false;



  }
  voltarCalendario() {
    this.bodySugestao = false;
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
  voltarSugetaoNaoOk() {
    this.sugestaoNaoOk = false;
    this.bodySugestao = true;
    this.outroInput01 = ''
    this.outroInput02 = ''
    this.sugestao = ''
    this.outroObjetivo = false
    this.outroTipoV = false

  }


  onChangeC06(event: any) {
    if (event.detail.checked == true) {
      let valor = "Outros"
      this.iniciarTimer()

      this.outro = true
      this.outroTipoV = true

    } else {


      this.outroTipoV = false
    }
  }

  iniciarTimer() {
    if (this.intervalo) return;

    this.intervalo = setInterval(() => {
      if (this.tempoRestante > 0) {
        this.tempoRestante--;
      } if (this.tempoRestante == 0 && this.outroTipoV == true) {
        // FASE 01

        this.tipoParentesco = this.outroInput01
        this.resetarTimer()


      }
    }, 1000);
  }


  resetarTimer() {

    clearInterval(this.intervalo);
    this.intervalo = null;
    this.tempoRestante = this.tempoInicial;
    this.iniciarTimer()
  }

  ////// CHECKBOX D0 ///////


  onChangeD07(event: any) {
    if (event.detail.checked == true) {
      let valor = "Outro"
      this.iniciarTimer02()
      this.outroOB = true
      this.outroObjetivo = true

    } else {
      this.outroObjetivo = false



    }
  }
  iniciarTimer02() {
    if (this.intervalo02) return;

    this.intervalo02 = setInterval(() => {
      if (this.tempoRestante02 > 0) {
        this.tempoRestante02--;
      } if (this.tempoRestante02 == 0 && this.outroObjetivo == true) {
        // FASE 01

        this.objetivoSugestao = this.outroInput02
        this.resetarTimer02()


      }
    }, 1000);
  }


  resetarTimer02() {

    clearInterval(this.intervalo02);
    this.intervalo02 = null;
    this.tempoRestante02 = this.tempoInicial02;
    this.iniciarTimer02()
  }



  /////////////// CIDADES A0 //////////////////

  cidadeA0() {
    this.nome = this.CidadesPE.data[0]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA1() {
    this.nome = this.CidadesPE.data[1]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA2() {
    this.nome = this.CidadesPE.data[2]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA3() {
    this.nome = this.CidadesPE.data[3]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA4() {
    this.nome = this.CidadesPE.data[4]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA5() {
    this.nome = this.CidadesPE.data[5]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA6() {
    this.nome = this.CidadesPE.data[6]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA7() {
    this.nome = this.CidadesPE.data[7]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA8() {
    this.nome = this.CidadesPE.data[8]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA9() {
    this.nome = this.CidadesPE.data[9]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA10() {
    this.nome = this.CidadesPE.data[10]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA11() {
    this.nome = this.CidadesPE.data[11]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA12() {
    this.nome = this.CidadesPE.data[12]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA13() {
    this.nome = this.CidadesPE.data[13]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeA14() {
    this.nome = this.CidadesPE.data[14]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES B0 //////////////////
  cidadeB15() {
    this.nome = this.CidadesPE.data[15]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB16() {
    this.nome = this.CidadesPE.data[16]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB17() {
    this.nome = this.CidadesPE.data[17]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB18() {
    this.nome = this.CidadesPE.data[18]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB19() {
    this.nome = this.CidadesPE.data[19]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB20() {
    this.nome = this.CidadesPE.data[20]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB21() {
    this.nome = this.CidadesPE.data[21]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB22() {
    this.nome = this.CidadesPE.data[22]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB23() {
    this.nome = this.CidadesPE.data[23]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB24() {
    this.nome = this.CidadesPE.data[24]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB25() {
    this.nome = this.CidadesPE.data[25]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB26() {
    this.nome = this.CidadesPE.data[26]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB27() {
    this.nome = this.CidadesPE.data[27]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB28() {
    this.nome = this.CidadesPE.data[28]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB29() {
    this.nome = this.CidadesPE.data[29]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeB30() {
    this.nome = this.CidadesPE.data[30]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES C0 //////////////////

  cidadeC31() {
    this.nome = this.CidadesPE.data[31]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC32() {
    this.nome = this.CidadesPE.data[32]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC33() {
    this.nome = this.CidadesPE.data[33]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC34() {
    this.nome = this.CidadesPE.data[34]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC35() {
    this.nome = this.CidadesPE.data[35]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC36() {
    this.nome = this.CidadesPE.data[36]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC37() {
    this.nome = this.CidadesPE.data[37]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC38() {
    this.nome = this.CidadesPE.data[38]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC39() {
    this.nome = this.CidadesPE.data[39]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC40() {
    this.nome = this.CidadesPE.data[40]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC41() {
    this.nome = this.CidadesPE.data[41]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC42() {
    this.nome = this.CidadesPE.data[42]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC43() {
    this.nome = this.CidadesPE.data[43]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC44() {
    this.nome = this.CidadesPE.data[44]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC45() {
    this.nome = this.CidadesPE.data[45]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC46() {
    this.nome = this.CidadesPE.data[46]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC47() {
    this.nome = this.CidadesPE.data[47]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC48() {
    this.nome = this.CidadesPE.data[48]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC49() {
    this.nome = this.CidadesPE.data[49]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC50() {
    this.nome = this.CidadesPE.data[50]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC51() {
    this.nome = this.CidadesPE.data[51]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC52() {
    this.nome = this.CidadesPE.data[52]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC53() {
    this.nome = this.CidadesPE.data[53]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC54() {
    this.nome = this.CidadesPE.data[54]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC55() {
    this.nome = this.CidadesPE.data[55]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeC56() {
    this.nome = this.CidadesPE.data[56]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES D0 //////////////////

  cidadeD57() {
    this.nome = this.CidadesPE.data[57]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES E0 //////////////////

  cidadeE58() {
    this.nome = this.CidadesPE.data[58]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeE59() {
    this.nome = this.CidadesPE.data[59]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES F0 //////////////////
  cidadeF60() {
    this.nome = this.CidadesPE.data[60]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeF61() {
    this.nome = this.CidadesPE.data[61]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeF62() {
    this.nome = this.CidadesPE.data[62]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeF63() {
    this.nome = this.CidadesPE.data[63]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeF64() {
    this.nome = this.CidadesPE.data[64]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeF65() {
    this.nome = this.CidadesPE.data[65]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES G0 //////////////////
  cidadeG66() {
    this.nome = this.CidadesPE.data[66]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeG67() {
    this.nome = this.CidadesPE.data[67]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeG68() {
    this.nome = this.CidadesPE.data[68]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeG69() {
    this.nome = this.CidadesPE.data[69]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeG70() {
    this.nome = this.CidadesPE.data[70]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeG71() {
    this.nome = this.CidadesPE.data[71]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES I0 //////////////////

  cidadeI72() {
    this.nome = this.CidadesPE.data[72]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI73() {
    this.nome = this.CidadesPE.data[73]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI74() {
    this.nome = this.CidadesPE.data[74]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI75() {
    this.nome = this.CidadesPE.data[75]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI76() {
    this.nome = this.CidadesPE.data[76]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI77() {
    this.nome = this.CidadesPE.data[77]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI78() {
    this.nome = this.CidadesPE.data[78]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI79() {
    this.nome = this.CidadesPE.data[79]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI80() {
    this.nome = this.CidadesPE.data[80]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI81() {
    this.nome = this.CidadesPE.data[81]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI82() {
    this.nome = this.CidadesPE.data[82]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI83() {
    this.nome = this.CidadesPE.data[83]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI84() {
    this.nome = this.CidadesPE.data[84]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI85() {
    this.nome = this.CidadesPE.data[85]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI86() {
    this.nome = this.CidadesPE.data[86]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeI87() {
    this.nome = this.CidadesPE.data[87]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES J0 //////////////////
  cidadeJ88() {
    this.nome = this.CidadesPE.data[88]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ89() {
    this.nome = this.CidadesPE.data[89]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ90() {
    this.nome = this.CidadesPE.data[90]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ91() {
    this.nome = this.CidadesPE.data[91]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ92() {
    this.nome = this.CidadesPE.data[92]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ93() {
    this.nome = this.CidadesPE.data[93]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ94() {
    this.nome = this.CidadesPE.data[94]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ95() {
    this.nome = this.CidadesPE.data[95]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeJ96() {
    this.nome = this.CidadesPE.data[96]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES J0 //////////////////

  cidadeL97() {
    this.nome = this.CidadesPE.data[97]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeL98() {
    this.nome = this.CidadesPE.data[98]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeL99() {
    this.nome = this.CidadesPE.data[99]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeL100() {
    this.nome = this.CidadesPE.data[100]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeL101() {
    this.nome = this.CidadesPE.data[101]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeL102() {
    this.nome = this.CidadesPE.data[102]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeL103() {
    this.nome = this.CidadesPE.data[103]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES M0 //////////////////
  cidadeM104() {
    this.nome = this.CidadesPE.data[104]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeM105() {
    this.nome = this.CidadesPE.data[105]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeM106() {
    this.nome = this.CidadesPE.data[106]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeM107() {
    this.nome = this.CidadesPE.data[107]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeM108() {
    this.nome = this.CidadesPE.data[108]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeM109() {
    this.nome = this.CidadesPE.data[109]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeM110() {
    this.nome = this.CidadesPE.data[110]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES N0 //////////////////
  cidadeN111() {
    this.nome = this.CidadesPE.data[111]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES O0 //////////////////

  cidadeO112() {
    this.nome = this.CidadesPE.data[112]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeO113() {
    this.nome = this.CidadesPE.data[113]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeO114() {
    this.nome = this.CidadesPE.data[114]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeO115() {
    this.nome = this.CidadesPE.data[115]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES O0 //////////////////

  cidadeP116() {
    this.nome = this.CidadesPE.data[116]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP117() {
    this.nome = this.CidadesPE.data[117]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP118() {
    this.nome = this.CidadesPE.data[118]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP119() {
    this.nome = this.CidadesPE.data[119]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP120() {
    this.nome = this.CidadesPE.data[120]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP121() {
    this.nome = this.CidadesPE.data[121]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP122() {
    this.nome = this.CidadesPE.data[122]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP123() {
    this.nome = this.CidadesPE.data[123]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP124() {
    this.nome = this.CidadesPE.data[124]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP125() {
    this.nome = this.CidadesPE.data[125]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP126() {
    this.nome = this.CidadesPE.data[126]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP127() {
    this.nome = this.CidadesPE.data[127]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP128() {
    this.nome = this.CidadesPE.data[128]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP129() {
    this.nome = this.CidadesPE.data[129]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeP130() {
    this.nome = this.CidadesPE.data[130]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES Q0 //////////////////
  cidadeQ131() {
    this.nome = this.CidadesPE.data[131]
    console.log(this.nome)
    this.mundarCidade()
  }

  cidadeQ132() {
    this.nome = this.CidadesPE.data[132]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES R0 //////////////////

  cidadeR133() {
    this.nome = this.CidadesPE.data[133]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeR134() {
    this.nome = this.CidadesPE.data[134]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeR135() {
    this.nome = this.CidadesPE.data[135]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeR136() {
    this.nome = this.CidadesPE.data[136]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES S0 //////////////////
  cidadeS137() {
    this.nome = this.CidadesPE.data[137]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS138() {
    this.nome = this.CidadesPE.data[138]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS139() {
    this.nome = this.CidadesPE.data[139]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS140() {
    this.nome = this.CidadesPE.data[140]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS141() {
    this.nome = this.CidadesPE.data[141]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS142() {
    this.nome = this.CidadesPE.data[142]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS143() {
    this.nome = this.CidadesPE.data[143]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS144() {
    this.nome = this.CidadesPE.data[144]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS145() {
    this.nome = this.CidadesPE.data[145]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS146() {
    this.nome = this.CidadesPE.data[146]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS147() {
    this.nome = this.CidadesPE.data[147]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS148() {
    this.nome = this.CidadesPE.data[148]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS149() {
    this.nome = this.CidadesPE.data[149]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS150() {
    this.nome = this.CidadesPE.data[150]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS151() {
    this.nome = this.CidadesPE.data[151]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS152() {
    this.nome = this.CidadesPE.data[152]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS153() {
    this.nome = this.CidadesPE.data[153]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS154() {
    this.nome = this.CidadesPE.data[154]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS155() {
    this.nome = this.CidadesPE.data[155]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS156() {
    this.nome = this.CidadesPE.data[156]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS157() {
    this.nome = this.CidadesPE.data[157]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS158() {
    this.nome = this.CidadesPE.data[158]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS159() {
    this.nome = this.CidadesPE.data[159]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS160() {
    this.nome = this.CidadesPE.data[160]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS161() {
    this.nome = this.CidadesPE.data[161]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS162() {
    this.nome = this.CidadesPE.data[162]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS163() {
    this.nome = this.CidadesPE.data[163]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeS164() {
    this.nome = this.CidadesPE.data[164]
    console.log(this.nome)
    this.mundarCidade()
  }


  /////////////// CIDADES T0 //////////////////
  cidadeT165() {
    this.nome = this.CidadesPE.data[165]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT166() {
    this.nome = this.CidadesPE.data[166]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT167() {
    this.nome = this.CidadesPE.data[167]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT168() {
    this.nome = this.CidadesPE.data[168]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT169() {
    this.nome = this.CidadesPE.data[169]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT170() {
    this.nome = this.CidadesPE.data[170]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT171() {
    this.nome = this.CidadesPE.data[171]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT172() {
    this.nome = this.CidadesPE.data[172]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT173() {
    this.nome = this.CidadesPE.data[173]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT174() {
    this.nome = this.CidadesPE.data[174]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT175() {
    this.nome = this.CidadesPE.data[175]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT176() {
    this.nome = this.CidadesPE.data[176]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT177() {
    this.nome = this.CidadesPE.data[177]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeT178() {
    this.nome = this.CidadesPE.data[178]
    console.log(this.nome)
    this.mundarCidade()
  }

  /////////////// CIDADES V0 //////////////////
  cidadeV179() {
    this.nome = this.CidadesPE.data[179]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeV180() {
    this.nome = this.CidadesPE.data[180]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeV181() {
    this.nome = this.CidadesPE.data[181]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeV182() {
    this.nome = this.CidadesPE.data[182]
    console.log(this.nome)
    this.mundarCidade()
  }
  cidadeV183() {
    this.nome = this.CidadesPE.data[183]
    console.log(this.nome)
    this.mundarCidade()
  }
  /////////////// CIDADES X0 //////////////////

  cidadeX184() {
    this.nome = this.CidadesPE.data[184]
    console.log(this.nome)
    this.mundarCidade()
  }
}
