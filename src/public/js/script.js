const socketClient = io();

let user;

const chatBox = document.getElementById("chatBox");

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

chatBox.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length>0){
            socketClient.emit("message", {user:user, message:chatBox.value});
            chatBox.value = "";
        };
    };
});

// Recibimos los mensajes y los mostramos por pantalla
socketClient.on("messageLogs", (data) => {
    let log = document.getElementById("messageLogs");
    let messagesHTML = ""; // Variable para almacenar los mensajes en HTML

    // Iteramos sobre los mensajes recibidos
    data.forEach((msg) => {
        messagesHTML += `${msg.user} dice: ${msg.message} <br>`;
    });

    // Asignamos la cadena de mensajes al elemento en el DOM
    log.innerHTML = messagesHTML;
});

