import './App.css';
import { useState, useEffect } from 'react';
import Btn from './components/Btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

function App() {

  //All Quotes State
  const [quotesData] = useState([
    {id:1, 
      quote:"Iteration not innovation", 
      author:"Annup Kapur"},
    {id:2, 
      quote:"Practice makes perfect", 
      author:"Skittle"},
    {id:3, 
      quote:"Be like water", 
      author:"Bruce Lee"},
    {id:4, 
      quote:"Be comfortable being uncomfortable", 
      author:"Peter McWilliams"}
  ]);

  //Current Quote State
  const [newQuote, setRandQuote] = useState(
    {id:0, quote:"Hi", author:""}
  )

  //Colors State
  const [colors, setColors] = useState({
    hue:100,
    saturate:"50%",
    light:"50%"
  });

  const randomNumber = (max, min) => {return (Math.floor(Math.random() * (max-min) + min))}

  //randomly select a current quote
  const randomQuote = () => {

    var rando = 0;
    do{
      rando = Math.floor(Math.random() * quotesData.length)
    } while(rando === (newQuote.id-1))

    //const rando = Math.floor(Math.random() * quotesData.length)
    setRandQuote(quotesData[rando])

    setColors({
      hue:randomNumber(340,20),
      saturate:"50%",
      light:"50%"
    })
  }

  const setMaxVal = () => {
    return 1+14+14+21+16;
  }

  const randomColGen = () => {
    const h_Val = randomNumber(360,0);
    const s_Val = randomNumber(100,60);
    const l_Val = randomNumber(100,0);

    return "hsl(" + h_Val + ", " + s_Val + "%, " + l_Val + "%)";
  }


  useEffect(() => {
    randomQuote();
  }, []);

  const hueOffset = 20;

  //This is redundant - kept just in case I decide to add background option functionality - might be useful as a hue offset background generator
  const bgGradient = {background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 120%), linear-gradient(" + randomNumber(160,20) + "deg, hsl(" + (colors.hue-hueOffset) + ", " + colors.saturate + ", " + colors.light + ") " + randomNumber(28, 5) + "%, hsl(" + colors.hue + ", " + colors.saturate + ", " + colors.light + ") " + randomNumber(61, 38) + "%, hsl(" + (colors.hue+hueOffset) + ", " + colors.saturate + ", " + colors.light + ") " + randomNumber(95, 72) + "%)"};

  const bgGrad = {background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 120%),  linear-gradient(" + 
        randomNumber(160,20) + "deg, " + randomColGen() + " " + randomNumber(28, 5) + "%, hsl(" + colors.hue + ", " + colors.saturate + ", " + colors.light + ") " + randomNumber(61, 38) + "%, " + randomColGen() + " " + randomNumber(95, 72) + "%)", animation:"bgAnim 20000ms ease infinite alternate"};

  const quoteCol = {color:"hsl(" + colors.hue + ", " + colors.saturate + ", " + colors.light + ")"}

  //send tweet
  const tweetCode = "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + newQuote.quote + '" - ' + newQuote.author);


  return (
    <div className="App" style={bgGrad}>
      <div id="quote-box">
        <h1 id="text" style={quoteCol}>{newQuote.quote}</h1>
        { newQuote.id===0 ? '' : <h2 id="author">- {newQuote.author}</h2> }
      <div className="buttons-wrapper">
        { newQuote.id===0 ? '' : <a className="tweetQuote button" id="tweet-quote" style={quoteCol} href={tweetCode}><FontAwesomeIcon icon={faTwitter} /></a> }
        <Btn color={quoteCol} btnID="new-quote" btnText={<FontAwesomeIcon icon={faSyncAlt} />} onClick={randomQuote}/>
      </div>
      </div>
    </div>
  );
}

export default App;