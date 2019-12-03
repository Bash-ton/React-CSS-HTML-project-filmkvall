import {API_KEY} from "./apiConfig";
import {ENDPOINT} from "./apiConfig";
const BASE_URL = ENDPOINT;

class apifetch {
    constructor() {
    }

    getMovieByTitle(title){
        let url = `${BASE_URL}3/search/movie/?language=en-US&page=1&include_adult=false&api_key=${API_KEY}&query=${title}`
        return fetch(url).then((this.processResponse))
    }

    getTrending(){
    let url = `${BASE_URL}3/trending/movie/day?api_key=${API_KEY}`;
    return fetch(url).then(this.processResponse);
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }
}
const model = new apifetch();
export default model;