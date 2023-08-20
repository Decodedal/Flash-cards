import { useEffect, useState } from "react"
import "../styles/card.css"
const Card = ({q , a}) =>{

    const [showAnswer, setShowAnswer] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            setShowAnswer(false)
        },10000)
    },showAnswer)

    return(
        <div className="card-container" onClick={() => setShowAnswer(prev => !prev)}>
           {
             showAnswer 
             ? 
                 <p>{a}</p>
             :
                 <p>{q}</p>
           }
        </div>
    )
}

export default Card