// Entry point utama TRIXIA server
const { app } = require('./server/server');
const env = require('./server/config/env');

let server;
if (require.main === module) {
    server = app.listen(env.PORT, () => {
        console.log(`Server TRIXIA berjalan di http://localhost:${env.PORT}`);
    });
}

module.exports = { app, server };
