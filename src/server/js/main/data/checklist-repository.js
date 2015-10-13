var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository = require('./../data/base-repository');
var ChecklistRepository = (function (_super) {
    __extends(ChecklistRepository, _super);
    function ChecklistRepository() {
        _super.call(this, BaseRepository.COMPLAINT_TABLE_NAME);
    }
    return ChecklistRepository;
})(BaseRepository);
module.exports = ChecklistRepository;
