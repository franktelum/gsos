var r = require('rethinkdb');
var BaseRepository = (function () {
    function BaseRepository(tableName) {
        this.tableName = tableName;
    }
    BaseRepository.prototype.create = function (doc) {
        var _this = this;
        if (doc.createdAt == null)
            doc.createdAt = this.formatDate(new Date());
        if (doc.status == null)
            doc.status = 'active';
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (conn) {
                _this.connection = conn;
                return r.table(_this.tableName)
                    .insert(doc)
                    .run(conn);
            })
                .then(function (res) {
                doc.id = res.generated_keys[0];
                resolve(doc);
            })
                .error(function (err) {
                reject(doc);
            })
                .finally(function () {
                _this.close();
            });
        });
    };
    BaseRepository.prototype.update = function (doc) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (conn) {
                _this.connection = conn;
                return r.table(_this.tableName)
                    .get(doc.id)
                    .update(doc)
                    .run(conn);
            })
                .then(function (res) {
                resolve(doc);
            })
                .error(function (err) {
                reject(doc);
            })
                .finally(function () {
                _this.close();
            });
        });
    };
    BaseRepository.prototype.get = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (conn) {
                _this.connection = conn;
                return r.table(_this.tableName)
                    .get(id)
                    .run(conn);
            })
                .then(function (res) {
                resolve(res);
            })
                .error(function (err) {
                reject(err);
            })
                .finally(function () {
                _this.close();
            });
        });
    };
    BaseRepository.prototype.getAll = function (filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (conn) {
                _this.connection = conn;
                return r.table(_this.tableName)
                    .filter(filter)
                    .coerceTo('array')
                    .run(conn);
            })
                .then(function (res) {
                resolve(res);
            })
                .error(function (err) {
                reject(err);
            })
                .finally(function () {
                _this.close();
            });
        });
    };
    BaseRepository.prototype.runSimpleQuery = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (conn) {
                _this.connection = conn;
                return query.run(conn);
            })
                .then(function (res) {
                resolve(res);
            })
                .error(function (err) {
                reject(err);
            })
                .finally(function () {
                _this.close();
            });
        });
    };
    BaseRepository.prototype.runQuery = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (conn) {
                _this.connection = conn;
                return query.run(conn);
            })
                .then(function (res) {
                resolve(res);
            })
                .error(function (err) {
                reject(err);
            })
                .finally(function () {
                _this.close();
            });
        });
    };
    BaseRepository.prototype.formatDate = function (date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        return (dd[1] ? dd : '0' + dd[0]) + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + yyyy;
    };
    BaseRepository.prototype.connect = function () {
        var config = {
            host: process.env.GPSI_DB_PORT_8080_TCP_ADDR,
            port: "28015",
            db: BaseRepository.DB_NAME
        };
        return r.connect(config);
    };
    BaseRepository.prototype.close = function () {
        if (this.connection) {
            return this.connection.close({
                noreplyWait: false
            });
        }
    };
    BaseRepository.DB_NAME = 'gsos';
    BaseRepository.USER_TABLE_NAME = 'user';
    BaseRepository.COMPLAINT_TABLE_NAME = 'complaint';
    BaseRepository.CHECKLIST_TABLE_NAME = 'checklist';
    BaseRepository.SUPPLIER_TABLE_NAME = 'supplier';
    BaseRepository.CLIENT_TABLE_NAME = 'client';
    BaseRepository.FORM_TABLE_NAME = 'form';
    BaseRepository.AUDIT_TABLE_NAME = 'audit';
    BaseRepository.AUDIT_DETAIL_TABLE_NAME = 'audit_detail';
    return BaseRepository;
})();
module.exports = BaseRepository;
