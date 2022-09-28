# game_of_life

Characters:
    = Season
        "Season" is an object that handles the season changes (spring, summer, fall, winter). Everytime 250 frames, it switches to the next season.
            - Spring: There is a chance that a "Flower" will appear. The speed is set to 3
            - Summer: The speed is set to 3
            - Fall: The speed is set to 4
            - Winter: The speed is set to 5
        
            "Note: The higher the speed, the slower the grass generates"
    
    = Flower
        Flowers appear only during the spring season. If GrassEaters touch it, it sets the speed to 1, which makes the Grass grow faster.

        This gives a disadvantage to GrassEaters, since it makes it harder for them to stop the Grass from growing

    = Lightning
        Lightning is an object that generates new GrassEaters in the canvas. It only happens when there is no GrassEaters left.