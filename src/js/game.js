const NULL = "";
const gameContainer = d3.select("#game-container");
const description = d3.select("#description");
const startButton = d3.select("#start");
const resetButton = d3.select("#reset");
const regretButton = d3.select("#regret");
const optionButton1 = d3.select("#option1");
const optionButton2 = d3.select("#option2");
const historyButton = d3.select("#historyButton");
const background = d3.select("#background");
let scenes;
let currentScene;

sceneInit();

function sceneInit() {
    history.init();
    background.style("background", `url("src/background/b1.jpg")`).style("background-size", "100% 100%");
    d3.select(".opacity-bg").style("background-color", "rgba(255, 255, 255, 0.5)");
    description.style("display", "none").text(NULL);
    regretButton.style("display", "none");
    startButton
        .on("click", startGame)
        .style("display", "inline-block");
    resetButton
        .on("click", sceneInit)
        .style("display", "none")
    optionButton1
        .on("click", function(event) {
            event.stopPropagation();
            optionClicked(1);
        })
        .style("display", "none")
        .text(NULL);
    optionButton2
        .on("click", function(event) {
            event.stopPropagation();
            optionClicked(2);
        })
        .style("display", "none")
        .text(NULL);
    historyButton
        .on("click", function(event) {
            event.stopPropagation();
            history.show(); 
        })
        .style("display", "none");
}

function startGame() {
    d3.csv("src/csv/story.csv").then(data => {
        scenes = data;
        currentScene = scenes[0];
        showScene();
        gameContainer.on("click", sceneClicked);
    });
    startButton
        .style("background-color", "#3498db")
        .style("display", "none");
}

function showScene() {
    if (currentScene == undefined) {
        console.error("Empty scene");
        return;
    }
    history.add(currentScene.code, currentScene.description);
    description
        .style("display", "block")
        .text(currentScene.description);
    background
        .style("background", (currentScene.img == "default") ? `url("src/background/b1.jpg")` : `url("src/img/${currentScene.img}")`)
        .style("background-size", "100% 100%");
    if (currentScene.end != NULL) {
        if (currentScene.end == "happy_ending") {
            history.happyEnding(currentScene.code);
            resetButton.style("display", "inline-block");
            d3.select(".opacity-bg").style("background-color", "rgba(251, 255, 0, 0.5)");
        } else {
            history.badEnding(currentScene.code);
            regretButton
                .on("click", function(event) {
                    event.stopPropagation();
                    regretButton.style("display", "none");
                    gotoScene(currentScene.end);
                })
                .style("display", "inline-block");
        }
    }
    optionButton1
        .style("display", (currentScene.option1 != NULL) ? "inline-block" : "none")
        .text(currentScene.option1);
    optionButton2
        .style("display", (currentScene.option2 != NULL) ? "inline-block" : "none")
        .text(currentScene.option2);
}

function gotoScene(sceneIndex) {
    currentScene = scenes.find(line => line.code === sceneIndex);
    historyButton.style("display", "block");
    showScene();
}

function sceneClicked() {
    if (currentScene.default_next != NULL) {
        gotoScene(currentScene.default_next);
    }
}   

function optionClicked(option) {
    if (currentScene == undefined) {
        console.error("No functional click event");
        return;
    }
    history.selectedOption(currentScene, option);
    gotoScene(currentScene[`option${option}_next`]);
}
