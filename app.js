const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.send('Hello, World! Welcome to DevOps.\n Linking Docker, Jenkins, ArgoCd and minikube kubernetes.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
