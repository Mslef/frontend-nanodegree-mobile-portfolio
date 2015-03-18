## Website Performance Optimization portfolio project

Project optimized for Pagespeed Insights for both the portfolio page and for the pizza app.


*******************
*    Pizza App    *
*******************

The pizza App was updated to maximize the FPS of the page. 3 main change were made to views/main.js : 

- First, I used a JSON object instead of a switch statement to encapsulate the nouns and adjectives for the pizzas. This allows for more clean separation of the Model and the Controller (from the MVC design principle), and the following code is more legible, even if doesn't impact the page's FPS.

- Second, I changed the changePizzaSizes function from inside the resizePizzas function to calculate the target size only once, then resize all randomPizzaContainer, instead of measuring them all then resizing them.

- Third, I generated only 20 background pizzas instead of 200, which dramatically increased performance.

I also rewrote some functions to reduce code redundancy.


***************
*    GRUNT    *
***************
To run grunt, first install node.js on the computer, then the grunt CLI, then run "npm intall" on the command line from the site's directory to intall all dependencies, and finally run the "grunt" command. Grunt will automatically minify images, js and CSS, and provided you have the site running on localhost:8080, run pagespeed with ngrok. Also possible to use the grunt watch command, which reacts to changes in the CSS, JS or img folders. 

For the pizza app, run npm install and grunt from the command line form the views directory.