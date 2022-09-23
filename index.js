const render = (data) => {
    const html = data
      .map((msg) => `<li>${msg.autor}: ${msg.message}</li>`)
      .join("");
    document.getElementById("chat").innerHTML = html;
  };
  
  const sendMessage = e => {
      const name = document.getElementById('nameInput').value;
      const msg = document.getElementById('messageInput').value; 
      document.getElementById('messageInput').value = '';
      socket.emit('new_msg', {autor: name, message: msg});
      return false;
  }
  
  
  
  
  const socket = io.connect();
  
  socket.on("messages", (data) => {
    console.log(data);
    render(data);
  });
  