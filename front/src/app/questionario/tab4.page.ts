import { Component } from '@angular/core';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {

  
  constructor() {}
  
 getProgressPercent(): number {
  const total = Object.values(this.answers).reduce((sum: number, val: number) => sum + val, 0);
  return (total / 28) * 100;
}
currentQuestion = 0;
  answers: { [key: number]: number } = {};
  showResult = false;

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
      return {
        level: "Baixo Risco",
        color: "green",
        message: "Os comportamentos indicam uso equilibrado.",
        recommendation: "Continue incentivando atividades offline."
      };
    } else if (percentage <= 50) {
      return {
        level: "Risco Moderado",
        color: "blue",
        message: "Há sinais de uso excessivo que merecem atenção.",
        recommendation: "Converse sobre limites e observe mudanças."
      };
    } else if (percentage <= 75) {
      return {
        level: "Risco Alto",
        color: "orange",
        message: "Os comportamentos sugerem dependência moderada.",
        recommendation: "Recomenda-se buscar orientação profissional."
      };
    } else {
      return {
        level: "Risco Muito Alto",
        color: "red",
        message: "Sinais de forte dependência virtual.",
        recommendation: "Procure ajuda psicológica urgentemente."
      };
    }
  }

 

}