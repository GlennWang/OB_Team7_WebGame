const NULL = "";
const START_GAME = "開始遊戲";
const RESTART_GAME = "重新開始";
const gameContainer = d3.select("#game-container");
const description = d3.select("#description");
const startButton = d3.select("#start");
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
    description.style("display", "none").text(NULL);
    regretButton.style("display", "none");
    startButton
        .on("click", startGame)
        .style("display", "inline-block")
        .text(START_GAME);
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
    if (currentScene.end == "bad_ending") {
        history.badEnding(currentScene.code);
        regretButton
            .on("click", function(event) {
                event.stopPropagation();
                regretButton.style("display", "none");
                gotoScene((parseInt(currentScene.code) - 1).toString());
            })
            .style("display", "inline-block");
    }
    description
        .style("display", "block")
        .text(currentScene.description);
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
