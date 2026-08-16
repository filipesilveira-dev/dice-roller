import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
// importa o botão a ser testado
import Button from "./Button";

describe("Button", () => {
  it("deve renderizar o conteúdo recebido", () => {
    // função do testing library que renderiza compontentes react
    render(<Button>Rolar dado</Button>);

    // variável que recebe um elemento em tela com o texto "Rolar dado"
    const button = screen.getByRole("button", {
      name: "Rolar dado",
    });

    // expectativa que "button" seja verdadeiro
    expect(button).toBeTruthy();
  });

  it("deve executar a função ao ser clicado", () => {
    // funlção mock criada para verificar se foi chamada
    const handleClick = jest.fn();

    // renderiza o botão com a mock function no  onClick
    render(<Button onClick={handleClick}>Rolar dado</Button>);

    // variável recebe o botão com o texto "Rolar dado"
    const button = screen.getByRole("button", {
      name: "Rolar dado",
    });

    // simulação ação de "click" no button
    button.click();

    // expectativa de que a mock function tenha sido chamada uma vez
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
