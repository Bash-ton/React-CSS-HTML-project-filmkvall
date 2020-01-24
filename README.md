# Project Title - Filmkvall
This is a site that can be used to find information about movies/tv-series. 
The user can create watch lists with favourite movies/shows.
## Getting Started 
To run the program you will need npm, a firebase web project and an api key from [The Movie Database](https://www.themoviedb.org/)

Run npm install 

Setup a file which contains the api keys and firebase config keys.
Place it in src/data/apiConfig.js 

Run the firebase init command and proceed to mount the site visit [Firebase](https://firebase.google.com/docs/hosting/) for more information

### Features <br/>
The user can search for movies,shows and actors.
If the user creates an account with a unique email they will be able to add 
movies/series from the details page to their personal lists<br/>

Prevent users from adding duplicate items to list. <br/>

Hide buttons when user is logged out <br/>

## File Structure <br>
`public/index.html` this is the static html file it is where some firebase libraries are loaded. <br>
`src/App.js` - root component containing all the different routes<br>
`src/Data/MovieList` - The datatype storing the different lists a user can have<br>
`src/Data/apiFetch` - contains all the logic for the api calls.<br>
`src/Data/userModel` - dataModel containing all logic for handling users.<br>
`src/Data/userRating` - planned rating feature that never got finished. 
`src/Details` - Gets movie/tv-series info from api and presents it <br>
`src/Home` - The start screen for the site it shows trending shows/movies<br>
`src/List` - Used to render the lists.<br>
`src/ListContainer`- Renders containers for the users lists<br>
`src/MyPage` - The users own home page has lists and account info<br>
`src/PeopleDetails` - Gets actor info from api and presents it <br>
`src/Rating` - planned rating feature that never was finnished
`src/ResetPassword` - Simple screen used to reset password<br>
`src/SearchResult` - Gets a search result from the api and presents the result. <br>
`src/Searchbar` - functions as the sites header and has buttons for login as well as a logo that functions as a button to the home screen and it also contains a search field <br>
`src/SingIn`- Simple Sign in screen that has a link to reset password<br>
`src/SignUp`- Self Explanatory <br>

## Built With
[React](https://reactjs.org/) -Framework <br/>
[Firebase](https://firebase.google.com/docs/hosting/) - Hosting

## Authors
Ahmad Qassim
Sebastian Pazirai
Joakim Gustavsson
Josef Federspiel

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
