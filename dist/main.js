
const itemsPerPage = 4;

const  Search = function(startindex=0){
    let ingredient = $("#ingredient").val()
    console.log(startindex);

    if ($("#diary").prop("checked") && !$("#gluten").prop("checked")) {
        $.get(`/Recipes/${ingredient}?diary=true&startindex=${startindex}`).then((loadedData) => {
          let data = loadData(loadedData.recipes);
          let navigate = navigation(loadedData.recipesLength)
          render(data);
          renderNavigation(navigate);
          console.log("diary server");
        })
    }
        else if ($("#gluten").prop("checked") && !$("#diary").prop("checked")) {
            $.get(`/Recipes/${ingredient}?gluten=true&startindex=${startindex}`).then((loadedData) => {
              let data = loadData(loadedData.recipes);
              let navigate = navigation(loadedData.recipesLength)
              render(data);
              renderNavigation(navigate);
              console.log("glutin server");
            });
        }
        else if ($("#gluten").prop("checked") && $("#diary").prop("checked")) {
            $.get(`/Recipes/${ingredient}?diary=true&gluten=true&startindex=${startindex}`).then((loadedData) => {
              let data = loadData(loadedData.recipes);
              let navigate = navigation(loadedData.recipesLength)
              render(data);
              renderNavigation(navigate);
              console.log("glutin and diary server");
            });
        }
        else {
            $.get(`/Recipes/${ingredient}?startindex=${startindex}`).then((loadedData) => {
              let data = loadData(loadedData.recipes);
              let navigate = navigation(loadedData.recipesLength)
              render(data);
              renderNavigation(navigate);
              console.log("recipes server");
            });
          }
             
}

const loadData = function(loadData){
        let results = loadData
        let myRecipes =[]
        console.log(results);
        for (let res of results) {
            let recipe = {}
            recipe.idMeal= res.idMeal
            recipe.ingredient = res.ingredients
            recipe.title = res.title
            recipe.thumbnail = res.thumbnail
            recipe.href = res.href
            myRecipes.push(recipe)
        }
        return myRecipes
}


    const pagination = function(num){
      index = (num *itemsPerPage) - itemsPerPage
      Search(index)
    }

    const navigation = function(recipesLength){
      let navigationArr = []
      let len = recipesLength;
      let naviNum = 1
      while(len >= 4){
        navigationArr.push(naviNum++) 
        len = len - 4;
      }
      if(len > 0){
        navigationArr.push(naviNum)
      }
      console.log(navigationArr);
      return navigationArr
    
      }


    $("#show-navigation").on("click", "button", function(){
      let value = ($(this)).data().id;
      pagination(value)
    })
  

$("#show-recipes").on('click', ".picture",  function() {
    //  ret = DetailsView.GetProject($(this).attr("#data-id"), OnComplete, OnTimeOut, OnError);
    let imgId = ($(this).data().id);
    $.get(`/singleRecipe/${imgId}`).then((firstIngredient) => {
        alert(firstIngredient);
      });
  });

