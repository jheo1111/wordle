const 정답 = 'APPLE'; 

let attempts = 0;  
let index = 0;  
let timer 

function appStart(){
    const displayGameover = () => {
        const div = document.createElement("div"); 
        div.innerText = "게임이 종료됐습니다."; 
        div.style = 
            "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color:white; width:200px; height:100px;";
        document.body.appendChild(div);
    };

    const nextLine = () => {
        if (attempts === 6) return gameover(); // attempts가 6이면 게임 종료(게임오버 호출) 
        attempts += 1; 
        index = 0;  // 인덱스 초기화 
    };

    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown); // 게임오버 되면 키 입력이 안되게 함
        displayGameover(); 
        clearInterval(timer); 
    }

    const handleEnterKey = () => {
        let 맞은_갯수 = 0; 

        for (let i=0; i<5 ; i++){
            const block = document.querySelector(
                `.board-column[data-index='${attempts}${i}']`
            );
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if (입력한_글자 === 정답_글자) {
                맞은_갯수 += 1; 
                block.style.background = "#6AAA64"; // 올바르면 초록색
            } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458"; // 올바른 위치는 아니지만 포함하고 있으면 노란색
            else block.style.background = "#787C7E"; //둘다 아니면 회색 표시
            block.style.color = "white"; // 엔터 치면 글자가 모두 흰색으로 바뀜 
        }

        if(맞은_갯수===5) gameover(); 
        else nextLine();

    };

    const handleBackspace = () => {
        if (index>0){
            const preBlock = document.querySelector(
                `.board-column[data-index='${attempts}${index - 1}']`
            );
            preBlock.innerText = "";
        }
        if (index !== 0) index -= 1; 
    };

    const handleKeydown = (event) => {
        const key = event.key.toUpperCase(); 
        const keyCode = event.keyCode; 
        const thisBlock = document.querySelector(
            `.board-column[data-index='${attempts}${index}']`
        );

        if (event.key === 'Backspace') handleBackspace(); 
        else if (index === 5){
            if (event.key === "Enter") handleEnterKey();  
            else return;
        } else if (65 <= keyCode && keyCode <= 90){ //알파벳만 입력 가능하도록 한다. 
            thisBlock.innerText = key; 
            index += 1; 
        }
    };


    const startTimer = () => {
        const 시작_시간 = new Date(); 

        function setTime() {
            const 현재_시간 = new Date(); 
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `${분}:${초}`; 
        }
        // 주기성
        timer = setInterval(setTime, 1000); 
    }

    startTimer(); 
    window.addEventListener("keydown", handleKeydown);   
}



 appStart(); 