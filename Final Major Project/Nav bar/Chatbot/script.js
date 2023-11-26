document.getElementById('theme-toggle').addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.body.style.setProperty('--bg-color', '#f5f5f5');
        document.body.style.setProperty('--text-color', '#000');
        document.body.style.setProperty('--navbar-bg-color', '#333');
        document.body.style.setProperty('--navbar-text-color', '#fff');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        document.body.style.setProperty('--bg-color', '#333');
        document.body.style.setProperty('--text-color', '#fff');
        document.body.style.setProperty('--navbar-bg-color', '#222');
        document.body.style.setProperty('--navbar-text-color', '#ddd');
    }
});

// Your existing script logic

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessageToChat('User', userInput);
        getChatGPTResponse(userInput);
        document.getElementById('user-input').value = '';
    }
}

function addMessageToChat(sender, message) {
    let chatBox = document.getElementById('chat-box');
    let messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Include the ChatGPT API function here (getChatGPTResponse)
async function getChatGPTResponse(message) {
    const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const apiKey = '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'; // Replace with your actual API key

    try {
        let response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        addMessageToChat('MURAMChat', data.choices[0].text.trim());
    } catch (error) {
        console.error('Error fetching response from OpenAI: ', error);
        addMessageToChat('MURAMChat', 'Sorry, I am having trouble responding right now.');
    }
}
