import type { DiceFaces } from "@/types/dice";
import "./DiceSelector.css";

interface DiceSelectorProps {
  value: DiceFaces;
  onChange: (faces: DiceFaces) => void;
}

const diceOptions: DiceFaces[] = [4, 6, 8, 10, 12, 20];

export default function DiceSelector({ value, onChange }: DiceSelectorProps) {
  return (
    <div className="dice-selector">
      <p className="selector-instruction">Selecione a quantidade de faces do dado:</p>
      <div className="selector-buttons">
        {diceOptions.map((faces) => (
          <button
            key={faces}
            type="button"
            className={faces === value ? "selected" : ""}
            onClick={() => onChange(faces)}
          >
            D{faces}
          </button>
        ))}
      </div>
    </div>
  );
}
