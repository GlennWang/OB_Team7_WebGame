const NULL = "";
const START_GAME = "開始遊戲";
const RESTART_GAME = "開始遊戲";
const gameContainer = d3.select("#game-container");
const description = d3.select("#description");
const startButton = d3.select("#start-scene");
const optionButton1 = d3.select("#option1");
const optionButton2 = d3.select("#option2");
let scenes;
let currentScene;

sceneInit();

function sceneInit() {
    description.text(NULL);
    startButton
        .on("click", startGame)
        .style("display", "inline-block")
        .text(START_GAME);
    optionButton1
        .on("click", optionClicked.bind(null, 1))
        .style("display", "none")
        .text(NULL);
    optionButton2
        .on("click", optionClicked.bind(null, 2))
        .style("display", "none")
        .text(NULL);
}

function startGame() {
    description.style("display", "none");
    startButton
        .style("background-color", "#3498db")
        .style("display", "none");
    d3.csv("src/csv/story.csv").then(data => {
        scenes = data;
        currentScene = scenes[0];
        showScene();
        gameContainer.on("click", sceneClicked);
    });
}

function showScene() {
    if (currentScene == undefined) {
        console.error("Empty scene");
        return;
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
    if (currentScene.end != NULL) {
        startButton
            .style("display", "inline-block")
            .style("background-color", "#f44336")
            .text("重新開始");
    }
}

function gotoScene(sceneIndex) {
    currentScene = scenes.find(line => line.code === sceneIndex);
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
    gotoScene(currentScene[`option${option}_next`]);
}
