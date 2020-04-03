let reg_check_input = async () => {
    let _uname = $("#reg_uname").val();
    let _pswd1 = $("#reg_pswd1").val();
    let _pswd2 = $("#reg_pswd2").val();
    let input_data = {
        dat : {
          _username : _uname,
          _password : _pswd1
        },
        status : ""
    };

    if(_uname === "" || _pswd1 === "" || _pswd2 === ""){
        input_data.status = "Fill all the fields.";
        input_data.dat = null;
        return input_data;
    }

    if(_pswd1 !== _pswd2){
        input_data.status = "Passwords doesn't match."
        input_data.dat = null;
        return input_data;
    }
    return  input_data;
};

let reg_proceed_Register = async (data) => {
    data = data.dat;
    console.log(data);
    data._password = sha256(data._password);
    let resp = await axios.post(url + "/register", data, { crossdomain: true });
    let respDat = resp.data;
    console.log(resp.data._status);
    if(respDat._status !== "ok"){
        return false;
    }
    //Store Login Data HERE VVV
    await storage.save_uuid(respDat.data_uuid);
    return true;
};