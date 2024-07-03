document.getElementById('sign_move').addEventListener('click', function() {
    var moveDiv = document.getElementById('move');
    var logDiv = document.getElementById('log');
    var signDiv = document.getElementById('sign');
    //var rightVideo = document.getElementById('right_video');
    //var leftVideo = document.getElementById('left_video');
    const leftDiv = document.getElementById('leftDiv');
    const rightDiv = document.getElementById('rightDiv');

    moveDiv.classList.remove('login');
    moveDiv.classList.add('sign');
    logDiv.style.display="none"
    signDiv.style.display="flex"

    leftDiv.classList.remove('grayscale');
    rightDiv.classList.add('grayscale');

    /*
    rightVideo.pause();
    rightVideo.classList.remove('grayscale');
    leftVideo.play();
    leftVideo.classList.add('grayscale');*/

});

document.getElementById('login_move').addEventListener('click', function() {
    var moveDiv = document.getElementById('move');
    var logDiv = document.getElementById('log');
    var signDiv = document.getElementById('sign');
    //var rightVideo = document.getElementById('right_video');
    //var leftVideo = document.getElementById('left_video');
    const leftDiv = document.getElementById('leftDiv');
    const rightDiv = document.getElementById('rightDiv');


    moveDiv.classList.remove('sign');
    moveDiv.classList.add('login');
    logDiv.style.display="flex"
    signDiv.style.display="none"

    leftDiv.classList.add('grayscale');
    rightDiv.classList.remove('grayscale');

    /*
    rightVideo.play();
    rightVideo.classList.add('grayscale');
    leftVideo.pause();
    leftVideo.classList.remove('grayscale');*/

});
