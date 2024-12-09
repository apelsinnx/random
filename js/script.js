const audio1 = new Audio("./audio/audio1.mp3");
const audio2 = new Audio("./audio/audio2.mp3");

document.querySelector("button").onclick = function () {
    // Проверяем и запускаем аудио после явного пользовательского действия
    audio1.play().catch(error => console.error("Error playing audio1:", error));

    const inputFrom = document.querySelector("#from");
    const inputTo = document.querySelector("#to");
    const inputFromText = inputFrom.value;
    const inputToText = inputTo.value;

    console.log(inputFromText, inputToText);

    if (inputFromText == "") {
        alert("Укажите число от");
        return;
    }
    if (inputToText == "") {
        alert("Укажите число до");
        return;
    }
    if (parseInt(inputFromText) > parseInt(inputToText)) {
        alert("Число 'от' должно быть меньше чем число 'до'");
        return;
    }

    document.querySelector("button").classList.add("notactive");

    const min = parseInt(inputFromText);
    const max = parseInt(inputToText);

    let interval = 50;
    let intervalNumber;
    document.querySelector("span").classList.remove("greenText");
    document.querySelector("img").classList.remove("active");

    const startInterval = () => {
        intervalNumber = setInterval(() => {
            // Сбрасываем и воспроизводим звук корректно
            audio1.pause();
            audio1.currentTime = 0;
            audio1.play().catch(error => console.error("Error playing audio1:", error));

            interval += interval / 25; // Увеличиваем интервал
            console.log(interval);

            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            document.querySelector("span").innerText = randomNumber;

            // Останавливаем текущий таймер и запускаем новый с увеличенным интервалом
            clearInterval(intervalNumber);
            if (interval < 185) {
                startInterval();
            } else {
                document.querySelector("span").classList.add("greenText");
                document.querySelector("img").classList.add("active");
                audio2.play().catch(error => console.error("Error playing audio2:", error));

                setTimeout(() => {
                    document.querySelector("img").classList.remove("active");
                    document.querySelector("button").classList.remove("notactive");
                }, 2600);
            }
        }, interval);
    };

    // Запуск первого интервала
    startInterval();
};
