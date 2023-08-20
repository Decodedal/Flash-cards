import { useEffect, useState } from 'react'
import "../styles/App.css"
import data from "../info.json"
import Card from '../components/card'
import Nav from './nav'

function App() {

  const[loading, setLoading] = useState(true)
  const [cardData, setCardData] = useState([])
  const [keyValue, setKeyValue] = useState([])
  const [seen, setSeen] = useState([])
  const [index, setIndex] = useState(getRandomIntInclusive(0,keyValue.length-1))
  const [showAnswer,setShowAnswer] = useState(false);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/fetchcards");
      const data = await response.json();
      if(data.length === 0) window.location.href = "/new"
      console.log(data);
      setCardData(data)
      setKeyValue((data).map(data => <Card q={data.question} a={data.answer}/>))
      setLoading(false)
    };
  
    fetchData();

  }, []); 
  
 

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  
  function reset(){
    setSeen([])
    setIndex(getRandomIntInclusive(0,keyValue.length-1))
  }

  useEffect(() => {
    let newIndex;
    do {
      newIndex = getRandomIntInclusive(0, keyValue.length - 1);
      console.log(newIndex)
    } while (seen.includes(newIndex));
    console.log(newIndex)
    setIndex(newIndex);
  }, [seen, keyValue.length]);

  const handleNextCard = () =>{
    if(seen.length === keyValue.length -1)return;
    setSeen(prev => [...prev, index])
    setShowAnswer(false)
    setFlip(false)
  }

  useEffect(()=>{
    setTimeout(() => {
      setShowAnswer(flip)
    }, 300);
  },[flip])

  if(loading)return <h1>Loading...</h1>

  return (
    <>
      <Nav/>
      <div style={{display:'flex', alignItems:"center", gap:'2em'}}>
        <h1>Flash Cards</h1>
        <p>{seen.length  + 1}/{keyValue.length}</p>
      </div>
          <div className={`${seen.length === keyValue.length -1 ? "show" : 'hide'}`}>
            <button id="reset" onClick={reset}>Great Job Reset?</button>
          </div>
      <div className={`card-container ${flip ? "card-flip" : undefined}`} onClick={() => setFlip(prev => !prev)}>
           {
             showAnswer 
             ? 
                 <p className='flip'>{cardData[index].answer}</p>
             :
                 <p>{cardData[index].question}</p>
           }
        </div>
      <button onClick={() => handleNextCard()}>Next</button>
      </> 
  )
}

export default App
