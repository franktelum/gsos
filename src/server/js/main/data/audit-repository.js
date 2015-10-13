var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository = require('./../data/base-repository');
var r = require('rethinkdb');
var ComplaintRepository = (function (_super) {
    __extends(ComplaintRepository, _super);
    function ComplaintRepository() {
        _super.call(this, BaseRepository.COMPLAINT_TABLE_NAME);
    }
    ComplaintRepository.prototype.get = function (id) {
        var _this = this;
        var query = r.db(BaseRepository.DB_NAME)
            .table(BaseRepository.AUDIT_TABLE_NAME)
            .get(id)
            .merge(function (audit) {
            return {
                supplier: r.db(BaseRepository.DB_NAME)
                    .table(BaseRepository.USER_TABLE_NAME)
                    .get(audit('supplierId')),
                details: r.db(BaseRepository.DB_NAME)
                    .table(BaseRepository.AUDIT_DETAIL_TABLE_NAME)
                    .filter({ auditId: audit("id") })
                    .nth(0)
                    .without("auditId"),
                checklist: r.db(BaseRepository.DB_NAME)
                    .table(BaseRepository.CHECKLIST_TABLE_NAME)
                    .get(audit("checklistId"))
                    .merge(function (checklist) {
                    return {
                        forms: r.db(BaseRepository.DB_NAME)
                            .table(BaseRepository.FORM_TABLE_NAME)
                            .filter({ checklistId: checklist('id') })
                            .coerceTo('array')
                    };
                })
            };
        })
            .without('supplierId', 'checklistId');
        return new Promise(function (resolve, reject) {
            _this.runSimpleQuery(query).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return ComplaintRepository;
})(BaseRepository);
module.exports = ComplaintRepository;
