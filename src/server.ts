import http from 'http';

import app from './app';

const server = http.createServer(app);

async function main() {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
