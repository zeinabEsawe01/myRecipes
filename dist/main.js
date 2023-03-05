
index=0
const  Search = function(){
    let ingredient = $("#ingredient").val()

    if ($("#diary").prop("checked") && !$("#gluten").prop("checked")) {
        $.get(`/diary/${ingredient}&${index}`).then((loadedData) => {
          let data = loadData(loadedData);
          render(data);
          console.log("diary server");
        })
    }
        else if ($("#gluten").prop("checked") && !$("#diary").prop("checked")) {
            $.get(`/gluten/${ingredient}`).then((loadedData) => {
              let data = loadData(loadedData);
              render(data);
              console.log("glutin server");
            });
        }
        else if ($("#gluten").prop("checked") && $("#diary").prop("checked")) {
            $.get(`/DiaryGluten/${ingredient}`).then((loadedData) => {
              let data = loadData(loadedData);
              render(data);
              console.log("glutin and diary server");
            });
        }
        else {
            $.get(`/Recipes/${ingredient}?index=${index}`).then((loadedData) => {
              let data = loadData(loadedData);
              let navigate = navigation()
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
      return index;
    }

    const navigation = function(){
      let ingredient = $("#ingredient").val()
      $.get(`/recipesLength/${ingredient}`).then((recipesLength) => {
      let navigationArr = []
      let len = recipesLength.length;
      let naviNum = 1
      while(len >= 4){
        navigationArr.push(naviNum++) 
        len = len - 4;
      }
      if(len > 0){
        navigationArr.push(naviNum)
      }
      return navigationArr
    });
      
      }

    const render = function(recipes){
        const source = $("#recipe-template").html()
        const template = Handlebars.compile(source)
        $("#show-recipes").empty()
        let newHtml = template(recipes)
        $("#show-recipes").empty().append(newHtml)
    }

    const renderNavigation = function(navigation){
      const source = $("#navigation-template").html()
        const template = Handlebars.compile(source)
        $("#show-navigation").empty()
        let newHtml = template({navigation})
        $("#show-navigation").empty().append(newHtml)
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

//   const  checkbox = function(){
//     let sensetive = $('input[name="interest"]:checked').serialize();
//     console.log(sensetive);
//     // $.get(`/Recipes/${ingredient}`)
//     // .then(data => {
//   }
//   checkbox()