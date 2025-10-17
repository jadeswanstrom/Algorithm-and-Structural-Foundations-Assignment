Algorithm and Structural Foundations Assignment

~ Port used for this project: 5511 ~

~ Project Structure:
project/
  index.js
  package.json
  utils/
    utils.js        // binarySearch
    sort.js         // quickSort + buildComparator

~ Basics of using my project with Postman! ~
-- Get -- 
List of all products - http://localhost:5511/products
Sorted list of products - http://localhost:5511/products/sorted?by=price&order=asc
Search by name - http://localhost:5511/products/search?query=licorice
Search by ID - http://localhost:5511/products/# (For Example:) http://localhost:5511/products/2


-- Post --
Create/ Post New Products - http://localhost:5511/products


Wins - Easy understanding while following the first section of this project during class.
Easy usage/set up within postman, and understanding the basics. I encountered minimual hiccups in my setup, which I will outline below, in the difficulties section. It was my understanding this this assignment only requried us to build just the 'back-end', but I would love to go deeper into my research and understanding on how I could build a program like this, with both a front end and back end, for a moch store to user/impliment. I think this further experience could be very beneficial for my learning, as I dont belive the average company employee would find using postman/more advanced api usage,to be easy for every day life- and creating a simple, easy to use front end experience would help paint the whole picture for how this program should be used. 

Difficulties - 
My biggest challange was getting the 'search by ID function' to work.
Originally I was getting an 'error 400' message from postman, while testing the functionality. I had a difficult time figuring out why I was getting this error message, as I didn't believe I had any errors in my simple code. It took me as far as creating a secondary mock api project with the number search functionality as a solo feature, to discover that it was actually an issue with the port. The port I had originally been using, suddently didnt work - so I simply changed this port number, restarted the server with 'npm run dev', and suddenly was no longer getting this error message from protman.

Once the port was working, now my postman 'GET' search was not working at all, when searching for an ID number (example: http://localhost:5511/products/#) - This time it was giving me an entirely different error message. After many hours of research, I had discovered how to use 'Nullish coalescing operators' to fix the issues I was having with the ID search not working. I learned the difference between using both || and ?? when requesting a specific return, and learned my mistakes when using || originally, when my ID search function was not working. # Algorithm-and-Structural-Foundations-Assignment
