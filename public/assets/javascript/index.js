$(document).ready(function(){
  
  let articleContainer=$(".article-container");//Sets container for dynamic content.//
  $(document).on("click",".btn.save",handleArticleSave);//Event listener for save.//
  $(document).on("click",".scrape-new",handleArticleScrape);//Event listener for new article.//

  pageInitalize();//After page initialization, function starts app.//

  function pageInitalize(){

    articleContainer.empty();//Empties article container.//
    $.get("/api/headlines?saved=false").then(function(data){//Runs AJAX request for unsaved
      if (data && data.length) {//Renders found headlines to the page.//
        renderArticles(data);
      }else{
        renderEmpty();//Renders no articles message.//
      }
    });
  }
  function renderArticles(articles){//Handles appending HTML w/article data to page.//
    
    let articlePanels=[];//Passed an array of JSON with all articles in the database.//
 
    for (let i=0;i<articles.length;i++){
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);//Appends stored articles in array to container.//
  }
  function createPanel(article){

    const panel=$(//Constructed jQuery element all the formatted article panel HTML.//
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        "<a class='article-link' target='_blank' href='" + article.url + "'>",
        article.headline,
        "</a>",
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );
    panel.data("_id",article._id);//Attach article's id to the element.//
    return panel;//Returns jQuery panel element.//
  }
  function renderEmpty(){//Renders HTML noting no new articles.//

    const emptyAlert=$(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>No new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Will You Like To:</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
        "<h4><a href='/saved'>Proceed to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    articleContainer.append(emptyAlert);//Data appended to the page.//
  }
  function handleArticleSave(){//Called when user requests to save article.//
    
    let articleToSave=$(this).parents(".panel").data();
    articleToSave.saved=true;

    $.ajax({//Patch method used to update the existing record collection.//
      method:"PUT",
      url:"/api/headlines/"+articleToSave._id,
      data:articleToSave
    }).then(function(data){
      // If successful, mongoose sends back an object containing a key of "ok" with the value of 1
      // (which casts to 'true')
      if (data.ok){//Reloads list of articles by running pageInitalize function.//
        pageInitalize();
      }
    });
  }
  function handleArticleScrape(){//Function if user clicks "scrape new articles".//
    
  $.get("/api/fetch").then(function(data){
      pageInitalize();
      bootbox.alert("<h4 class='text-center m-top-80'>"+data.message+"<h4>");
    });
  }
});