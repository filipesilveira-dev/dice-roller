import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import rollDice from "@/utils/rollDice";
import { motion } from "motion/react";
import "@/components/Dice/dice.css";
// estabelece a quantidade de faces disponibiliuzadas pela aplição
import type { DiceFaces } from "@/types/dice";
import { useDiceStore } from "@/store/useDiceStore";

interface DiceProps {
  // só serão aceitos os dados com a quantidade de faces estabelecidas aqui
  faces: DiceFaces;
  onRemove: ()=> void;
  isRollingAll: boolean;
  onRollComplete: ()=> void;
}

interface Position {
  row: number;
  column: number;
}

// só deve ser utilizado se faces === 6
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

export default function Dice({ faces, onRemove, isRollingAll, onRollComplete }: DiceProps) {
  const [number, setNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  // guarda o valor gerado aleatório durante a animação e só atribui ao estado "number" ao final da animação com o "onAnimationComplete"
  const pendingResult = useRef(number);

  // useDiceStore
  const rollId = useDiceStore((state) => state.rollId);
  const previousRollId = useRef(rollId);

  function handleRoll() {
    // previne várias chamadas por cliques rápidos durante animação
    if (isRolling) {
      return;
    }

    // gera o número aleatório
    const result = rollDice(faces);

    // salva o número aleatório com useRef()
    pendingResult.current = result;

    // altera o estado, indicando que o dado está rolando
    setIsRolling(true);
  }

  const positions = facePositions[number];

  useEffect(() => {
    if (rollId === previousRollId.current) {
      return;
    }

    previousRollId.current = rollId;

    handleRoll();
  }, [rollId]);

  return (
    <>
      <motion.div
        className="dice"
        // initial={{ opacity: 0, y: 20 }}
        animate={
          // caso "isRolling" seja true, então ele fará rotações simulando o rolar do dado
          isRolling
            ? {
                opacity: 1,
                y: 0,
                scale: [1, 1.15, 0.95, 1.05, 1],
                rotate: [0, 15, -15, 10, -5, 0],
              }
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }
        }
        transition={{
          // duração da animação
          duration: 1.0,
          ease: "easeInOut",
        }}
        // caso isRolling seja true, então atribui o valor em "pendingResult.current" a "number" por meio do seu setter e indica o final da animação settando "isRolling" como false
        onAnimationComplete={() => {
          if (isRolling) {
            setNumber(pendingResult.current);
            setIsRolling(false);
            // chama a função do pai que altera "isRollingAll" de volta para "false"
            onRollComplete();
          }
        }}
      >
        {faces === 6 || faces === 4 ? (
          // {/* Sendo assim, quando for clicado, um novo "number" será gerado. Supondo que seja gerado o número "4", então será selecionada a chave "4" de "facePositions" e positions" recebe um array com quatro "objetos", representando cada ponto do dado. No primeiro objeto de "positions" a ser mapeado, serão extraídos os valores das chaves "row" e "column", no caso respectivamente "1" e "1". Com isso será gerada um key única (exigÊncia do React) e em "style" definirão a linha e a coluna no componente Dice, estilizado como uma matriz 3x3, onde será criado o span; Aqui, no exemplo, seria na linha 1, coluna 1, pois o número "4" em bolinhas ocupar esse e mais outros três espaços. Se não houvesse a especificação em "style" seriam criadas quatro bolinhas, uma para cada objeto da chave de "positions" selecionada, mas uma seguida da outra, sem a correlação linha/coluna */}
          positions.map(({ row, column }) => (
            <span
              key={`${row}-${column}`}
              className="dot"
              style={{
                gridRow: row,
                gridColumn: column,
              }}
            />
          ))
        ) : (
          <span className="number">{number}</span>
        )}
      </motion.div>

      <Button onClick={handleRoll} disabled={isRolling || isRollingAll}>Rolar dado</Button>
       <Button type="button" onClick={onRemove}>
              Remover
            </Button>
      
    </>
  );
}
