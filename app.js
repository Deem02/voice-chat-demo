const TOGGLE_BTN = document.getElementById("toggleBtn")
const USER_VISUALIZER = document.getElementById("userVisualizer")
const CHAT_HISTORY = document.getElementById("chatHistory")

const VOICE = window.speechSynthesis

let isChatting = false;
let speechObj = null;
// let context = new AudioContext();
let stream = null
let animationId = null
let currentlySpeaking = null

const chatHistory = [{
  role: "system",
  content: "You are conversational and give short responses of no more than 3 sentences, no matter how complex the question. If you get a complex topic, you will engage in conversation rather than give a long response"
}]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition // SpeechRecognition | undefined

// async function startChat() {
//   TOGGLE_BTN.innerText = "Stop"
//   speechObj = new SpeechRecognition()
//   letUserSpeak()
// }

async function startChat() {
    TOGGLE_BTN.innerText = "Stop";
    
    // Create and resume the AudioContext
    context = new AudioContext();
    await context.resume();
    
    speechObj = new SpeechRecognition();
    letUserSpeak();
  }

function stopChat() {
  if (currentlySpeaking === "user") stopUserRecording()
  if (VOICE.speaking) VOICE.cancel()
  currentlySpeaking = null
  speechObj = null
  TOGGLE_BTN.innerText = "Start"
}

function appendContent({ role, content }) {
  chatHistory.push({ role, content })
  const contentEl = document.createElement('p')
  contentEl.innerText = content;
  contentEl.classList.add('speechBubble', role)
  CHAT_HISTORY.append(contentEl)
}

async function letUserSpeak() {
  currentlySpeaking = "user"
  const newStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  })
  stream = newStream
  const source = context.createMediaStreamSource(newStream)
  const analyzer = context.createAnalyser()
  source.connect(analyzer)
  animationId = updateUserBubble(analyzer)
  
  speechObj.start()
  speechObj.onresult = function transcribe(e) { // e: SpeechRecognitionEvent
    const { transcript } = e.results[0][0] // string
    appendContent({ role: currentlySpeaking, content: transcript })
    stopUserRecording()
    letAISpeak()
  }
}

// async function letAISpeak() {
//   currentlySpeaking = "assistant"
//   const response = await (await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: chatHistory
//     }),

//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${OPENAI_API_KEY}`
//     }

//   })).json()
//   const { content } = response.choices[0].message
//   appendContent({ role: currentlySpeaking, content })

//   const spokenResponse = new SpeechSynthesisUtterance(content)
//   spokenResponse.onend = () => letUserSpeak()
//   VOICE.speak(spokenResponse)
// }


async function letAISpeak() {
    currentlySpeaking = "assistant";
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: chatHistory,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 429) {
          // Handle rate limiting
          console.log("Rate limit exceeded, waiting before retrying...");
          await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute before retrying
          return letAISpeak(); // Retry the request
        } else {
          const error = await response.json();
          console.error("OpenAI API error:", error);
          return;
        }
      }
  
      const { content } = (await response.json()).choices[0].message;
      appendContent({ role: currentlySpeaking, content });
  
      const spokenResponse = new SpeechSynthesisUtterance(content);
      spokenResponse.onend = () => letUserSpeak();
      VOICE.speak(spokenResponse);
    } catch (error) {
      console.error("Error in letAISpeak():", error);
    }
  }

function updateUserBubble(analyzer) {
  const fbcArray = new Uint8Array(analyzer.frequencyBinCount)
  analyzer.getByteFrequencyData(fbcArray)
  const level = fbcArray.reduce((accum, val) => accum + val, 0) / fbcArray.length

  USER_VISUALIZER.style.transform = `scale(${level / 10})`
  
  animationId = requestAnimationFrame(() => updateUserBubble(analyzer))
}

function stopUserRecording() {
  cancelAnimationFrame(animationId)
  animationId = null
  stream.getTracks().forEach(s => s.stop())
  stream = null
  USER_VISUALIZER.style.transform = 'scale(0)'
}

TOGGLE_BTN.addEventListener("click", () => {
  isChatting = !isChatting;
  isChatting ? startChat() : stopChat()
})