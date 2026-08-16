// importa a função a ser testada
import  rollDice  from "./rollDice";
// importa as funções utilizadas pelo jest
import { describe, expect, it } from "@jest/globals";

describe("rollDice", () => {

  // // 1. ARRANGE: array com os valores de faces permitidos no projeto, simulando diferentes escolhas do usuário
  const diceFaces = [4, 6, 8, 10, 12, 20];

  // itera sobre diceFaces pegando cada valor de faces e testando. Elimina a necessidade de criar um teste para para face. O "%i" faz referência ao inteiro utilizado naquele momento
  it.each(diceFaces)("deve retornar um número entre um e %i", (faces) => {
    

    // 2. ACT (executa a função)
    const result = rollDice(faces);

    // 3. ASSERT
    // o resultado deve ser maior que 1
    expect(result).toBeGreaterThanOrEqual(1);
    // o resultado deve ser menor que a quantidade defaces
    expect(result).toBeLessThanOrEqual(faces);
  });
});