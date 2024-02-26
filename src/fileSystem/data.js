import fs from "fs";

const filePath = './src/data/message.json';

function loadMessages() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al cargar mensajes:', err);
        return [];
    }
}

function saveMessages(messages) {
    const json = JSON.stringify(messages, null, 2); // null, 2 para dar formato legible
    fs.writeFileSync(filePath, json, 'utf8');
    console.log('Mensajes guardados correctamente.');
}

function addMessage(message) {
    const messages = loadMessages();
    messages.push(message);
    saveMessages(messages);
}

// Temporizador para borrar el archivo después de 5 minutos
setTimeout(() => {
    try {
        // Borramos el archivo
        fs.unlinkSync(filePath);
        console.log(`El archivo ${filePath} ha sido eliminado después de 5 minutos.`);
    } catch (err) {
        console.error('Error al eliminar el archivo:', err);
    }
}, 1 * 60 * 1000); // 1 minutos en milisegundos

export { loadMessages, saveMessages, addMessage };

