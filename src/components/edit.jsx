import { useEffect, useState, useRef } from "react";
import "../styles/App.css"
import Nav from "./nav";

export default function EditCard({ id }){
    const questionRef = useRef(null)
    const answerRef = useRef(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCard = async () => {
          try {
            const response = await fetch(`/api/${id}`);
            const data = await response.json(); // Corrected this line
            questionRef.current.value = data.question;
            answerRef.current.value = data.answer;
           setLoading(false);
          } catch (err) {
            console.log(err)
          }
        };
      
        fetchCard();
      }, []);
      

    const handleSubmit = async () => {
        console.log(questionRef.current.value);
        try {
          const response = await fetch('/fetchcards', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: questionRef.current.value,
              answer: answerRef.current.value,
              id:id
            })
          });
          
          if (!response.ok) {
            // handle error response
            throw new Error('Server response was not ok');
          }
          
          const post = await response.json(); // Parse the JSON response
          window.location.href = '/'
        } catch (err) {
          console.log(err);
        }
      };
      
    // if(loading) return <h1>Loading...</h1> 


    return(
    <>
        <Nav/>
        <h2>Edit card</h2>
        <div className="form">
            <div className="edit">
                <label htmlFor="q">Question</label>
                <textarea ref={questionRef} id="q" type="text"/>
            </div>
            <div className="edit">
                <label htmlFor="a">Answer</label>
                <textarea ref={answerRef} id="a" type="text"/>
            </div>

            <button onClick={()=> handleSubmit()}>submit</button>
        </div>
        
    </>
    )
}