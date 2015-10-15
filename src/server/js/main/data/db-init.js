var r = require('rethinkdb');
exports.init = function () {
    var config = {
        host: process.env.DB_PORT_28015_TCP_ADDR,
        port: process.env.DB_PORT_28015_TCP_PORT
    };
    var connection = null;
    r.connect(config)
        .then(function (conn) {
        connection = conn;
        return r.dbList().run(conn);
    })
        .then(function (response) {
        if (response.indexOf('gsos') == -1) {
            r.dbCreate('gsos').run(connection);
            r.db('gsos').tableCreate('audit').run(connection);
            r.db('gsos').tableCreate('audit_detail').run(connection);
            r.db('gsos').tableCreate('checklist').run(connection);
            r.db('gsos').tableCreate('client').run(connection);
            r.db('gsos').tableCreate('complaint').run(connection);
            r.db('gsos').tableCreate('form').run(connection);
            r.db('gsos').tableCreate('supplier').run(connection);
            r.db('gsos').tableCreate('user').run(connection);
        }
    });
};
