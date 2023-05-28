# cemu-no-gyro

## As of 2023, I recommend using the [GuliKit KingKong 2 Pro Controller](https://www.aliexpress.com/item/1005003624801819.html) it has a real gyro and its better than all official Xbox, PlayStation, and Nintendo controllers. (not sponsored)

cemu-no-gyro lets you play motion control games without motion controls on Cemu. It converts your controller's analog stick position values to faked gyro motion controls values and sends them to Cemu via cemuhook. Although you can disable motion controls in some games like Splatoon, this app could be useful for games that require them. For example, you could solve motion control puzzles in Legend of Zelda: Breath of the Wild using only an Xbox One controller with cemu-no-gyro! You can also use your phone as a real motion control source without downloading an app via local web networking. In BOTW if you disable motion control aiming you can keep cemu-no-gyro running at all times, not just during shrines. It will have no effect on playing the rest of the game.

## Usage

- Install Cemu and cemuhook

- Download [cemu-no-gyro](https://github.com/quinton-ashley/cemu-no-gyro/releases)

- In the Cemu menu click on Options->GamePad motion source->DSU1->By Slot

- Tap any button on your controller and it will be auto-detected by cemu-no-gyro

- Load the game and adjust the game's motion control settings to your liking. For example if you just want to use motion controls in the shrines of Zelda BOTW, turn off motion control aiming in the game's settings.

- Keep this window open while playing and don't minimize it. You can use Cemu in fullscreen mode and input from your controller or phone will still be received by cemu-no-gyro.

- In BOTW you can keep cemu-no-gyro open in the background the whole time you play, not just during shrines. cemu-no-gyro will have no effect on the rest of the game.

## Settings

You can individually toggle on/off each axis of gyro rotation and toggle normal or inverted controls. In addition to fine grain control with the analog sticks you can hold the left trigger for half speed and hold the right trigger for 5x speed. You can toggle the trigger speed shift functionality on/off too.

## My thoughts on Motion Controls

I really hope that the next Xbox controller will have motion controls because I want to play games like BOTW and Splatoon with a gyro. I prefer the Gamecube/Xbox style stick layout and the Xbox One controller feels better in my adult sized hands then Switch Pro controllers, but it's unfortunate they lack a gyro for fine grain motion control. Even though I made cemu-no-gyro, I wish it wasn't necessary.

Watch this video ["Motion Control and the Rejection of Progress"](https://youtu.be/binPB4YbWmM) by Nerrel for more info.

## Please consider donating!

If you appreciate my work and will continue to use this app please pay an amount of your choosing. Thank you!

Monthly Donations:  
Patreon: <https://www.patreon.com/nostlan>

Single Donation:  
Paypal: <https://www.paypal.me/qashto/5>
Venmo: @Quinton-Ashley

## Credits

PR from @Matheus-Rangel added support for https web sockets, so that you can still use your phone as a real motion control source!

<https://github.com/quinton-ashley/cemu-no-gyro/pull/16>

Controller input:
[Contro](https://github.com/shroudedcode/contro#readme)

UDP server and Web Gyro:  
[WebGyroForCemuhook](https://github.com/hjmmc/WebGyroForCemuhook)
[iOSGyroForCemuhook](https://github.com/denismr/iOSGyroForCemuhook)

## Legal Disclaimer

cemu-no-gyro is not affiliated with Cemu.
