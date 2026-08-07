import { useState } from "react";
import Button from "../Button/Button";
import rollDice from "@/utils/rollDice";
import { motion } from "motion/react";
import "@/components/Dice/dice.css";

interface DiceProps {
  faces: number;
}

export default function Dice({ faces }: DiceProps) {
  // armazena resultado atual
  const [number, setNumber] = useState<number>(1);
  // controla a animação do dado rolando
  const [isRolling, setIsRolling] = useState(false);

  // chama a função utilitária Divisão de papéis: Dice não sabe de lógica de rolagem de dados
  function handleRoll() {
    // gera o resultado
    const result = rollDice(faces);
    setNumber(result);
    setIsRolling(true);
  }

  return (
    <>
      <motion.div
        className="dice"
        initial={{ opacity: 0, y: 20 }}
        animate={
          // caso isRolling seja true 
          isRolling ? {opacity: 1, y: 0, scale: [1, 1.15, 1], rotate: [0, 10, -10, 0],}
          // caso isRolling seja false
            : {opacity: 1,y: 0,scale: 1,rotate: 0,}
        }

        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}

        // estabelece ao final da animação o valor false para o estado isRolling
        onAnimationComplete={() => setIsRolling(false)}
      >
        {number}
      </motion.div>

      <Button onRollDice={handleRoll} />
    </>
  );
}
