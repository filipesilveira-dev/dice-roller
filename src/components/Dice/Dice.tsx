import { useState } from "react";
import Button from "../Button/Button";
import rollDice from "@/utils/rollDice";

interface DiceProps{
  faces: number
}

export default function Dice({ faces }: DiceProps) {
  // valor do dado começa no "1"
  const [number, setNumber] = useState<number>(1);

  // chama a função utilitária Divisão de papéis: Dice não sabe de lógica de rolagem de dados
  function handleRoll() {
    const result = rollDice(faces);
    setNumber(result);
  }

  return (
    <>
      <h1>🎲</h1>
      <p>{number}</p>
      <Button onRollDice={handleRoll} />
    </>
  );
}
