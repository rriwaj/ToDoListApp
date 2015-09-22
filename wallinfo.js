$(function () {
    $("#loader").hide();
    $(document).ajaxStart(function () {
        $('#quotes').empty();
        $("#loader").show();
    }).ajaxStop(function () {
        $("#loader").hide();
    });

    $('#click').click(function () {
        $.get('http://localhost/wap/Project/todolistobject.php', {delay: 0})
                .done(success)
                .fail(failure);
    });
}) ;
function success(data) {
  //  var myData = JSON.parse(data);
    $("#text").append((data[0].item_text));
}
function failure() {
    $('#errors').text('An ajax error occurred.');
}
