const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Load hub registration data
const hubPath = path.join(__dirname, 'hub.json');
const payload = JSON.parse(fs.readFileSync(hubPath, 'utf8'));

// Endpoint configurable via env for flexible network targets
const endpoint = process.env.GAMEDIN_API || 'https://gamedin.example/api/register';

axios
  .post(endpoint, payload)
  .then(() => {
    console.log('GameDin hub synced');
  })
  .catch(err => {
    console.error('GameDin sync failed:', err.message);
    process.exit(1);
  });
