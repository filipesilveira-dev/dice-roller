import Dice from "@/components/Dice/Dice";
import { useState } from "react";
import DiceSelector from "./components/DiceSelector/DiceSelector";
import type { DiceFaces } from "./types/dice";

function App() {
  const [faces, setFaces] = useState<DiceFaces>(6);

  return (
    <div>
      <h1>Dice Roller 🎲</h1>
      <DiceSelector value={faces} onChange={setFaces} />
      <Dice faces={faces} />
    </div>
  );
}

export default App;
