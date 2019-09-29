const http = require("http");
const url = require("url");
const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

let messages = [
  {
    'id': 1,
    'user': 'brianna delvalle',
    'message': 'hey!'
  },
  {
    'id': 2,
    'user': 'dorbid gortlin',
    'message': 'something in Tibetan'
  },
  {
    'id': 3,
    'user': 'chris lane',
    'message': 'in all honesty ...'
  }
];

const getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.write(JSON.stringify(messages));
  response.end();
}

const addMessage = (newMessage, response) => {
  response.writeHead(201, { 'Content-Type': 'text/plain' })
  response.write(JSON.stringify(newMessage));
  response.end();
  messages.push(newMessage);
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});


