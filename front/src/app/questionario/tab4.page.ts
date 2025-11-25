import { Component } from '@angular/core';
import { Api } from '../serviceApi/api';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {


  constructor(private Api: Api) { }

  getProgressPercent(): number {
    const total = Object.values(this.answers).reduce((sum: number, val: number) => sum + val, 0);
    return (total / 28) * 100;
  }
  currentQuestion = 0;
  answers: { [key: number]: number } = {};
  showResult = false;
  guardaQuestionario: any[] = [];

  resultadoDp: {
    tipoLevel: string;
    tipoCor: string;
    tipoMensagem: string;
    tipoRecormendacao: string;


  } = {
      tipoLevel: '',
      tipoCor: '',
      tipoMensagem: '',
      tipoRecormendacao: '',
    };


  formData = {
    level: '',
    color: '',
    mensagem: '',
    recormendacao: '',
  };

  level = [
    'Baixo Risco',
    'Risco Moderado',
    'Risco Alto',
    'Risco Muito Alto'

  ]

  mensagem = [
    'Os comportamentos indicam uso equilibrado',
    'Há sinais de uso excessivo que merecem atenção.',
    'Os comportamentos sugerem dependência moderada.',
    'Sinais de forte dependência virtual.'

  ]

  recormendacao = [
    'Continue incentivando atividades offline.',
    'Converse sobre limites e observe mudanças.',
    'Recomenda-se buscar orientação profissional.',
    'Procure ajuda psicológica urgentemente.'

  ]
  color = [
    "green",
    "blue",
    "orange",
    "red"

  ]

  questions = [
    {
      id: 1,
      text: "A pessoa demonstra irritação, ansiedade ou nervosismo quando fica sem o celular ou sem acesso à internet?",
      options: [
        { text: "Nunca", value: 0 },
        { text: "Raramente", value: 1 },
        { text: "Às vezes", value: 2 },
        { text: "Frequentemente", value: 3 },
        { text: "Sempre", value: 4 }
      ]
    },
    {
      id: 2,
      text: "Você percebe que ela passa mais tempo online do que planejava inicialmente, mesmo quando precisa fazer outras atividades importantes?",
      options: [
        { text: "Não", value: 0 },
        { text: "Raramente", value: 1 },
        { text: "Às vezes", value: 2 },
        { text: "Muitas vezes", value: 3 },
        { text: "Sim, quase sempre", value: 4 }
      ]
    },
    {
      id: 3,
      text: "A pessoa costuma negligenciar obrigações por passar muito tempo conectada?",
      options: [
        { text: "Nunca", value: 0 },
        { text: "Raramente", value: 1 },
        { text: "Às vezes", value: 2 },
        { text: "Frequentemente", value: 3 },
        { text: "Sempre", value: 4 }
      ]
    },
    {
      id: 4,
      text: "Ela costuma preferir atividades virtuais a interações presenciais?",
      options: [
        { text: "Não, ela prefere pessoas", value: 0 },
        { text: "Às vezes", value: 1 },
        { text: "Frequentemente", value: 2 },
        { text: "Quase sempre", value: 3 },
        { text: "Sempre", value: 4 }
      ]
    },
    {
      id: 5,
      text: "Você já percebeu que ela mente ou esconde quanto tempo realmente passa online?",
      options: [
        { text: "Nunca", value: 0 },
        { text: "Raramente", value: 1 },
        { text: "Às vezes", value: 2 },
        { text: "Frequentemente", value: 3 },
        { text: "Sempre", value: 4 }
      ]
    },
    {
      id: 6,
      text: "A pessoa perde o controle e continua usando dispositivos mesmo sabendo que deve parar?",
      options: [
        { text: "Não", value: 0 },
        { text: "Um pouco", value: 1 },
        { text: "Às vezes", value: 2 },
        { text: "Frequentemente", value: 3 },
        { text: "Sempre", value: 4 }
      ]
    },
    {
      id: 7,
      text: "O uso excessivo tem afetado negativamente a vida dela (sono, humor, alimentação, estudos, relacionamentos)?",
      options: [
        { text: "Não afetou", value: 0 },
        { text: "Afeta pouco", value: 1 },
        { text: "Afeta moderadamente", value: 2 },
        { text: "Afeta bastante", value: 3 },
        { text: "Afeta de forma grave", value: 4 }
      ]
    }
  ];

  handleAnswer(value: number) {
    this.answers[this.currentQuestion] = value;

    if (this.currentQuestion < this.questions.length - 1) {
      setTimeout(() => this.currentQuestion++, 300);
    } else {
      setTimeout(() => this.showResult = true, 300);
    }
  }

  goBack() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  restart() {
    this.currentQuestion = 0;
    this.answers = {};
    this.showResult = false;
  }

  calculateResult() {
    const total = Object.values(this.answers).reduce((a, b) => a + b, 0);
    const maxScore = 28;
    const percentage = (total / maxScore) * 100;

    if (percentage <= 25) {

      this.formData = {
        level: this.level[0],
        color: this.color[0],
        mensagem: this.mensagem[0],
        recormendacao: this.recormendacao[0]
      };


    } else if (percentage <= 50) {

      this.formData = {
        level: this.level[1],
        color: this.color[1],
        mensagem: this.mensagem[1],
        recormendacao: this.recormendacao[1]
      };

    } else if (percentage <= 75) {

      this.formData = {
        level: this.level[2],
        color: this.color[2],
        mensagem: this.mensagem[2],
        recormendacao: this.recormendacao[2]
      };

    } else {

      this.formData = {
        level: this.level[3],
        color: this.color[3],
        mensagem: this.mensagem[3],
        recormendacao: this.recormendacao[3]
      };

    }
    return (this.formData)
  }

  ngOnInit() {
    this.listarQuestionario();

  }
  proximo() {
    // Monta o objeto ANTES da requisição
    this.resultadoDp = {
      tipoLevel: this.formData.level,
      tipoCor: this.formData.color,
      tipoMensagem: this.formData.mensagem,
      tipoRecormendacao: this.formData.recormendacao


    };

    this.Api.cadastrarQuestionario(this.resultadoDp).subscribe({
      next: () => {
        this.listarQuestionario();
        // Limpa o formulário

        this.resultadoDp.tipoLevel = ""
        this.resultadoDp.tipoCor = ""
        this.resultadoDp.tipoMensagem = ""
        this.resultadoDp.tipoRecormendacao = ""
      },
      error: (err) => {
        console.error(err);
      },
    });

  }

  listarQuestionario() {
    this.Api.listarQuestionario().subscribe({
      next: (dados: any[]) => (this.guardaQuestionario = dados),
      error: (err) => console.error(err),
    });
  }
}