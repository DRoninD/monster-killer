// Global variable convention is to user all upercase letters

// Player attack options
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

// Player Heal options
const HEAL_VALUE = 10;

// Monster attack options
const MONSTER_ATTACK_VALUE = 17;

// Chose max life
const enterMaxLife = prompt("Chose max life for you and monster", "100");

// Health values
let chosenMaxLife = parseInt(enterMaxLife);
let battleLog = [];
let monsterHealth = chosenMaxLife;
let playerHealth = chosenMaxLife;

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

// Bonus life
let bonusLife = true;

adjustHealthBars(chosenMaxLife);

// BATTLE LOG
function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };

    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: "MONSTER",
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: "PLAYER",
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        default:
            logEntry = {};
    }
    battleLog.push(logEntry);

    // if (event === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = "MONSTER";
    // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry = {
    //         event: event,
    //         value: value,
}
//         target: "MONSTER",
//         finalMonsterHealth: monsterHealth,
//         finalPlayerHealth: playerHealth,
//     };
// } else if (event === LOG_EVENT_MONSTER_ATTACK) {
//     logEntry = {
//         event: event,
//         value: value,
//         target: "PLAYER",
//         finalMonsterHealth: monsterHealth,
//         finalPlayerHealth: playerHealth,
//     };
// } else if (event === LOG_EVENT_GAME_OVER) {
//     logEntry = {
//         event: event,
//         value: value,

//         finalMonsterHealth: monsterHealth,
//         finalPlayerHealth: playerHealth,
//     };
// }

// RESET GAME
function reset() {
    monsterHealth = chosenMaxLife;
    playerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// End round
function endRound() {
    const monstersDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    playerHealth -= monstersDamage;

    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        monstersDamage,
        monsterHealth,
        playerHealth
    );

    // IF logic
    if (monsterHealth <= 0 && playerHealth > 0) {
        alert("You killed the monster!");

        writeToLog(LOG_EVENT_GAME_OVER, "PLAYER_WON", monsterHealth, playerHealth);
    } else if (playerHealth <= 0 && monsterHealth > 0) {
        alert("The monster killed you!");
        writeToLog(LOG_EVENT_GAME_OVER, "MONSTER_WON", monsterHealth, playerHealth);
    } else if (playerHealth <= 0 && monsterHealth <= 0) {
        alert("You have a draw!");
        writeToLog(LOG_EVENT_GAME_OVER, "A DRAW", monsterHealth, playerHealth);
    }

    if (monsterHealth <= 0 || playerHealth <= 0) {
        reset();
    }
}

// Attack monster
function attackMonster(mode) {
    let maxDamage;
    let logEvent;

    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxDamage);
    monsterHealth -= damage;

    writeToLog(logEvent, damage, monsterHealth, playerHealth);

    endRound();
}

// Regular Attack function
function attackFunction() {
    attackMonster(MODE_ATTACK);
}

// Strong Attack function
function strongAttackFunction() {
    attackMonster(MODE_STRONG_ATTACK);
}

// Heal function
function healPlayer() {
    let healValue;

    if (playerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("Can't heal above max life!!!");
        healValue = chosenMaxLife - playerHealth;
    } else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    playerHealth += healValue;

    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, monsterHealth, playerHealth);

    endRound();
}

function printLogHandler() {
    for (let i = 0; i < battleLog.length; i++) {}
    console.log(battleLog);
}

attackBtn.addEventListener("click", attackFunction);
strongAttackBtn.addEventListener("click", strongAttackFunction);
healBtn.addEventListener("click", healPlayer);
logBtn.addEventListener("click", printLogHandler);