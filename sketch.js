let port;
let reader;
let writer;
let shapes = [];
let targetZoneY;
let targetZoneHeight = 30; 
let score = 0;
let streak = 0;
let totalTime = 30000;
let startTime;
let synth;
let hitReceived = false;
let connectBtn;
let gameStarted = false;

async function connectSerialAndAudio() {
  try {
    await Tone.start();
    console.log("Audio context started");

    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    console.log("Serial connected");

    writer = port.writable.getWriter();
    readSerial();

    connectBtn.remove(); 
    gameStarted = true;
    startTime = millis(); 
  } catch (err) {
    console.error("Error connecting:", err);
  }
}

async function readSerial() {
  while (port.readable) {
    reader = port.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = new TextDecoder().decode(value);
        if (text.includes("HIT")) hitReceived = true;
      }
    } catch (err) {
      console.error("Serial read error:", err);
    } finally {
      reader.releaseLock();
    }
  }
}

function setup() {
  createCanvas(400, 600);
  targetZoneY = height - 100;

  connectBtn = createButton("Start Game (Audio + Serial)");
  connectBtn.position(10, height + 10);
  connectBtn.mousePressed(connectSerialAndAudio);

  synth = new Tone.Synth().toDestination();

  
  setInterval(() => {
    if (gameStarted && millis() - startTime < totalTime) {
      shapes.push({ x: random(width), y: 0 });
    }
  }, 1000);
}

function draw() {
  background(30);
  fill(255);
  textSize(16);
  text("Score: " + score, 10, 20);

  // target zone
  fill(100, 255, 100, 150);
  rect(0, targetZoneY, width, targetZoneHeight);

  if (!gameStarted) return; 

  let progress = map(millis() - startTime, 0, totalTime, 0, width);
  fill(0, 200, 255);
  rect(0, height - 10, progress, 10);

  if (millis() - startTime > totalTime) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    writeSerial("B");
    noLoop();
  }

  for (let i = shapes.length - 1; i >= 0; i--) {
    let s = shapes[i];
    s.y += 3;
    fill(255, 255, 0);
    ellipse(s.x, s.y, 20);

    if (s.y > targetZoneY && s.y < targetZoneY + targetZoneHeight && hitReceived) {
      score++;
      streak++;
      synth.triggerAttackRelease("C4", "8n");

      if (streak >= 10) writeSerial("3");
      else if (streak >= 5) writeSerial("2");
      else writeSerial("1");

      shapes.splice(i, 1);
      hitReceived = false;
    } else if (s.y > height) {
      shapes.splice(i, 1);
      streak = 0;
      writeSerial("0");
    }
  }
}

function writeSerial(msg) {
  if (writer) {
    const data = new TextEncoder().encode(msg);
    writer.write(data);
  }
}
