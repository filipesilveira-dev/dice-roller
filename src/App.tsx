import Dice from "@/components/Dice/Dice";
import { useState } from "react";
import DiceSelector from "./components/DiceSelector/DiceSelector";
//import type { DiceFaces } from "./types/dice";
// evolução do DiceFaces. Cada dado terá o próprio "id" e "númerop de faces"
import type { DiceConfig } from "./types/diceConfig";

function App() {
  // const [faces, setFaces] = useState<DiceConfig>(6); <-- ANTES
  // estado que recebe um array de dados, possibilitando a utilização de múltiplos dados, cada uma com "id" e "faces" próprios
  const [dice, setDice] = useState<DiceConfig[]>([
    { id: "crypto.randomUUID()", faces: 6 }, { id: "crypto.randomUUID()", faces: 20 },
  ]);

  return (
    <div>
      <h1>Dice Roller 🎲</h1>
      <DiceSelector
        value={dice[0].faces}
        onChange={(faces) =>
          setDice((currentDice) =>
            currentDice.map((d) => (d.id === dice[0].id ? { ...d, faces } : d)),
          )
        }
      />
      <div>
        {/* renderiza um dado para cada dado presente no estado (que é um array de objetos) "dice" */}
        {dice.map((d) => (
          <Dice key={d.id} faces={d.faces} />
        ))}
      </div>
    </div>
  );
}

export default App;
