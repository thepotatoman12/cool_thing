prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90

});
canvas = document.getElementById("camera")
Webcam.attach('#camera');

function take_picture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_photo" src = "' + data_uri + '"/>';
    });
}
console.log("ml5 loaded,", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelLoaded yyayayayayay");
}

function speak() {
    var synth = window.speechSynthesis;
    speak1 = "prediction number one is " + prediction1;
    speak2 = "prediction number two is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_photo');
    classifier.classify(img, iGotAResult);
}

function iGotAResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "happy")
        document.getElementById("update_emoji").innerHTML = "&#128114";
        else if (results[0].label == "sad")
        document.getElementById("update_emoji").innerHTML = "&#128589";
        else if (results[0].label == "angry")
        document.getElementById("update_emoji").innerHTML = "&#128122"
        
        if (results[1].label == "happy")
        document.getElementById("update_emoji2").innerHTML = "&#128114";
        else if (results[1].label == "sad")
        document.getElementById("update_emoji2").innerHTML = "&#128589";
        else if (results[1].label == "angry")
        document.getElementById("update_emoji2").innerHTML = "&#128122"
    }
}