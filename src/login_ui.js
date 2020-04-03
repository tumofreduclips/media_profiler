let _fade_time = 500;
window.onload = async () => {
    console.log(storage.get_uuid())
    if(await storage.get_uuid()){
        setTimeout(async function () {
            GoToProfile(await storage.get_uuid());
        }, 0);
    }
};


$("#login-button").click(async function(event){
    await _hide_error_login();
    event.preventDefault();
    let data = await check_input();
    if(!data){
        await _show_error_login("Input username and password");
        return;
    }
    login_fade(false);
    let login = await proceed_Login(data);
    console.log(login);
    if(!login){
        login_fade(true);
        await _show_error_login("Incorrect username or password");
        return;
    }
    setTimeout(function () {
        fade_everything();
    }, 2*_fade_time);
    setTimeout(function () {
        window.location = "profile.html";
    }, 3*_fade_time)
    //window.location = "profile.html";
   // $('.wrapper').addClass('form-success');
});


$("#register_btn").click(async function (event) {
    await _hide_error_register();
    event.preventDefault();
    let data = await reg_check_input();
    if(!data.dat){
        await _show_error_register(data.status);
        return;
    }
    reg_fade(false);
    let register = await reg_proceed_Register(data);
    if(!register){
        reg_fade(true);
        await _show_error_register("Username unavailable");
        return;
    }
    setTimeout(function () {
        $('#load').fadeIn(_fade_time);
    }, _fade_time);
    setTimeout(function () {
        window.location = "profile.html";
    }, 3*_fade_time)
});

let _show_error_login = async (text) => {
    let errText = $("#Err_text_login");
    errText.text(text);
    errText.fadeIn(_fade_time);
};

let _hide_error_login = async () => {
    let errText = $("#Err_text_login");
    errText.fadeOut(_fade_time);
};

let _show_error_register = async (text) => {
    let errText = $("#Err_text_reg");
    errText.text(text);
    errText.fadeIn(_fade_time);
};

let _hide_error_register = async () => {
    let errText = $("#Err_text_reg");
    errText.fadeOut(_fade_time);
};

$("#reg").click(function (event) {
   event.preventDefault();
   login_fade(false);
   setTimeout(function(){reg_fade(true)}, _fade_time);
});

$("#sign").click(function (event) {
    event.preventDefault();
    reg_fade(false);
    setTimeout(function () {login_fade(true)}, _fade_time);
});

let login_fade = (isIn) => {
    _hide_error_login();
    _hide_error_register();
    if(isIn) {
        $('#form').fadeIn(_fade_time);
    } else {
        $('#form').fadeOut(_fade_time);
    }
};

let reg_fade = (isIn) => {
    _hide_error_login();
    _hide_error_register();
    if(isIn) {
        $('#form_reg').fadeIn(_fade_time);
    } else {
        $('#form_reg').fadeOut(_fade_time);
    }
};

let fade_everything = () => {
    $('#wr').fadeOut(_fade_time);
};