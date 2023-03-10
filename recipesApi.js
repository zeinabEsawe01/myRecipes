const express = require('express')
const router = express.Router()
const axios = require('axios')


dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]


router.get('/Recipes/:ingredient', (req, res) => {
  const ingredient = req.params.ingredient;
  const diary = req.query.diary;
  const gluten = req.query.gluten;
  const startindex = req.query.startindex;

  let returnRecipes = [];
  if(diary){
    returnRecipes.push(...dairyIngredients)
  }
  if(gluten){
    returnRecipes.push(...glutenIngredients)
  }
  console.log(startindex);
  axios
      .get(
        `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
      )
      .then((result) => {
        recipes = result.data.results;
        finalResults = filterRecipes(recipes,returnRecipes)
        let recipesLength = finalResults.length;
        resultObj ={
          recipes: finalResults.splice(startindex,4),
          recipesLength: recipesLength
        }
          res.send(resultObj);
      });
  

  console.log( ingredient + " " + diary + " " + gluten + " " );
  console.log(returnRecipes);
  
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