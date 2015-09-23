$(function () {
    $(".btn-comment").on('click', function () {
        var postId = $(this).data("id");
        var postCmnt = $("#" + postId).val();
        insertNewComments(postId, postCmnt);
    });
    var commentsOperation = function () {
        // private fields
        var cmntObj;
        //private method
        //C
        function insert() {
            // ajax method call to php file
            $.post('commentsrear.php', {comment: this.cmntObj.comment, post_id: this.cmntObj.postId}).done(function (data) {
                alert(data);
            });
        }
        //R
        function retrieve() {

        }
        // R by id
        function retrieveById(id) {
//            $.get('commentsrear.php')
            return cmntObj = {
            };
        }
        //U
        function update() {
            // ajax method call to php file
        }
        //D
        function remove() {
            // ajax method call to php file
        }
        var publicAPI = {
            cmntObj: cmntObj,
            add: insert,
            select: retrieve,
            selectById: retrieveById,
            delete: remove
        };
        return publicAPI;
    };

    function insertNewComments(postId, userComment) {
        var cmnt = commentsOperation();
        cmnt.cmntObj = {
            postId: postId,
            comment: userComment
        };
        cmnt.add();
    }

});
