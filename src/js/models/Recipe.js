import axios from 'axios';
import {key} from '../config';
export default class Recipe {
    constructor(id){
        this.id =id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title=res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients= res.data.recipe.ingredients;
        }
        catch (error){
            console.log(error);
            alert(`Something went wrong :()`);
        }

    }
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil (numIng /3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons','tablespon','ounces','ounce','teaspoon','teaspoons','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound']
        const newIngredients = this.ingredients.map( el => {
            // 1) Transform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');

            //Check to see if any element of the array has any unit name 
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1){
                //There is a unit
                //Ex. 4 1/2 cups arrCount is [4,1 /2]
                //Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                if (arrCount.length === 1){
                    count = arrIng[0].replace('-','+');
                }
                else{
                    //eval(4+1/2) = 4.5
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            }
            else if (parseInt(arrIng[0],10)){
                //There is no unit but the 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
            else if (unitIndex === -1){
                //There is NO unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        }); 
        this.ingredients = newIngredients;
    }
} 