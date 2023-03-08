

const  Search = function(){
    let ingredient = $("#ingredient").val()


    if ($("#diary").prop("checked") && !$("#gluten").prop("checked")) {
        $.get(`/Recipes/${ingredient}?diary=true`).then((loadedData) => {
          let data = loadData(loadedData);
          let navigate = navigation(data)
          render(data);
          renderNavigation(navigate);
          console.log("diary server");
        })
    }
        else if ($("#gluten").prop("checked") && !$("#diary").prop("checked")) {
            $.get(`/gluten/${ingredient}?gluten=true&&startIndex=${startIndex}`).then((loadedData) => {
              let data = loadData(loadedData);
              let navigate = navigation(data)
              render(data);
              renderNavigation(navigate);
              console.log("glutin server");
            });
        }
        else if ($("#gluten").prop("checked") && $("#diary").prop("checked")) {
            $.get(`/DiaryGluten/${ingredient}?diary=true&gluten=true`).then((loadedData) => {
              let data = loadData(loadedData);
              let navigate = navigation(data)
              render(data);
              renderNavigation(navigate);
              console.log("glutin and diary server");
            });
        }
        else {
            $.get(`/Recipes/${ingredient}`).then((loadedData) => {
              let data = loadData(loadedData);
              let navigate = navigation(data)
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
      index = (num *4) - 4
      console.log(index);
    }

    const navigation = function(recipes){
      let navigationArr = []
      let len = recipes.length;
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

