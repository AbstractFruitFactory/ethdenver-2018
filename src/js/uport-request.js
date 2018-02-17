function uportConnect() {
    $.ajax({
        url: "localhost:8081/login",
        success: function(data) {
            alert(data);
        }
    });
}