const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/Recipes/:ingredient', (req, res) => {
    let ingredient = req.params.ingredient
    axios
        .get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`)
            .then(results => {    
                res.send(results.data.results)
    }
)

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

dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]

router.get("/diary/:ingredient", (req, res) => {
    const ingredient = req.params.ingredient;
  
    axios
      .get(
        `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
      )
      .then((result) => {
        recipes = result.data.results;
      let recipesWithOutDairy = filterRecipes(recipes, dairyIngredients);
        res.send(recipesWithOutDairy);
      });
  
    res.status(200);
  });
  
  router.get("/gluten/:ingredient", (req, res) => {
    const ingredient = req.params.ingredient;
    axios
      .get(
        `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
      )
      .then((result) => {
        recipes = result.data.results;
        let recipesWithOutGluten = filterRecipes(recipes, glutenIngredients);
        res.send(recipesWithOutGluten);
      });
  
    res.status(200);
  });

  router.get("/DiaryGluten/:ingredient", (req, res) => {
    const ingredient = req.params.ingredient;
  
    axios
      .get(
        `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
      )
      .then((result) => {
        recipes = result.data.results;
        let concatSensitive = dairyIngredients.concat(glutenIngredients);
        let recipesWithOutGlutenDiary = filterRecipes(recipes, concatSensitive);
       
        res.send(recipesWithOutGlutenDiary);
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