import "../styles/App.css"
import { useRef } from "react"
import Nav from "./nav";

export default function NewCard() {

  const questionRef = useRef(null)
  const answerRef = useRef(null)

  const handleSubmit = async () => {
    console.log(questionRef.current.value);
    try {
      const response = await fetch('/fetchcards', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionRef.current.value,
          answer: answerRef.current.value
        })
      });

      if (!response.ok) {
        // handle error response
        throw new Error('Server response was not ok');
      }

      const post = await response.json(); // Parse the JSON response
      console.log(post);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <Nav />
      <h2>Write new card</h2>
      <div className="form">
        <div className="edit">
          <label htmlFor="q">Question</label>
          <textarea ref={questionRef} id="q" type="text" />
        </div>
        <div className="edit">
          <label htmlFor="a">Answer</label>
          <textarea ref={answerRef} id="a" type="text" />
        </div>
        <button onClick={() => handleSubmit()}>submit</button>
      </div>

    </>
  )
}