import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DiceFaces } from "../types/dice";
import type { DiceConfig } from "@/types/diceConfig";

// Contrato de dados
interface DiceStore {
  // Dices, anteriormente em App, trata-se de um array de obetos, onde cada objeto recebe um id e uma quantidade de faces
  dices: DiceConfig[];
  rollId: number;

  // Ações:

  // Função de adicionar pode receber no futuro "faces" como argumento, permitindo ao usuário iniciar com um dado com a quantidade de faces que desejar. Atualmente é obrigatoriamente um dado de seis faces
  addDice: (faces?: DiceFaces) => void;
  // Função de remover recebe o "id" do dado a ser deletado
  removeDice: (id: string) => void;
  // Função que atualiza a quantidade de faces de um dado específico
  updateDiceFaces: (id: string, faces: DiceFaces) => void;
  rollAll: () => void;
  // Função que atualiza o estado global com base no resultado "number" obtido após rolar o dado
  updateDiceValue: (id: string, value: number) => void;
}

// Criação do Store
export const useDiceStore = create<DiceStore>()(
  // middleware que permite a persistencia de estado
  persist(
    (set) => ({
      // valor inicial de rollId que servirá para controlar o rolar de todos os dados simultaneamente
      rollId: 0,

      // Aplicação inicia com um dado de seis faces
      dices: [{ id: crypto.randomUUID(), faces: 6, value: null }],

      // Lógica de adicionar: sempre que clicar em "adicionar dado", será criado um dado de seis faces e com "id" aleatório (newDice)
      addDice: (faces = 6) => {
        const newDice: DiceConfig = {
          id: crypto.randomUUID(),
          faces,
          value: null,
        };

        // Utiliza o setter para adicionar ao array "dices" o novo dado
        set((state) => ({
          dices: [...state.dices, newDice],
        }));
      },

      // Lógica de reomover: sempre que clicar em "Remover", um novo array será criado sem o dado com "id" passado como argumento (filter)
      removeDice: (id) => {
        set((state) => ({
          dices: state.dices.filter((dice) => dice.id !== id),
        }));
      },

      // Lógica de atualizar as faces: sempre que clicar em algum dos botões representando a quantidade de faces, ela é atualizada com base no "id" do dado selecionado
      updateDiceFaces: (id, faces) => {
        set((state) => ({
          dices: state.dices.map((dice) =>
            dice.id === id ? { ...dice, faces, value: null } : dice,
          ),
        }));
      },

      // Incrementa "rollId" em "1" a cada rolar de dados
      rollAll: () => {
        set((state) => ({
          rollId: state.rollId + 1,
        }));
      },

      // Atualiza o "value" após cada rolagem de dados dados
      updateDiceValue: (id, value) =>
        set((state) => ({
          dices: state.dices.map((dice) =>
            dice.id === id ? { ...dice, value } : dice,
          ),
        })),
    }),

    // Especifica o nome do armazenamento no localstorage e qual estado deve ser persistido
    {
      name: "dice-roller-storage",
      partialize: (state) => ({
        dices: state.dices,
      }),
    },
  ),
);
