var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository = require('./../data/base-repository');
var FormRepository = (function (_super) {
    __extends(FormRepository, _super);
    function FormRepository() {
        _super.call(this, BaseRepository.FORM_TABLE_NAME);
    }
    return FormRepository;
})(BaseRepository);
module.exports = FormRepository;
