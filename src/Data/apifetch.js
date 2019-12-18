import {API_KEY} from "./apiConfig";
import {ENDPOINT} from "./apiConfig";
const BASE_URL = ENDPOINT;

class apifetch {


    getDetailsById(type,id){
        let url = `${BASE_URL}3/${type}/${id}?api_key=${API_KEY}&language=en-US`
        return fetch(url).then((this.processResponse))
    }
    getInfoByTitle(title,type){
        let url = `${BASE_URL}3/search/${type}?language=en-US&page=1&include_adult=false&api_key=${API_KEY}&query=${title}`
        return fetch(url).then((this.processResponse))
    }
    getActorByName(Name){
        let url =`${BASE_URL}3/search/person?language=en-US&page=1&include_adult=false&api_key=${API_KEY}&query=${Name}`
        return fetch(url).then((this.processResponse))
    }

    // TODO: Write into one function that takes type as param.
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

    getCreditsById(type, id) {
        let url = `${BASE_URL}3/${type}/${id}/credits?api_key=${API_KEY}`;
        return fetch(url).then(this.processResponse);
    }
    getActorById(id){
        let url = `${BASE_URL}3/person/${id}?api_key=${API_KEY}`;
        return fetch(url).then(this.processResponse);

    }

}
const model = new apifetch();
export default model;