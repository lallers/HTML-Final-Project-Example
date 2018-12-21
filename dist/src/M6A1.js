/*
   Filename: M6A1.js
   Authored by: Christopher Olson
   Date: November 11th, 2018
*/
// Create listener events

function BrowserTest() {
    console.log('Start browser tests...\n')
    const browserInfo = [
        { a: "Browser Codename", v: navigator.appCodeName },
        { a: "Browser Name", v: navigator.appName },
        { a: "Browser Version", v: navigator.appVersion },
        { a: "Browser Enabled", v: navigator.cookieEnabled },
        { a: "Browser Language", v: navigator.language },
        { a: "Browser Online", v: navigator.onLine },
        { a: "Platform", v: navigator.platform },
        { a: "User-agent Header", v: navigator.userAgent }
    ]
    appendToDom(createList(browserInfo), "Browser Information");
    console.log('Done browser tests...\n')
}

function FeatureTest() {
    console.log('Start feature tests...\n')
    const checkFeature = [
        { a: "Search", v: CheckFeature("search") },
        { a: "Number", v: CheckFeature("number") },
        { a: "Range", v: CheckFeature("range") },
        { a: "Color", v: CheckFeature("color") },
        { a: "Tel", v: CheckFeature("tel") },
        { a: "Url", v: CheckFeature("url") },
        { a: "Email", v: CheckFeature("email") },
        { a: "Date", v: CheckFeature("date") },
        { a: "Month", v: CheckFeature("month") },
        { a: "Week", v: CheckFeature("week") },
        { a: "Time", v: CheckFeature("time") },
        { a: "Datetime", v: CheckFeature("datetime") },
        { a: "Datetime-local", v: CheckFeature("datetime-local") },
        { a: "Does this shit work?", v: CheckFeature("does-thiswork?") },
    ]
    appendToDom(createList(checkFeature), "Compatible HTML5 Features");
    console.log('Done feature tests...\n')
}

function ScreenDimTest() {
    console.log('Start screen dimension tests...\n')
    const checkScreen = [
        { a: "Width", v: window.screen.availWidth },
        { a: "Height", v: window.screen.availHeight }
    ]
    appendToDom(createList(checkScreen), "Mobile Screen Information");
    console.log('Done screen dimension tests...\n')
}

function ScreenOriTest() {
    console.log('Start screen orientation tests...\n')
    const checkScreenOrientation = [
        { a: "Orientation", v: window.screen.orientation.type }
    ]
    appendToDom(createList(checkScreenOrientation), "Mobile Screen Information");
    console.log('Start screen orientation tests...\n')
}

function CanvasTest(test) {
    console.log('Start canvas general tests...\n')
    const checkCanvas = [
        { a: !test ? "Canvas support" : "This browser supports canvas text", v: !test ? CheckFeatureCanvas() : CheckFeatureCanvas(test) }
    ]
    appendToDom(createList(checkCanvas, test ? true : null), "Canvas Information", "output");
    console.log('Done canvas general tests...\n')
}

function CanvasDraw() {
    console.log('Start canvas draw tests...\n')
    appendToCanvas('Canvas Information');
    console.log('Done canvas draw tests...\n')
}

function CheckFeature(type, input = "input") {
    var input = document.createElement(input);
    input.setAttribute("type", type);
    console.log(input.type == type)
    return input.type == type ? "Yes" : "No";
}

function CheckFeatureCanvas(type, canvasId = "myCanvas") {
    var canvas = document.getElementById(canvasId);
    switch (type) {
        case ("text"):
            return !!(canvas.getContext('2d'))
        default:
            return !!(canvas.getContext);
    }
}

function appendToDom(items, title = "untitled", outputId = "output", headingId = "heading", canvasId = "myCanvas") {
    console.log('\t Creating DOM...\n')
    var content = document.getElementById(outputId);
    var heading = document.getElementById(headingId);
    clearCanvas();
    heading.innerHTML = "";
    content.innerHTML = "";
    heading.innerHTML = title + "";
    content.innerHTML = "<ul>" + items + "</ul>";
}

function appendToCanvas(title = "untitled", outputId = "myCanvas", headingId = "heading", contentId = "output") {
    var heading = document.getElementById(headingId);
    var headerHeight = getAbsoluteHeight(heading);
    var mainHeight = getAbsoluteHeight(document.getElementById('main'));

    var canvas = document.getElementById(outputId);
    var canvasWidth = canvas.parentElement.clientWidth
    var canvasHeight = mainHeight - headerHeight;

    document.getElementById(contentId).innerHTML = "";
    heading.innerHTML = "";
    heading.innerHTML = title;

    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    DrawHeart(canvas, canvasWidth, canvasHeight);
}

function createList(obj, usev) {
    //This function depends on the object having the properties a and v
    var list = "";
    for (var i = 0; i < obj.length; i++) {
        var desc = obj[i].a;
        var value = usev ? "" : ": " + obj[i].v
        list += "<li>" + desc + value + "</li>"
    }
    return list;
}

function clearCanvas(canvasId = "myCanvas") {
    canvas = document.getElementById(canvasId);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.setAttribute('width', 0);
    canvas.setAttribute('height', 0);
}

function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
        parseFloat(styles['marginBottom']);

    return Math.ceil(el.offsetHeight + margin);
}

function DrawHeart(canvas, width, height) {
    var context = canvas.getContext("2d");
    var w = width * .85,
        h = height * .85
        //console.log(w, h, Math.min(w, h))

    context.strokeStyle = "#000000";
    context.strokeWeight = 3;
    context.shadowOffsetX = 4.0;
    context.shadowOffsetY = 4.0;
    context.lineWidth = 10.0;
    context.fillStyle = "#FF0000";
    var d = Math.min(w, h);
    var k = d / 6.5;
    context.moveTo(k, k + d / 4);
    context.quadraticCurveTo(k, k, k + d / 4, k);
    context.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
    context.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
    context.quadraticCurveTo(k + d, k, k + d, k + d / 4);
    context.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
    context.lineTo(k + d / 2, k + d);
    context.lineTo(k + d / 4, k + d * 3 / 4);
    context.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
    context.stroke();
    context.fill();
}