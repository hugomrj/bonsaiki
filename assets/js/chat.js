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
      const message = this.userInput.value.trim();
      if (message === '') return;
    
      this.addUserMessage(message);
      this.userInput.value = '';
    
      const typing = this.showTypingIndicator();
    
      try {
        const response = await fetch('http://3.12.160.19/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pregunta: message,
            historial: [] // si querés podés guardar historial real
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
  
  // Inicialización
  export function initChatUI() {
    return new BonsaiChatUI();
  }