import axios from 'axios';
import {key} from '../config.js';
export default class Search{
    constructor(query) {
        this.query = query;
    }

    async getResults(){
        //Because fetch is not compatible with all browsers
        //import axios instead
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error){
            alert(error);
        }
    }
  
}
