const socketClient = io();

let user;
const chatBox = document.getElementById("chatBox");

//sweet alert II
Swal.fire({
    title: "Identify yourself",
    input: "text",
    text: "Enter a username",
    inputValidator: (value)=>{
        return !value && "You need a name to continue";
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value;
    // console.log(user);
});

// Agregamos un event
chatBox.addEventListener("keyup", (event) => {
    // Verificamos si la tecla presionada es "Enter"
    if (event.key === "Enter") {
        // Si la tecla presionada es "Enter", verificamos si el contenido del input no está vacío
        if (chatBox.value.trim().length > 0) {
            // Si el contenido del input no está vacío, emitimos un evento "message" al servidor a través del socket
            // Este evento lleva consigo un objeto que contiene el nombre de usuario y el mensaje ingresado por el usuario
            socketClient.emit("message", { user: user, message: chatBox.value });
            // Después de enviar el mensaje, limpiamos el contenido del input
            chatBox.value = "";
        };
    };
});

// Recibimos los mensajes y los mostramos por pantalla
socketClient.on("messageLogs", (data) => {
    let log = document.getElementById("messageLogs");
    let messagesHTML = ""; 
    // Iteramos sobre los mensajes recibidos
    data.forEach((msg) => {
        messagesHTML += `${msg.user} dice: ${msg.message} <br>`;
    });
    // Asignamos la cadena de mensajes al elemento en el DOM
    log.innerHTML = messagesHTML;
});

