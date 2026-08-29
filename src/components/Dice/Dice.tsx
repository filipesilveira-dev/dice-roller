import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import rollDice from "@/utils/rollDice";
import { motion } from "motion/react";
import "@/components/Dice/dice.css";
// estabelece a quantidade de faces disponibiliuzadas pela aplição
import type { DiceFaces } from "@/types/dice";
import { useDiceStore } from "@/store/useDiceStore";

interface DiceProps {
  id: string;
  // só serão aceitos os dados com a quantidade de faces estabelecidas aqui
  faces: DiceFaces;
  onRemove: () => void;
  isRollingAll: boolean;
  onRollComplete: () => void;
}

// interface Position {
//   row: number;
//   column: number;
// }

// só deve ser utilizado se faces === 6
// const facePositions: Record<number, Position[]> = {
//   1: [{ row: 2, column: 2 }],

//   2: [
//     { row: 1, column: 1 },
//     { row: 3, column: 3 },
//   ],

//   3: [
//     { row: 1, column: 1 },
//     { row: 2, column: 2 },
//     { row: 3, column: 3 },
//   ],

//   4: [
//     { row: 1, column: 1 },
//     { row: 1, column: 3 },
//     { row: 3, column: 1 },
//     { row: 3, column: 3 },
//   ],

//   5: [
//     { row: 1, column: 1 },
//     { row: 1, column: 3 },
//     { row: 2, column: 2 },
//     { row: 3, column: 1 },
//     { row: 3, column: 3 },
//   ],

//   6: [
//     { row: 1, column: 1 },
//     { row: 2, column: 1 },
//     { row: 3, column: 1 },
//     { row: 1, column: 3 },
//     { row: 2, column: 3 },
//     { row: 3, column: 3 },
//   ],
// };

export default function Dice({
  id,
  faces,
  onRemove,
  isRollingAll,
  onRollComplete,
}: DiceProps) {
  // 1. Busca a lista de dados da store do Zustand
  const dices = useDiceStore((state) => state.dices);

  // 2. Encontra o valor salvo para ESTE dado específico (usando o id)
  const [number, setNumber] = useState<number>(() => {
    const currentDice = dices?.find((d) => d.id === id);
    
    // Se o dado não existir, ou se o 'value' for null/undefined, assume 1
    if (
      !currentDice ||
      currentDice.value === null ||
      currentDice.value === undefined
    ) {
      return 1;
    }

    return currentDice.value;
  });

  const [isRolling, setIsRolling] = useState(false);
  // guarda o valor gerado aleatório durante a animação e só atribui ao estado "number" ao final da animação com o "onAnimationComplete"
  const pendingResult = useRef(number);

  // useDiceStore
  const rollId = useDiceStore((state) => state.rollId);
  const previousRollId = useRef(rollId);
  // atualiza "value" com o "pendingResult,current", mesmo valor de "number"
  const updateDiceValue = useDiceStore((state) => state.updateDiceValue);

  // Memoriza a referência da função dentro de useEffect: caso nada altere entre as re-renderizações, ela não será recriada
  const handleRoll = useCallback(() => {
    // previne várias chamadas por cliques rápidos durante animação
    if (isRolling) {
      return;
    }

    // gera o número aleatório
    const result = rollDice(faces);

    // salva o número aleatório com useRef() que será adicionado a "number" ao final da animação
    pendingResult.current = result;

    // altera o estado, indicando que o dado está rolando
    setIsRolling(true);
  }, [isRolling, faces]);

  // const positions = facePositions[number];

  useEffect(() => {
    if (rollId === previousRollId.current) {
      return;
    }

    previousRollId.current = rollId;

    handleRoll();
  }, [rollId, handleRoll]);

  return (
    <>
      <motion.div
        className={`dice ${faces > 6 ? "polyhedral" : ""}`}
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
            updateDiceValue(id, pendingResult.current);
            setIsRolling(false);
            // chama a função do pai que altera "isRollingAll" de volta para "false"
            onRollComplete();
          }
        }}
      >
        {faces === 6 || faces === 4 ? (
          <img
            src={`${import.meta.env.BASE_URL}dado_face_${number}.png`}
            alt={`Imagem dado com valor ${number}`}
            className="dice-image"
          />
        ) : (
          <div className="dice-hexagon">
            <span className="number">{number}</span>
          </div>
        )}
      </motion.div>

      <div className="dice-actions-individual">
        <Button onClick={handleRoll} disabled={isRolling || isRollingAll}>
          Rolar dado
        </Button>
        <Button
          type="button"
          onClick={onRemove}
          className="button button-danger"
        >
          Remover
        </Button>
      </div>
    </>
  );
}
