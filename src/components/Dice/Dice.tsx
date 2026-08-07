import { useState } from "react";
import Button from "../Button/Button";
import rollDice from "@/utils/rollDice";
import { motion } from "motion/react";
import "@/components/Dice/dice.css";

interface DiceProps {
  faces: number;
}

// interface indicando a posição do ponto na matriz
interface Position {
  row: number;
  column: number;
}


const facePositions: Record<number, Position[]> = {
  1: [{ row: 2, column: 2 }],

  2: [
    { row: 1, column: 1 },
    { row: 3, column: 3 },
  ],

  3: [
    { row: 1, column: 1 },
    { row: 2, column: 2 },
    { row: 3, column: 3 },
  ],

  4: [
    { row: 1, column: 1 },
    { row: 1, column: 3 },
    { row: 3, column: 1 },
    { row: 3, column: 3 },
  ],

  5: [
    { row: 1, column: 1 },
    { row: 1, column: 3 },
    { row: 2, column: 2 },
    { row: 3, column: 1 },
    { row: 3, column: 3 },
  ],

  6: [
    { row: 1, column: 1 },
    { row: 2, column: 1 },
    { row: 3, column: 1 },
    { row: 1, column: 3 },
    { row: 2, column: 3 },
    { row: 3, column: 3 },
  ],
};

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

  // no exemplo, caso o "number" seja 1, um array contendo row e column será atribuído a "positions". 
  const positions = facePositions[number];

  return (
    <>
      <motion.div
        className="dice"
        initial={{ opacity: 0, y: 20 }}
        animate={
          // caso isRolling seja true
          isRolling
            ? { opacity: 1, y: 0, scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }
            : // caso isRolling seja false
              { opacity: 1, y: 0, scale: 1, rotate: 0 }
        }
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        // estabelece ao final da animação o valor false para o estado isRolling
        onAnimationComplete={() => setIsRolling(false)}
      >
        {/* Sendo assim, quando for clicado, um novo "number" será gerado. Supondo que seja gerado o número "4", então será selecionada a chave "4" de "facePositions" e positions" recebe um array com quatro "objetos", representando cada ponto do dado. No primeiro objeto de "positions" a ser mapeado, serão extraídos os valores das chaves "row" e "column", no caso respectivamente "1" e "1". Com isso será gerada um key única (exigÊncia do React) e em "style" definirão a linha e a coluna no componente Dice, estilizado como uma matriz 3x3, onde será criado o span; Aqui, no exemplo, seria na linha 1, coluna 1, pois o número "4" em bolinhas ocupar esse e mais outros três espaços. Se não houvesse a especificação em "style" seriam criadas quatro bolinhas, uma para cada objeto da chave de "positions" selecionada, mas uma seguida da outra, sem a correlação linha/coluna */}
        {positions.map(({ row, column }) => (
          // span estilizado em formato de ponto. Será renderizado com base no par row e column
          <span
            key={`${row}-${column}`}
            className="dot"
            style={{
              gridRow: row,
              gridColumn: column,
            }}
          />
        ))}
      </motion.div>

      <Button onRollDice={handleRoll} />
    </>
  );
}
