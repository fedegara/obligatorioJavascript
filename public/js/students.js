var token = null
$(document)
    .ready(function () {
        if (localStorage.getItem("token") == null) {
            alert("debe estar logueado");
            window.lcoation = "/";
        } else {
            token = localStorage.getItem("token");
            loadStudents();
        }
    })
    .on('click', '#create', function () {
        $.ajax({
            url: 'api/students',
            headers: {'token': token},
            type: 'POST',
            dataType: 'json',
            data: {
                document: $("#document").val(),
                name: $("#name").val(),
                lastname: $("#last_name").val(),
                date_birthday: $("#date").val()
            },
            success: function (result) {
                if (result.status == 'OK') {
                    loadStudents();
                } else {
                    $("#message").html(result.msg);
                }
            }
        });
    })
;
function loadStudents() {
    $("#message").html("Cargando Estudiantes");
    $.ajax({
        url: 'api/students',
        headers: {'token': token},
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            if (result.status == 'OK') {
                $("#students").html("");
                console.info(result.result);
                $("#message").html("");
                for (var i = 0; i < result.result.length; i++) {
                    var row = $("#student_row").html();
                    row = row.replace(/ID/g, result.result[i].id);
                    row = row.replace("DOCUMENT", result.result[i].document);
                    row = row.replace("NAME", result.result[i].name);
                    row = row.replace("LAST_NAME", result.result[i].lastname);
                    row = row.replace("DATE", result.result[i].date_birthday);
                    $("#students").append(row);
                }
            }
            else {
                $("#message").html("Error leeyendo los estudiantes");
            }

        },
        error: function () {
            alert("Error en el login");
        }
    })
}