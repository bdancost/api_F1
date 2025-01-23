const arrayInicial = [2, 8, 5, 3, 9, 4, 1];

// criar função que gera um array ordenado a partir de um desordenado. Lembrando, não vamos modificar o array original
function bubbleSort(array) {
  const arrayDesordenado = [...array];

  for (
    let numeroItarecao = 1;
    numeroItarecao < arrayDesordenado.length;
    numeroItarecao++
  ) {
    for (
      let numeroJanela = 0;
      numeroJanela < arrayDesordenado.length - 1;
      numeroJanela++
    ) {
      if (arrayDesordenado[numeroJanela] > arrayDesordenado[numeroJanela + 1]) {
        const temporario = arrayDesordenado[numeroJanela];
        arrayDesordenado[numeroJanela] = arrayDesordenado[numeroJanela + 1];
        arrayDesordenado[numeroJanela + 1] = temporario;
      }
    }
  }
  return arrayDesordenado;
}

console.log(`Esse é o meu array original [${arrayInicial}]`);
console.log(`Esse é o meu array ordenado [${bubbleSort(arrayInicial)}]`);
