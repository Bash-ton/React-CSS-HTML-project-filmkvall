import {API_KEY} from "./apiConfig";
import {ENDPOINT} from "./apiConfig";
const BASE_URL = ENDPOINT;

class apifetch {


    getMovieByTitle(){
        let url = `${BASE_URL}3/movie/398978?api_key=${API_KEY}&language=en-US`
        return fetch(url).then((this.processResponse))
    }
    getInfoByTitle(title,type){
        let url = `${BASE_URL}3/search/${type}?language=en-US&page=1&include_adult=false&api_key=${API_KEY}&query=${title}&limit=5`
        return fetch(url).then((this.processResponse))
    }

    getTrendingMovie(){
        let url = `${BASE_URL}3/trending/movie/day?api_key=${API_KEY}`;
        return fetch(url).then(this.processResponse);
    }

    getTrendingSeries(){
        let url = `${BASE_URL}3/trending/tv/day?api_key=${API_KEY}`;
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