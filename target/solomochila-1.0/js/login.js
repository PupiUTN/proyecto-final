var id_token_global;
var user_global;
function sendToken(id_token) {
    console.log("send Google Token");
    $.ajax({
        type: "POST",
        url: hostURL + 'api/authentication/googleSingIn',
        contentType: "text/plain",
        data: id_token,
        success: function (data) {
            console.log("success login google");
            console.log(data);
            sessionStorage.setItem('login', JSON.stringify(data));
            if (data.esEscalador == true) {
                window.location.href = "inscripciones.html";
            } else {
                window.location.href = "organizador.html";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            if (jqXHR.status == 409) {
                console.log("usuario no registrado");
                $("#tipoUsuario").show();
                user_global = jqXHR.responseText;

            } else {
                console.log("Error login Google");
                $("#mensaje").text("Error en el servidor");

            }
        }
    });
}

function onSuccess(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    id_token_global = id_token;
    console.log('token: ' + id_token);
    sendToken(id_token);
}

function onFailure(error) {
    console.log(error);
}

function registrarUsuario(esEscalador) {
    console.log(user_global);
    $.ajax({
        type: "POST",
        url: hostURL + 'api/authentication/registrar/' + esEscalador,
        contentType: "application/json",
        data: user_global,
        success: function (data) {
            console.log("success new user");
            console.log(data);
            sessionStorage.setItem('login', JSON.stringify(data));
            window.location.href = "inscripciones.html";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            $("#mensaje").text("Error al crear nuevo usuario");
        }
    });

}

function renderButton() {
    console.log("renderButton()")
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}


// function Escalador(fname, lname, age, eyecolor) {
//     this.nombre = fname;
//     this.apellido = lname;
//     this.email = age;
//     this.password = eyecolor;
// }
//
// function Credenciales(username, password) {
//     this.username = username;
//     this.password = password;
// }
//
// function Token(token) {
//     this.token = token;
// }
