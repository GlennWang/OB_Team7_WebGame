let currentScene = 0;

const scenes = [
    {
        scene: 0,
        text: "你醒來發現自己在一個陌生的地方。",
        options: [
            { text: "走向左邊", nextScene: 1 },
            { text: "走向右邊", nextScene: 2 }
        ]
    },
    {
        scene: 1,
        text: "你看到一扇門，門上有一個鎖。",
        options: [
            { text: "繼續前進", nextScene: 3 },
            { text: "返回起點", nextScene: 0 }
        ]
    },
    {
        scene: 2,
        text: "你遇到了一個神秘的人。",
        options: [
            { text: "和他對話", nextScene: 4 },
            { text: "忽略他", nextScene: 5 }
        ]
    },
    {
        scene: 3,
        text: "你成功打開了門，前方出現一條通道。",
        options: [
            { text: "進入通道", nextScene: 6 },
            { text: "返回起點", nextScene: 0 }
        ]
    },
    {
        scene: 4,
        text: "神秘人告訴你一個重要的秘密。",
        options: [
            { text: "相信他", nextScene: 7 },
            { text: "不相信他", nextScene: 8 }
        ]
    },
    {
        scene: 5,
        text: "你繼續前進，突然一個陷阱打開在你面前。",
        options: [
            { text: "跳過陷阱", nextScene: 9 },
            { text: "返回起點", nextScene: 0 }
        ]
    },
    {
        scene: 6,
        text: "通道通向一扇大門，你開啟了大門。",
        options: [
            { text: "勝利！", nextScene: -1 }
        ]
    },
    {
        scene: 7,
        text: "神秘人帶你走向死亡的結局。",
        options: [
            { text: "重新開始", nextScene: 0 }
        ]
    },
    {
        scene: 8,
        text: "你沒有相信神秘人，他對你施展了詛咒。",
        options: [
            { text: "面對詛咒", nextScene: 10 },
            { text: "重新開始", nextScene: 0 }
        ]
    },
    {
        scene: 9,
        text: "你成功避開陷阱，通道通向光明的地方。",
        options: [
            { text: "繼續前進", nextScene: 11 }
        ]
    },
    {
        scene: 10,
        text: "你成功解除詛咒，繼續前進。",
        options: [
            { text: "進入光明", nextScene: -1 }
        ]
    },
];

function startGame() {
    currentScene = 0;
    showScene();
}

function showScene() {
    const outputElement = document.getElementById("output");
    const currentSceneData = scenes[currentScene];

    outputElement.textContent = currentSceneData.text;

    const optionsContainer = document.createElement("div");

    currentSceneData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.addEventListener("click", () => goToScene(option.nextScene));
        optionsContainer.appendChild(button);
    });

    outputElement.appendChild(optionsContainer);
}

function goToScene(sceneIndex) {
    const outputElement = document.getElementById("output");
    const optionsContainer = outputElement.querySelector("div");

    if (optionsContainer) {
        optionsContainer.parentNode.removeChild(optionsContainer);
    }

    currentScene = sceneIndex;

    if (sceneIndex === -1) {
        outputElement.innerHTML = "<p>遊戲結束！</p><button onclick=\"startGame()\">重新開始</button>";
    } else {
        showScene();
    }
}

// 啟動遊戲
startGame();
