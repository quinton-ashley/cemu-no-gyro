# cemu-no-gyro

cemu-no-gyro lets you play motion control games without motion controls on Cemu.  It converts your controller's analog stick position values to faked gyro motion controls values and sends them to Cemu via cemuhook.  Although you can disable motion controls in some games like Splatoon, this app could be useful for games that require them.  For example, you could solve motion control puzzles in Legend of Zelda: Breath of the Wild using only an Xbox One controller with cemu-no-gyro!  You can also use your phone as a real motion control source without downloading an app via local web networking.

## Usage

-   Install Cemu and cemuhook
-   Download [cemu-no-gyro](https://github.com/quinton-ashley/cemu-no-gyro/releases)
-   Run cemu-no-gyro.exe
-   In the Cemu menu click on Options->GamePad motion source->DSU1->By Slot
-   Tap any button on your controller and it will be auto-detected
-   Load the game and enjoy it without motion controls!

## Settings

You can individually toggle on/off each axis of gyro rotation and toggle normal or inverted controls.  In addition to fine grain control with the analog sticks you can hold the left trigger for half speed and hold the right trigger for 5x speed.  You can toggle the trigger speed shift functionality on/off too.

## Please consider donating!

If you appreciate my work and will continue to use this app please pay for it by donating an amount of your choosing.  Thank you!

Monthly Donations:  
Patreon: <https://www.patreon.com/qashto>  

Single Donation:  
Paypal: <https://www.paypal.me/qashto/5>  

## Credits

Controller input:
[Contro](https://github.com/shroudedcode/contro#readme)

UDP server and Web Gyro:  
[WebGyroForCemuhook](https://github.com/hjmmc/WebGyroForCemuhook)
[iOSGyroForCemuhook](https://github.com/denismr/iOSGyroForCemuhook)
