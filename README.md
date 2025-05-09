# musical-shapes 
Created by Megan White
CSC 2463 final project

Musical Shapes is an interactive game where the user clicks the button when the shape is in the target zone. If pressed at the right time the player can develop a streak and either a red, yellow, or green led will start to shine. Each succesful click adds to the score and the score is displayed to the user at the end of the game.

Project Description:
-Visuals: circles falling from the top and decending into the target zone
-Hardware Input: a button that is pressed on the Arduino board as the circle enters the target zone
-Hardware Output: red light for small streak, yellow for intermediate streak, and green for an uninterupted streak
-Audio: background sound playing, a drum sound when a hit is succesfull, and a buzzer sound when a hit is missed and also at the end of the game.
-Timer: the game is put on a timer and once the timer ends the game ends even if shapes have still fallen

Photos:

![start screen](https://github.com/user-attachments/assets/15268bb6-475c-4202-88f1-8aa74eb3030d)
![com connection](https://github.com/user-attachments/assets/f5ddf97c-74bd-4684-ade7-4b1a75fb522b)
![game page](https://github.com/user-attachments/assets/c3bd3c86-926f-4f34-90a3-9c79216c516c)
![game over](https://github.com/user-attachments/assets/79674dda-c399-4eb7-946a-928b702c74d4)
![arduino board](https://github.com/user-attachments/assets/7e83fb24-38ef-4c66-a4cc-d20754d87088)

Video:
https://youtube.com/shorts/KCzUndnhv2Y

Softwares:
-VS Code for p5.js
-Tone.js for sound
-Arduino for hardware
-Serial connection to connect arduino board to game

Arduino Wiring:
Button- pin 2
Red led- pin 3
Yellow led- pin 4
Green led- pin 5
Buzzer- pin 6

Next Step:
-Add more levels and difficulty selections
-fix the target zone so the whole thing works correctly
-Add different shapes and designs to the game 
-Put different music in the background as the game is playing
