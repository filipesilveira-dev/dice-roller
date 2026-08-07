// botão reaproveitável
interface ButtonPros{
    onRollDice: ()=> void
}

export default function Button({onRollDice}: ButtonPros){
    return(
        <button onClick={onRollDice}>Rolar o dado</button>
    )
}