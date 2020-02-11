# Aphotomosaic Project



![Copertina](images/copertina.jpg)

Aphotomosaic is a university project developed and realized with p5.js library in the Creative Coding class, taught by Michele Mauri and Andrea Benedetti at Politecnico di Milano.

## Introduction


Everyone loves music. You might listen to it a lot, or you might just let it play in the background when you really don't have anything else to do. Whichever you do, there's no doubt that you have an artist that you like more than everyone else. Every time he announces the release of a new album, you start to wonder what amazing new songs could be in it. You really can't wait for it to come out. And when that happens, you're happier than ever. You start to listen to the new songs over and over, from when you wake up to the moment you go to sleep. Unfortunately, there's a small drawback: once the album is out, you quickly forget all the emotions and all the suspense that you felt before the release. While you still enjoy the music - it's still your favourite artist - you're sad that all that thrill you previously felt is now gone.

## Project Idea
![Project](images/project.jpg)
We thought that the reason you lose all the hype for the album release is that you never truly took part in it. You were just a spectator. We wanted to change that. The problem was: "What is the best way for you to be the protagonist of the release, while preserving the personality of the album?" In our opinion, the answer to this question lies in the album cover.
We thought that the best way to make the fans interact with the cover was to let them discover it bit by bit. In order to do that, we used a technique called photo mosaic: basically, you take an image and resize it, lowering its resolution. Then, you replace each of its pixels with other images, so that each of them has a brightness similar to the one of the corresponding pixel. In other words, you take a bunch of images and you rearrange them in a grid so that they recreate another image.

We created an app that will do exactly that: each user will be asked to take a picture. Then, our app will take all the pictures taken by the fans and rearrange them in order to recreate the cover. The users will be able to see the progress of the mosaic any time they want. When enough pictures will be uploaded, the cover will be completely formed, and the fans will be able to enjoy the image they managed to create.

## Development
![Coding](images/coding.jpg)
```
//javascript, p5

hello





I'm a very sexy code
```

## Code Challenges
![Challenge](images/challenge.jpg)

The initial goal was to create a coloured photo mosaic. We wanted to find a way to compare the HSB values (hue, saturation and brightness) of each pixel of the cover with the average HSB values of each image, so as to find the best matching image for each pixel. The problem was that, in order to find the HSB values of each image, we first extracted the HSB values for every pixel of every image, then we calculated the arithmetic average of these values. But the averege color of an image is not necessarily the dominant color of that image. Take the color palette of a painter, for example: if you mix even a bit of black paint with a random quantity of yellow paint, the color you will get will be vastly different from yellow, even you know for sure that most of the paint was previously yellow. The same happens when you calculate the average HSB values of an image. Therefore, when you replace a pixel with an image, the result might be different from what you expected. Another issue was that the color distance, which could be used as a parameter when looking for the best image, is calculated through a non-linear formula. This means that different colors might have the same distance from the color you're looking for.

We also experienced various difficulties when trying to create the matching algorithm itself. We needed something that could not only associate images to pixels, but also make it so that images were not used more than a set number of times, in order to guarantee that the largest number of images is used. In order to overcome this challenges, we did an in-depth study of pixel arrays, which allowed us to find the correct matchin algorithm.

Lastly, we also needed to find a way to store all the photos taken by the users. For this purpose we used Firebase, which allowed us to have a place for as many images as we needed.

## References
<img src="images/obama.jpg" width="33%"><img src="images/aletheia.jpg" width="33%"><img src="images/bowie.jpg" width="33%">

## Credits
- p5.js
- Firebase
- Daniel Shiffman

## The Team
Lorenzo Barilla, Federico Lucifora, Elisa Manzoni, Matilde Teani

Creative Coding 2019/2020 - https://drawwithcode.github.io/2019/        
Politecnico di Milano - Scuola del Design     
Faculty: Michele Mauri, Andrea Benedetti

