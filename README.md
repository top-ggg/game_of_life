# Game of Life
    Game of life is a simulation of 2 characters, Grass and GrassEater.
        = Grass: Regenerates over time (every 3 frames)
        = GrassEater: Eats the Grass and multiples itself. If it's not able to eat any Grass, it dies.

    * This version however, add 3 new characters that make this simulation even more interesting. Check them out below
## Characters:
    = Season
        "Season" is an object that handles the season changes (spring, summer, fall, winter). Everytime 250 frames, it switches to the next season.
            - Spring: There is a chance that a "Flower" will appear. The speed is set to 3 and the grass is 'green'
            - Summer: The speed is set to 3 and the grass is turned to the 'sand' color
            - Fall: The speed is set to 4 and the grass is 'darkgreen'
            - Winter: The speed is set to 5 and the gras is 'white'
        
            "Note: The higher the speed, the slower the grass generates"
    
    = Flower
        Flowers appear only during the spring season. If GrassEaters touch it, it sets the speed to 1, which makes the Grass grow faster.

        This gives a disadvantage to GrassEaters, since it makes it harder for them to stop the Grass from growing

    = Lightning
        Lightning is an object that generates new GrassEaters in the canvas. It only happens when there is no GrassEaters left.