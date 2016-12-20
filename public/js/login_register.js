$(document)
    .on('click', '#register', function () {
        $.ajax({
            url: 'api/registry',
            type: 'POST',
            dataType: 'json',
            data: {
                email: $("#email").val(),
                password: $("#pass").val()
            },
            success: function (result) {
                if (result.status == 'OK') {
                    $("#message").html("Usuario creado");
                } else {
                    $("#message").html("Error creando usuarios");
                }
            }

        })
    })
    .on('click', '#login', function () {
        $.ajax({
            url: 'api/login',
            type: 'POST',
            dataType: 'json',
            data: {
                email: $("#email").val(),
                password: $("#pass").val()
            },
            success: function (result) {
                if (result.status == 'OK') {
                    console.info(result.token);
                    localStorage.setItem("token", result.token);
                    window.location = "/student.html";
                } else {
                    $("#message").html(result.error);
                }

            },
            error: function () {
                alert("Error en el login");
            }
        })
    })
;

