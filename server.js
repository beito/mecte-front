const express = require('express');
const path = require('path');

const app = express();

const distFolder = path.join(__dirname, 'dist/competencias-frontend');
app.use(express.static(distFolder));

app.get('/*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Frontend is running on port ${PORT}`);
});
