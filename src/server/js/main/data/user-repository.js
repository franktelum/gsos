'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository = require('./../data/base-repository');
var AppException = require('./../app-exception');
var r = require('rethinkdb');
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        _super.call(this, BaseRepository.USER_TABLE_NAME);
    }
    UserRepository.prototype.getByEmail = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _super.prototype.getAll.call(_this, { email: email, password: password }).then(function (objects) {
                if (objects.length > 0) {
                    resolve(objects[0]);
                }
                else {
                    reject(new AppException(AppException.EMAIL_OR_PASSWORD_INVALID));
                }
            }, function (err) {
                reject(new AppException(AppException.UNKNOWN));
            });
        });
    };
    UserRepository.prototype.getSuppliers = function (id) {
        var _this = this;
        var query = r.db(BaseRepository.DB_NAME)
            .table(BaseRepository.SUPPLIER_TABLE_NAME)
            .filter({ userId: id })
            .eqJoin('supplierId', r.db(BaseRepository.DB_NAME).table(BaseRepository.USER_TABLE_NAME))
            .map(function (item) {
            return item('right');
        })
            .coerceTo('array');
        return new Promise(function (resolve, reject) {
            _this.runQuery(query).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserRepository.prototype.getClients = function (id) {
        var _this = this;
        var query = r.db(BaseRepository.DB_NAME)
            .table(BaseRepository.CLIENT_TABLE_NAME)
            .filter({ userId: id })
            .eqJoin('clientId', r.db(BaseRepository.DB_NAME).table(BaseRepository.USER_TABLE_NAME))
            .map(function (item) {
            return item('right');
        })
            .coerceTo('array');
        return new Promise(function (resolve, reject) {
            _this.runQuery(query).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserRepository.prototype.getComplaints = function (id) {
        var _this = this;
        var query = r.db(BaseRepository.DB_NAME)
            .table(BaseRepository.COMPLAINT_TABLE_NAME)
            .filter({ userId: id })
            .merge(function (complaint) {
            return {
                supplier: r.db(BaseRepository.DB_NAME)
                    .table(BaseRepository.USER_TABLE_NAME)
                    .get(complaint('supplierId'))
            };
        })
            .without('supplierId')
            .coerceTo('array');
        return new Promise(function (resolve, reject) {
            _this.runQuery(query).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserRepository.prototype.getChecklists = function (id) {
        var _this = this;
        var query = r.db(BaseRepository.DB_NAME)
            .table(BaseRepository.CHECKLIST_TABLE_NAME)
            .filter({ userId: id })
            .merge(function (checklist) {
            return {
                forms: r.db(BaseRepository.DB_NAME)
                    .table(BaseRepository.FORM_TABLE_NAME)
                    .filter({ checklistId: checklist('id') })
                    .coerceTo('array')
            };
        })
            .coerceTo('array');
        return new Promise(function (resolve, reject) {
            _this.runQuery(query).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserRepository.prototype.getAudits = function (id) {
        var _this = this;
        var query = r.db(BaseRepository.DB_NAME)
            .table(BaseRepository.AUDIT_TABLE_NAME)
            .filter({ userId: id })
            .merge(function (audit) {
            return {
                supplier: r.db(BaseRepository.DB_NAME)
                    .table(BaseRepository.USER_TABLE_NAME)
                    .get(audit('supplierId'))
            };
        })
            .without('supplierId')
            .coerceTo('array');
        return new Promise(function (resolve, reject) {
            _this.runQuery(query).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return UserRepository;
})(BaseRepository);
module.exports = UserRepository;
