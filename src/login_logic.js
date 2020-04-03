let check_input = async () => {
    let dat = {
        _username : $("#login_uname").val(),
        _password : $("#login_pswd").val()
    };
    if(dat._username === "" || dat._password === ""){
        dat = null;
    }
    return  dat;
};

let proceed_Login = async (data) => {
    console.log(data);
    data._password = sha256(data._password);
    let responce = await axios.post(url + "/login", data, { crossdomain: true });
    let respDat = responce.data;
    console.log(responce);
    if(respDat._status !== "OK"){
        return false;
    }
    //Store Login Data HERE VVV
    await storage.save_uuid(respDat.data.data_uuid);
    return true;
};