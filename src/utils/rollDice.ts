 const rollDice = (faces: number) => {
    // o math.random() vai gerar um número decimal entre 0 e 1. Math.floor vai arredondar o valor para o inteiro abaixo (se der 2.52, fica 2. Se der 5.55, fica 5 e etc). Dessa forma, estamos gerando um número inteiro de 0 a 5. Com o "+1" no final, estamos gerando um número de 1 a 6
    const newRandonNumber = Math.floor(Math.random() * faces) + 1;
    return newRandonNumber;
  };

  export default rollDice;