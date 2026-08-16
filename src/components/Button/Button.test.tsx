import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("deve renderizar o conteúdo recebido", () => {
    render(<Button>Rolar dado</Button>);

    const button = screen.getByRole("button", {
      name: "Rolar dado",
    });

    expect(button).toBeTruthy();
  });
});