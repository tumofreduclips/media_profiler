let uuid = "";
let wuid = "";
let home = true;
let viewData = null;
let avatarAvailable = false;
let bioAvailable = false;
window.onload = async () => {
    uuid = await storage.get_uuid();
    wuid = getQuery("watch");
    console.log(uuid, wuid);
    home = uuid === wuid;
    if(!uuid && !wuid){
        await storage.clear_all();
        window.location = "login.html";
    } else if(uuid && !wuid){
        GoToProfile(uuid);
    } else {
        await requestData(wuid);
        if(!viewData){
            if(!uuid){
                await storage.clear_all();
                window.location = "login.html";
            } else {
                GoToProfile(uuid);
            }
        }

        await initUI();
        if(!avatarAvailable){
            initAvatar();
        } else {
            open_profile();
        }
    }
};

let avatarIsDone = async () =>{
    avatarAvailable = true;
    closeAvatar();
    await requestData(wuid);
    await initUI();
    open_profile();
};


let getQuery = (q) => {
    return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};

let requestData = async (id) => {
    let data = {
        _uuid : id
    };
    let responce = await axios.post(url + "user/getData", data, { crossdomain: true });
    viewData = responce.data.data;
    console.log(viewData);
    if(viewData){
        avatarAvailable = viewData._prof_pic !== "";
        bioAvailable = viewData._bio !== "";
    }
    return true;
};

let initUI = async () => {
    if(uuid !== wuid){
        $("#edit_btn").hide();
        $("#add_post").hide();
    }
    $("#u_name").text(viewData._username);
    $("#prof_pic").attr("src", imgConstructor(viewData._prof_pic));
};

let imgConstructor = (link) => {
    return url + "stash/" + link;
};