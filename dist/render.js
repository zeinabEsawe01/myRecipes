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
    console.log("hpp");
    $("#show-navigation").empty()
    let newHtml = template({navigation})
    $("#show-navigation").empty().append(newHtml)
}