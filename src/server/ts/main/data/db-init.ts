var r = require('rethinkdb');

exports.init = function() {
   var config = {
      host: process.env.GPSI_DB_PORT_8080_TCP_ADDR,
      port: "28015"
   };

   var connection = null;

   r.connect(config)
   .then((conn) => {
      connection = conn;
      return r.dbList().run(conn);
   })
   .then((response) => {
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
}
