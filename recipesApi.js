const express = require('express')
const router = express.Router()
const axios = require('axios')


dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]


router.get('/Recipes/:ingredient', (req, res) => {
  const ingredient = req.params.ingredient;
  const diary = req.query.diary;
  const gluten = req.query.gluten;
  const index = req.query.index;

  axios
      .get(
        `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
      )
      .then((result) => {
        recipes = result.data.results;
        if(diary && gluten){
          let concatSensitive = dairyIngredients.concat(glutenIngredients);
          let recipesWithOutGlutenDiary = filterRecipes(recipes, concatSensitive);
          res.send(recipesWithOutGlutenDiary);
        }
        else if(diary){
          let recipesWithOutDairy = filterRecipes(recipes, dairyIngredients);
          res.send(recipesWithOutDairy);
        }
        else if(gluten){
          let recipesWithOutGluten = filterRecipes(recipes, glutenIngredients);
          res.send(recipesWithOutGluten);
        }
        else{
          res.send(recipes);
        }
      });
  

  console.log( ingredient + " " + diary + " " + gluten + " " );

  
})



router.get("/singleRecipe/:idMeal", (req, res) => {
  const idMeal = req.params.idMeal;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${idMeal}`
    )
    .then((result) => {
      let ingredient = result.data.ingredients[0];
      res.send(ingredient);
    });
  res.status(200);
});


  function filterRecipes(recipes, sensetive) {

    let singleRecipe = {};
    let recipesWithOutSensetive = [];
    let sensetiveLowerCase = []
     sensetive.forEach((ingredient) => {
        sensetiveLowerCase.push(ingredient.toLowerCase())
        
    })
  
        for (let i = 0; i < recipes.length; i++) {
          singleRecipe = {};
          for (let j = 0; j < recipes[i].ingredients.length; j++) {
            let ingArr = recipes[i].ingredients[j].split(" ");

  
            ingArr.forEach((ing) => {
              if (sensetiveLowerCase.includes(ing.toLowerCase())) {
                singleRecipe = recipes[i];
              }
            });
          }
          if (Object.keys(singleRecipe).length === 0) {
            recipesWithOutSensetive.push(recipes[i]);
          }
        }
        return recipesWithOutSensetive

  }




module.exports = router