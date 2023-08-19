import { useEffect, useState } from "react";
import "../styles/App.css"


export default function DeleteCards(){

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("/fetchcards");
          const data = await response.json();
          console.log(data);
          setCards(data)
          setLoading(false)
        };
      
        fetchData();
    
      }, []); 


    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)

    const handleDelete = async(id) =>{

        try {
            const response = await fetch(`/delete/${id}`, {
              method: 'DELETE',
            });
            if (!response.ok) {
              throw new Error('Error deleting card');
            }
          } catch (error) {
            console.error(error);
          }

        let updated = cards.filter(card => card.id !== id)
            setCards(updated)
        
        
    }


    if(loading)return <h1>Loading...</h1>

    return(
        <>
            <h1>Delete Page</h1>
            {
                cards.map((card, i) =>{
                    return(
                        <div key={card.id}>
                            <div>
                                <p>Question : {card.question}</p>
                                <p>Answer : {card.answer}</p>
                            </div>
                            <button onClick={() => handleDelete(card.id)}>Delete</button>
                        </div>
                    )
                })
            }
        </>
    )

}