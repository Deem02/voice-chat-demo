# Voice Chat Demo 🎤💬

Welcome to the Voice Chat Demo repository! This project demonstrates a basic voice chat interface where users can interact with an AI assistant using speech recognition and synthesis.

## Features ✨

- **Speech Recognition**: The app captures and transcribes the user's speech in real-time.
- **Speech Synthesis**: The AI assistant responds using text-to-speech.
- **Interactive UI**: Visual feedback for user speech input and conversation history display.

## Technologies Used 🛠️

- HTML5 and CSS3 for the user interface.
- JavaScript for handling speech recognition, synthesis, and UI interactions.
- Web Speech API for speech recognition and synthesis.
- OpenAI API for generating AI responses.

## Setup 🚀

Follow these steps to set up and run the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/voice-chat-demo.git
    cd voice-chat-demo
    ```
    
2. **Set up OpenAI API Key**:
   - Obtain your API key from [OpenAI](https://beta.openai.com/signup/).
   - Create a `secret.js` file in the project root and add the following line:
     ```javascript
     const OPENAI_API_KEY = "<your API key here>";
     ```

3. **Run the application**:
   - Open `index.html` in your preferred browser.

## Usage 👩‍💻👨‍💻

- **Start Chat**: Click the "Start" button to begin the voice interaction.
- **Stop Chat**: Click the "Stop" button to end the voice interaction.
- **Conversation**: Speak into your microphone. The AI assistant will respond vocally and display the conversation in the chat history.

## Code Overview 📄

### HTML Structure 📜

The HTML file contains the main structure of the application:
- A `button` to start/stop the chat.
- A `div` for user visual feedback.
- A `div` for displaying chat history.

### CSS Styling 🎨

The CSS styles define the layout and appearance of the application:
- Basic styling for the body, button, and chat history.
- Visualization for user speech input.

### JavaScript Functionality 💻

The JavaScript file includes:
- Initialization and configuration of the Web Speech API.
- Functions for handling chat start/stop, user speech recognition, and AI responses.
- Error handling and retry logic for API requests.

### Main Functions ⚙️

- `startChat()`: Initializes and starts the chat session.
- `stopChat()`: Stops the chat session and any ongoing speech synthesis.
- `letUserSpeak()`: Handles user speech input and transcribes it.
- `letAISpeak()`: Sends user input to the OpenAI API and handles the AI assistant's response.
- `appendContent()`: Appends new messages to the chat history.
- `updateUserBubble()`: Provides visual feedback for user speech input.
- `stopUserRecording()`: Stops user speech recording and visual feedback.

## Output
[Click to watch the video](https://github.com/user-attachments/assets/0249ff9e-3624-4153-8bd9-6bdb89e01d02)
