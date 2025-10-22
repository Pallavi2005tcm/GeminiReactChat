
import './App.css'
import gpt_logo from './assets/chatgpt.svg';
import add_btn from './assets/add-30.png';
import msg_icon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendbtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import { useState } from 'react';
import { generateContent } from './GeminiModel';
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    const botReply = await generateContent(input);
    const botMsg = { sender: 'bot', text: botReply };
    setMessages(prev => [...prev, botMsg]);

    setInput('');
  };

  return (
    <>
      <div className="App">
        <div className="sidebar">
          <div className="upperside">
             <div className="upperside-top"><img src={gpt_logo} alt='Logo' className='logo'/><span className='brand'>GPT</span></div>
             <button className="mid-btn"><img src={add_btn} alt='new chat' className='addbtn'/><span>New Chat</span></button>
             <div className="upperside-bottom">
              <button className='query'><img src={msg_icon} alt='Query'/>What is Programming?</button>
              <button className='query'><img src={msg_icon} alt='Query'/>How to use and API?</button>
             </div>
          </div>
          <div className="lowerside">
              <div className="listItems"><img src={home} alt='' className='list_items_img'/>Home</div>
              <div className="listItems"><img src={saved} alt='' className='list_items_img'/>Saved</div>
              <div className="listItems"><img src={rocket} alt='' className='list_items_img'/>Upgrade to Pro</div>
          </div>
        </div> 
        <div className="main">
            <div className="chats">
              
                {messages.map((msg, idx) => (
                   <div key={idx} className={`chat ${msg.sender === 'bot' ? 'bot' : ''}`}>
                    <img className='chat_img' src={msg.sender === 'bot' ? gptImgLogo : userIcon} alt=''/>
                    <p className="txt">{msg.text}</p>
                   </div>
                ))}
              
            </div>
            <div className="chatFooter">
              <div className="inp">
                <input type='text' placeholder='Send a message' value={input} onChange={(e) => setInput(e.target.value)}/>
                <button className='send' onClick={handleSend}>
                  <img src={sendbtn} alt='' />
                </button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
