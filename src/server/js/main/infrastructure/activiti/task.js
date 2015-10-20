var Activiti;
(function (Activiti) {
    var Task = (function () {
        function Task() {
        }
        Task.getTask = function (id) {
            return null;
        };
        return Task;
    })();
    Activiti.Task = Task;
})(Activiti || (Activiti = {}));
module.exports = Activiti.Task;
