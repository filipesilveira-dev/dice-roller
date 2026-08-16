import Dice from "@/components/Dice/Dice";
//import { useState } from "react";
import DiceSelector from "./components/DiceSelector/DiceSelector";
//import type { DiceFaces } from "./types/dice";
// evolução do DiceFaces. Cada dado terá o próprio "id" e "númerop de faces"
//import type { DiceConfig } from "./types/diceConfig";
//import type { DiceFaces } from "./types/dice";
import { useDiceStore } from "./store/useDiceStore";
import Button from "./components/Button/Button";
import { useState } from "react";

function App() {
  // const [faces, setFaces] = useState<DiceConfig>(6); <-- ANTES
  const dices = useDiceStore((state) => state.dices);

  // adiciona um novo objeto ao array "dice" por meio do seu setter
  const addDice = useDiceStore((state) => state.addDice);

  // gera novo array sem o dado com "id" passado como argumento
  const removeDice = useDiceStore((state) => state.removeDice);

  // atualiza a quantidade de faces de um dados específico no array "dices"
  const updateDiceFaces = useDiceStore((state) => state.updateDiceFaces);

  // dispara o gatilho (rollId + 1) para rolar todos os dados
  const rollAll = useDiceStore((state) => state.rollAll);

  const rollId = useDiceStore((state) => state.rollId);

  const [isRollingAll, setIsRollingAll] = useState(false);

  function handleRollComplete() {
    setIsRollingAll(false);
  }

  return (
    <div>
      <h1>Dice Roller 🎲</h1>
      {dices.length === 0 && <p>Nenhum dado adicionado</p>}

      <button type="button" onClick={() => addDice()}>
        Adicionar dado
      </button>

      <div>
        {/* renderiza um dado para cada dado presente no estado (que é um array de objetos) "dice" */}
        {dices.map((d) => (
          <div key={d.id}>
            <DiceSelector
              value={d.faces}
              onChange={(faces) => updateDiceFaces(d.id, faces)}
            />
            <Dice
              faces={d.faces}
              onRemove={() => removeDice(d.id)}
              isRollingAll={isRollingAll}
              onRollComplete={handleRollComplete}
            />
          </div>
        ))}
      </div>
      {dices.length !== 0 && (
        <Button
          type="button"
          onClick={() => {
            rollAll();
            setIsRollingAll(true);
          }}
          disabled={isRollingAll}
        >
          Rolar os dados{rollId}
        </Button>
      )}
    </div>
  );
}

export default App;
