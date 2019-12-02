import {API_KEY} from "./apiConfig";
import {ENDPOINT} from "./apiConfig";
const BASE_URL = ENDPOINT;
const httpOptions = {
    headers: { "X-Mashape-Key": API_KEY}
};
class apifetch {
    constructor() {
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