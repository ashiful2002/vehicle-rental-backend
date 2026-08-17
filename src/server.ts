import http from "http";

import app from "./app";

const server = http.createServer(app);

async function main() {
  try {
    // await seedSuperAdmin();

    app.listen(5100, () => {
      console.log(`Server running on http://localhost:5100`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
