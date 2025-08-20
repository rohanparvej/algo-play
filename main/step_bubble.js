const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 2;

let timer = 0;
let array = [...Array(120)].map(() => Math.floor(Math.random() * 1000) + 10);
const originalArray = [...array];

let isPaused = false;
let isSorting = false;
let speed = 20; // default slow speed

function unsortBars(arr){
    var list = arr;
    var maxH = 580;
    canvasHeight = 600;
    var sf = maxH/Math.max(...list);

    var w = 2;
    var gap = 2;

    list.forEach((elem, i) => {
        let x = i * (w+gap);
        let barHeight = elem * sf;
        let y = canvasHeight-barHeight;
        ctx.fillStyle = "rgba(59,130,246,0.9)";
        ctx.shadowColor = "rgba(59,130,246,0.7)";
        ctx.shadowBlur = 10;
        ctx.fillRect(x, y, w, barHeight);
    });
}

function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve, ms));
}

function fastTimer(){
    return new Promise(resolve=> requestAnimationFrame(resolve));
}

function redrawBars(arr, compare=-1, sorted=arr.length){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var list = arr;
    var maxH = 580;
    canvasHeight = 600;
    var sf = maxH/Math.max(...list);

    var w = 2;
    var gap = 2;

    list.forEach((elem, i) => {
        let x = i * (w+gap);
        let barHeight = elem * sf;
        let y = canvasHeight-barHeight;

        if (i == compare || i  === compare+1){
            ctx.fillStyle = "orange";
            ctx.shadowColor = "orange";
        }
        else if (i >= sorted){
            ctx.fillStyle = "lime";
            ctx.shadowColor = "lime";
        }
        else{
            ctx.fillStyle = "rgba(59,130,246,0.9)";
            ctx.shadowColor = "rgba(59,130,246,0.7)";
        }
        ctx.shadowBlur = 12;
        ctx.fillRect(x, y, w, barHeight);
    });
}

async function BubbleSortMain(arr){
    isSorting = true;
    var list = arr;
    
    for (var pass = 0; pass < list.length-1 && isSorting; pass++) {
        for (var i = 0; i < list.length-1-pass && isSorting; i++) {

            redrawBars(list, i, list.length-pass);
            await sleep(speed);

            if (isPaused) {
                while (isPaused && isSorting) { 
                    await sleep(200); 
                }
            }

            if (list[i] > list[i+1]) {
                [list[i] , list[i+1]] = [list[i+1], list[i]];
            }
        }
    }
    
    if (isSorting) {
        redrawBars(list, -1, 0);
        // Reset button text after sorting completes
        updateSortButton("Sort");
    }
    isSorting = false;
}

function resetBars(){
    // Stop any ongoing sorting
    isSorting = false;
    isPaused = false;
    
    // Reset array to original
    array = [...originalArray];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    unsortBars(array);
    
    // Reset button states
    updateSortButton("Sort");
    updatePauseButton("Pause");
}

function updateSortButton(text) {
    const sortBtn = document.getElementById("sortBtn");
    const icon = sortBtn.querySelector('i');
    
    if (text === "Sort") {
        sortBtn.innerHTML = '<i class="ri-play-fill"></i> Sort';
    } else {
        sortBtn.innerHTML = '<i class="ri-stop-fill"></i> Reset';
    }
}

function updatePauseButton(text) {
    const pauseBtn = document.getElementById("pauseBtn");
    const icon = pauseBtn.querySelector('i');
    
    if (text === "Pause") {
        pauseBtn.innerHTML = '<i class="ri-pause-fill"></i> Pause';
    } else {
        pauseBtn.innerHTML = '<i class="ri-play-fill"></i> Resume';
    }
}

// Initialize the visualization
unsortBars(array);

// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get button references
    let sortBtn = document.getElementById("sortBtn");
    let pauseBtn = document.getElementById("pauseBtn");
    let fastBtn = document.getElementById("fastBtn");
    let slowBtn = document.getElementById("slowBtn");

    // Sort/Reset button functionality
    sortBtn.addEventListener("click", function(){
        const currentText = sortBtn.textContent.trim();
        
        if (currentText.includes("Sort")) {
            // Start sorting
            updateSortButton("Reset");
            BubbleSortMain(array);
        } else {
            // Reset/Stop sorting
            resetBars();
        }
    });

    // Pause/Resume button functionality
    pauseBtn.addEventListener("click", () => {
        if (!isSorting) return; // Only allow pause during sorting
        
        isPaused = !isPaused;
        updatePauseButton(isPaused ? "Resume" : "Pause");
    });

    // Speed control buttons
    fastBtn.addEventListener("click", () => { 
        speed = Math.max(1, speed - 5); // Minimum 1ms delay
        console.log("Speed set to:", speed);
    });
    
    slowBtn.addEventListener("click", () => { 
        speed = Math.min(100, speed + 10); // Maximum 100ms delay
        console.log("Speed set to:", speed);
    });
});

// Fallback for immediate execution (in case DOMContentLoaded already fired)
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, execute immediately
    setTimeout(() => {
        let sortBtn = document.getElementById("sortBtn");
        let pauseBtn = document.getElementById("pauseBtn");
        let fastBtn = document.getElementById("fastBtn");
        let slowBtn = document.getElementById("slowBtn");

        if (sortBtn && pauseBtn && fastBtn && slowBtn) {
            // Attach event listeners
            sortBtn.addEventListener("click", function(){
                const currentText = sortBtn.textContent.trim();
                
                if (currentText.includes("Sort")) {
                    updateSortButton("Reset");
                    BubbleSortMain(array);
                } else {
                    resetBars();
                }
            });

            pauseBtn.addEventListener("click", () => {
                if (!isSorting) return;
                
                isPaused = !isPaused;
                updatePauseButton(isPaused ? "Resume" : "Pause");
            });

            fastBtn.addEventListener("click", () => { 
                speed = Math.max(1, speed - 5);
                console.log("Speed set to:", speed);
            });
            
            slowBtn.addEventListener("click", () => { 
                speed = Math.min(100, speed + 10);
                console.log("Speed set to:", speed);
            });
        }
    }, 100); // Small delay to ensure buttons are rendered
}
