import Dice from "@/components/Dice/Dice";
import DiceSelector from "./components/DiceSelector/DiceSelector";
import { useDiceStore } from "./store/useDiceStore";
import Button from "./components/Button/Button";
import { useState } from "react";

function App() {

 // const result = useDiceStore((state)=>state.result);

  // Array que armazena os dados em tela: o valor inicial é de um dado de seis faces
  // OBS: o valor da face inicial como sendo "1" está especificado em Dice.tsx
  const dices = useDiceStore((state) => state.dices);

  // Função que adiciona um dado em tela: utiliza o setter de "dices" para acrescentar o novo dado ao array
  const addDice = useDiceStore((state) => state.addDice);

  // Função que remove um dado específico: faz um "filter" em "dices" passando o "id" do dado a ser removido
  // OBS: passado via props para "Dice" com "onRemove"
  const removeDice = useDiceStore((state) => state.removeDice);

  // Função que atualiza a quantidade de faces do dado: percorre o array "dices" com o map() em busca do dado com "id" idêntico ao "id" passado como argumento e atualiza sua propriedade "faces"
  // OBS: disparada no evento de onChange de DiceSelector. Recebe o "id" e "faces" como argumento
  const updateDiceFaces = useDiceStore((state) => state.updateDiceFaces);

  // Função que incrementa o "rollId" a cada clique em "Rolar dados": ela é chamada no evento de clique do botão e consiste em incrementar o rollId
  const rollAll = useDiceStore((state) => state.rollAll);

  // Estado local que controla o "disabled" dos botões enquanto os dados estão rolando: após o clique em "Rolar dados", seu valor se torna "true", desabilitando o botão
  // OBS: passado via props para "Dice" com "isRollingAll"
  const [isRollingAll, setIsRollingAll] = useState(false);

  // Função que indica que a animação de rolar os dados terminou: informação ve do componente filho "Dice"
  // OBS: passado via props para "Dice" com "onRollComplete"
  function handleRollComplete() {
    setIsRollingAll(false);
  }

  return (
    <div className="app">
      <h1 className="app-title">Dice Roller 🎲</h1>

      {dices.length === 0 && <p>Nenhum dado adicionado</p>}

      <div className="dice-list">
        {dices.map((d) => (
          <div className="dice-item" key={d.id}>
            <DiceSelector
              value={d.faces}
              onChange={(faces) => updateDiceFaces(d.id, faces)}
            />

            <Dice
              // Dice recebe dois dados em forma de string na prop "key": isso garante que cada uma seja única com o "d.id" do dado, mas também depende de "f.faces". Umas vez que qualquer dos dois mude, indica que o componente deve ser remontado, garantindo que o valor incial seja utilizado a cada clique para mudar a quantidade de faces. Isso previne a quebra da aplicação por selecionar uma quantidade de faces que o sorteio antigo não coube. Ex.: sortear em D20 o número 17 e, logo em seguida, alterar a quantidade de faces para D6, que não comporta o valor 17 ()
              key={`${d.id}-${d.faces}`}
              faces={d.faces}
              onRemove={() => removeDice(d.id)}
              isRollingAll={isRollingAll}
              onRollComplete={handleRollComplete}
            />
          </div>
        ))}
      </div>

        
        

      <div className="button-container">
        <div className="dice-actions">
          <button type="button" onClick={() => addDice()}>
            Adicionar dado
          </button>
        </div>
        {/* Botão só aparece se houver pelo menos um dado em "dices" */}
        {dices.length !== 0 && (
          <div className="roll-actions">
            <Button
              type="button"
              onClick={() => {
                rollAll();
                setIsRollingAll(true);
              }}
              disabled={isRollingAll}
            >
              Rolar os dados
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
