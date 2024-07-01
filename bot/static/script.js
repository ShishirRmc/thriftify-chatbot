// function toggleChatbox() {
//     const chatbox = document.getElementById('chatbox');
//     if (chatbox.style.display === 'none' || chatbox.style.display === '') {
//         chatbox.style.display = 'block';
//     } else {
//         chatbox.style.display = 'none';
//     }
// }

// async function sendMessage() {
//     const chatboxContent = document.getElementById('chatbox-content');
//     const chatboxInput = document.getElementById('chatbox-input');
//     const messageText = chatboxInput.value.trim();

//     if (messageText !== '') {
//         const userMessage = document.createElement('div');
//         userMessage.className = 'message user-message';
//         userMessage.textContent = messageText;
//         chatboxContent.appendChild(userMessage);

//         chatboxInput.value = '';
//         chatboxContent.scrollTop = chatboxContent.scrollHeight;

//         // Send user message to the backend
//         try {
//             const response = await fetch('/chat', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ message: messageText })
//             });
//             const data = await response.json();
//             setTimeout(() => {
//                 const botMessage = document.createElement('div');
//                 botMessage.className = 'message bot-message';
//                 botMessage.textContent = data.response;
//                 chatboxContent.appendChild(botMessage);
//                 chatboxContent.scrollTop = chatboxContent.scrollHeight;

//                 // Show notification for new bot message
//                 showNotification('New message from bot', data.response);
//             }, 300); // Delay bot response by 0.3 seconds
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }
// }

// // Listen for the Enter key to send a message
// document.getElementById('chatbox-input').addEventListener('keypress', function (event) {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         sendMessage();
//     }
// });

// // Show notification function
// function showNotification(title, body) {
//     // Check if the browser supports notifications
//     if (!('Notification' in window)) {
//         console.error('This browser does not support desktop notification');
//         return;
//     }

//     // Check if notification permissions have already been granted
//     if (Notification.permission === 'granted') {
//         new Notification(title, { body: body });
//     }
//     // If not, request permission
//     else if (Notification.permission !== 'denied') {
//         Notification.requestPermission().then(function (permission) {
//             if (permission === 'granted') {
//                 new Notification(title, { body: body });
//             }
//         });
//     }
// }

function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    const notificationDot = document.getElementById('notification-dot');

    if (chatbox.style.display === 'none' || chatbox.style.display === '') {
        chatbox.style.display = 'block';
        notificationDot.style.display = 'none';
    } else {
        chatbox.style.display = 'none';
    }
}

async function sendMessage() {
    const chatboxContent = document.getElementById('chatbox-content');
    const chatboxInput = document.getElementById('chatbox-input');
    const messageText = chatboxInput.value.trim();

    if (messageText !== '') {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = messageText;
        chatboxContent.appendChild(userMessage);

        chatboxInput.value = '';
        chatboxContent.scrollTop = chatboxContent.scrollHeight;

        // user message to the backend
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageText })
            });
            const data = await response.json();
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'message bot-message';
                botMessage.textContent = data.response;
                chatboxContent.appendChild(botMessage);
                chatboxContent.scrollTop = chatboxContent.scrollHeight;

                // Play notification sound and show red mark
                playNotificationSound();
                showNotificationDot();
            }, 500); // Delay bot response 
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Listen for the Enter key
document.getElementById('chatbox-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Play notification sound
function playNotificationSound() {
    const notificationSound = document.getElementById('notification-sound');
    notificationSound.play();
}

// Show notification dot
function showNotificationDot() {
    const notificationDot = document.getElementById('notification-dot');
    notificationDot.style.display = 'block';
}

