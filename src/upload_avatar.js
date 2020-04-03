let _fade_time = 500;

function closeAvatar() {
    $('#UploadAvatar').fadeOut(_fade_time/10);
};

function initAvatar() {
    $('#UploadAvatar').fadeIn(_fade_time);
    var uploader = document.createElement('input'),
        image = document.getElementById('img-result');
    let continueButton = document.getElementById('accept_btn');
    let canChange = true;
    let canContinue = false
    uploader.type = 'file';
    uploader.accept = 'image/*';

    image.onclick = function() {
        if(canChange)
            uploader.click();
    };

    uploader.onchange = function() {
        canContinue = false;
        canChange = false;
        closeContinueButton();
        startLoading2();
        var reader = new FileReader();
        reader.onload = async function(evt) {
            image.classList.remove('no-image');
            image.style.backgroundImage = 'url(' + evt.target.result + ')';
            let formData = new FormData();
            formData.append("_avatar", uploader.files[0]);
            formData.append("_uuid", uuid);
            let responce = await axios.post(url + "user/uploadAvatar", formData);
            console.log(responce);
            let data = responce.data;
            if(data._status === "ok"){
                canChange = true;
                canContinue = true;
                openContinueButton();
            } else {
                stopLoading2();
                canChange = true;
            }
        };
        reader.readAsDataURL(uploader.files[0]);
    };

    continueButton.onclick = function () {
        if(canContinue){
            avatarIsDone();
            canContinue = false;
        }
    }

};

let startLoading2 = function () {
    $('#loading_pulse').fadeIn(_fade_time);
};

let stopLoading2 = function(){
    $('#loading_pulse').fadeOut(_fade_time/100);
};

let openContinueButton = function () {
    stopLoading2();
    $('#accept_btn').fadeIn(_fade_time);
};

let closeContinueButton = function () {
    $('#accept_btn').fadeOut(_fade_time/100);
};