// assets/js/chat.js
export class BonsaiChatUI {
    constructor() {
      this.chatHistory = document.getElementById('chat-history');
      this.userInput = document.getElementById('user-input');
      this.sendButton = document.getElementById('send-button');
      
      this.initEventListeners();
    }
  
    initEventListeners() {
      this.sendButton.addEventListener('click', () => this.handleUserInput());
      this.userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUserInput();
      });
    }


  /*
    handleUserInput() {
      const message = this.userInput.value.trim();
      if (message === '') return;
      
      this.addUserMessage(message);
      this.userInput.value = '';
      
      // Aquí luego llamarás a tu API de IA
      // this.showTypingIndicator();
      // await this.callYourIAAPI(message);
    }
  */


    async handleUserInput() {

      const lastMessages = getLastMessages();

      const message = this.userInput.value.trim();
      if (message === '') return;
    
      this.addUserMessage(message);
      this.userInput.value = '';
    
      const typing = this.showTypingIndicator();

    
//console.log(lastMessages)

    
      try {
        const response = await fetch('https://hugomrjpy.pythonanywhere.com/chat-bonsaiki', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pregunta: message,
            historial: lastMessages 
          })
        });
    
        const data = await response.json();
        this.removeTypingIndicator(typing);
    
        if (data.respuesta) {
          this.addBotMessage(data.respuesta);
        } else {
          this.addBotMessage('Error: respuesta no válida.');
        }
      } catch (err) {
        this.removeTypingIndicator(typing);
        this.addBotMessage('Error al conectar con el servidor.');
        console.error(err);
      }
    }
    





    




    addUserMessage(text) {
      this.addMessage(text, 'user');
    }
  
    addBotMessage(text) {
      this.addMessage(text, 'bot');
    }
  
    addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${sender}-message`;
      
      const icon = sender === 'bot' ? 'fa-robot' : 'fa-user';
      const senderName = sender === 'bot' ? 'Asistente Bonsaiki' : 'Tú';
      
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-header">
            <span class="icon-text">
              <span class="icon">
                <i class="fas ${icon}"></i>
              </span>
              <span>${senderName}</span>
            </span>
          </div>
          <div class="message-body">${text}</div>
        </div>
      `;
      
      this.chatHistory.appendChild(messageDiv);
      this.scrollToBottom();
    }
  
    showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'typing-indicator';
      typingDiv.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;
      this.chatHistory.appendChild(typingDiv);
      this.scrollToBottom();
      return typingDiv;
    }
  
    removeTypingIndicator(typingElement) {
      if (typingElement && typingElement.parentNode) {
        typingElement.parentNode.removeChild(typingElement);
      }
    }
  
    scrollToBottom() {
      this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }
  }
  




  function getLastMessages() {
    const chatHistory = document.getElementById('chat-history');
    const messages = chatHistory.querySelectorAll('.message');
    
    // 1. Filtrar mensajes relevantes (ignorar el mensaje inicial del bot)
    const filteredMessages = Array.from(messages).filter(msg => {
      const isInitialMsg = msg.classList.contains('bot-message') && msg.querySelector('.fa-ai');
      return !isInitialMsg;
    });
  
    // 2. Tomar últimos 10 mensajes (5 pares pregunta-respuesta)
    const last10Messages = filteredMessages.slice(-10);
  
    // 3. Construir texto plano (formato optimizado para IA)
    let plainText = '';
    for (let i = 0; i < last10Messages.length; i++) {
      const msg = last10Messages[i];
      const isUser = msg.classList.contains('user-message');
      const text = msg.querySelector('.message-body').textContent.trim();
      
      plainText += isUser 
        ? `\n\n[Usuario]: ${text}` 
        : `\n[Asistente]: ${text}`;
    }
  
    return plainText.trim(); // Texto limpio, sin espacios innecesarios
  }





  // Inicialización
  export function initChatUI() {
    return new BonsaiChatUI();
  }