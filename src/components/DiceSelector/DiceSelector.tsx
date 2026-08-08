import type { DiceFaces } from "@/types/dice";
import "./DiceSelector.css";

interface DiceSelectorProps {
  value: DiceFaces;
  onChange: (faces: DiceFaces) => void;
}

const diceOptions: DiceFaces[] = [4, 6, 8, 10, 12, 20];

export default function DiceSelector({ value, onChange }: DiceSelectorProps) {
  return (
    <div>
      <h2>Selecione as faces do dado</h2>
      {/* renderiza um botão para cada tipo de dado */}
      {diceOptions.map((faces) => (
        <button
          key={faces}
          type="button"
          // atribui uma classe selected via css (background-color: green)
          className={faces === value ? "selected" : ""}
          onClick={() => onChange(faces)}
        >
          D{faces}
        </button>
      ))}
    </div>
  );
}
