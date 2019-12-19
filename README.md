# Project Title - Filmkvall
This is a site that can be used to find information about movies/tv-series. 
The user can create watch lists with favourite movies/shows.
#Getting Started 
To run the program you will need npm, firebase web project and an api key from [The Movie Database](https://www.themoviedb.org/)

Run npm install 

Setup a file which contains the api keys and firebase config keys.

Run the firebase init command and proceed to mount the site visit [Firebase](https://firebase.google.com/docs/hosting/) for more information
#Built so far
At the current state in the project development we have added the ability to search for movies/tv-series/actor.
A user can create an account  and after verifying their email address they are allowed to login to the site gaining access some of the sites features.   
When logged the user can add movies/tv-series to their personal lists. 
#Planned 

Features <br/>
Logged in user should be able to rate each movie and then see the ratings that they have given to a movie.

Add remove button to list <br/>
Be able to add movies/series from seachbar,frontpage,actor info<br/>

Prevent users from adding duplicate items to list. <br/>

Hide buttons when user is logged out <br/>

Improve rendering of lists in My Pages

CSS <br/>
Improve the design and usability site wide.

#File Structure <br>
`public/index.html` this is the static html file it is where some firebase libraries are loaded. <br>
`src/App.js` - root component containing all the different routes<br>
`firebase.js` - does nothing and should be removed<br>
`src/Data/MovieList` - The datatype storing the different lists a user can have<br>
`src/Data/apiFetch` - contains all the logic for the api calls.<br>
`src/Data/userModel` - dataModel containing all logic for handling users.<br> 
`src/Details` - Gets movie/tv-series info from api and presents it <br>
`src/Discover` - Its a remnant from the past that has yet to be deleted but it does nothing please disregard<br>
`src/Home` - The start screen for the site it shows trending shows/movies<br>
`src/List` - Not yet finished will be used to render lists.<br>
`src/ListContainer`- Renders the users lists and fetches user data from firebase<br>
`src/MyPage` - The users own home page has lists and account info<br>
`src/PeopleDetails` - Gets actor info from api and presents it <br>
`src/ResetPassword` - Simple screen used to reset password<br>
`src/SearchResult` - Gets a search result from the api and presents the result. <br>
`src/Searchbar` - functions as the sites header and has buttons for login as well as a logo that functions as a button to the home screen and it also contains a search field <br>
`src/SingIn`- Simple Sign in screen that has a link to reset password<br>
`src/SignUp`- Self Explanatory <br>

#Built With
[React](https://reactjs.org/) -Framework <br/>
[Firebase](https://firebase.google.com/docs/hosting/) - Hosting

## Authors
Ahmad Qassim
Sebastian Pazirai
Joakim Gustavsson
Josef Federspiel

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
