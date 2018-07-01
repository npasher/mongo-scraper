$(document).ready(function(){

  let articleContainer=$(".article-container");//Referencing article cxontainer div.//
  //Event listeners for dynamically generated buttons.// 
  $(document).on("click",".btn.delete",handleArticleDelete);//Deleting articles.//
  $(document).on("click",".btn.notes",handleArticleNotes);//Pull article notes.//
  $(document).on("click",".btn.save",handleNoteSave);//Save article notes.//
  $(document).on("click",".btn.note-delete",handleNoteDelete);//Delete article notes.//

  initPage();//Initializes when page is loaded.//

  function initPage(){

    articleContainer.empty();//Runs AJAX request (saved articles) after container empty.//
    $.get("/api/headlines?saved=true").then(function(data){//Renders headlines to page.//
      if(data && data.length){
        renderArticles(data);
      }else{
        // Otherwise render a message explaing we have no articles
        renderEmpty();
      }
    });
  }
  function renderArticles(articles){//Handles appending HTML (article data) to page.//

    let articlePanels=[];//Passes JSON array containing available articles in database.//

    for(let i=0;i<articles.length;i++){//Passes each JSON object to createPanel function, returning a panel with article data.// 
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);//Appends HTML for articles stored in articlePanels array to the articlePanels container.//
  }
  function createPanel(article){//Takes a single JSON object and constructs JQuery element which will contain all HTML for the article panel.//
    let panel=$(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h4>",
        "<a class='article-link' target='_blank' href='" + article.url + "'>",
        article.headline,
        "</a>",
        "<a class='btn btn-danger delete'>",
        "Delete From Saved",
        "</a>",
        "<a class='btn btn-info notes'>Article Notes</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );

    panel.data("_id", article._id);//Attaches user selected aricle id to jQuery element.//
    return panel;//Returns element.//
  }
  function renderEmpty(){//Renders HTML to the page if articles non-exsisting.//

    let emptyAlert=$(//Uses array of HTML string data for easier use.//
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>No saved articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h4>Browse Available Articles?</h4>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    articleContainer.append(emptyAlert);//Data appending data to page.//
  }
  function renderNotesList(data){//Renders note list items to modal.//

    const notesToRender=[];//Array setup for notes to render.//
    let currentNote;//Temporarily stores each note.// 
    if (!data.notes.length){//Message displaying no notes for selected article.//
      currentNote=["<li class='list-group-item'>","No notes for selected article.", "</li>"].join("");
      notesToRender.push(currentNote);
    }else{
      for (let i=0;i<data.notes.length;i++){//Iterates through present notes.//

        currentNote=$(//li element constructed to contain noteText + delete button.//
          [
            "<li class='list-group-item note'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
          ].join("")
        );
        currentNote.children("button").data("_id", data.notes[i]._id);
        notesToRender.push(currentNote);//Adds currentNote to notesToRender array.//
      }
    }
    $(".note-container").append(notesToRender);//Appends inside the note modal.//
  }
  function handleArticleDelete(){//Handles the deletion of articles.//

    let articleToDelete=$(this).parents(".panel").data();

    $.ajax({//Delete method used.//
      method:"DELETE",
      url:"/api/headlines/"+articleToDelete._id
    }).then(function(data){
      if(data.ok){//Runs initPage, rerendering list of saved articles.//
        initPage();
      }
    });
  }
  function handleArticleNotes(){//Appends note modal and displays notes.//

    let currentArticle=$(this).parents(".panel").data();//Obtains id of article.//
    $.get("/api/notes/"+currentArticle._id).then(function(data){//Grab the notes of the article id.//
      let modalText=[//Contructs initial HTML for notes modal.//
        "<div class='container-fluid text-center'>",
        "<h4>Notes For Article: ",
        currentArticle._id,
        "</h4>",
        "<hr />",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save Note</button>",
        "</div>"
      ].join("");
      bootbox.dialog({//Adds HTML to the modal.//
        message: modalText,
        closeButton: true
      });
      let noteData={
        _id: currentArticle._id,
        notes:data || []
      };

      $(".btn.save").data("article", noteData);//Article and article notes added to save button.//
      renderNotesList(noteData);//Populates note HTML to modal.//
    });
  }
  function handleNoteSave(){//Handles user saving new article note.//

    let noteData;//Holds formatted note data.//
    let newNote=$(".bootbox-body textarea").val().trim();//Obtains typed note.//
 
    if (newNote){//Formats typed data and posts to the /notes route and noteData.//
      noteData={
        _id: $(this).data("article")._id,
        noteText: newNote
      };
      $.post("/api/notes",noteData).then(function(){
        bootbox.hideAll();//Modal closed on completion.//
      });
    }
  }
  function handleNoteDelete(){//Handles note deletion.//

    let noteToDelete=$(this).data("_id");//Grabs id of user selected note to delete.//

    $.ajax({//Sends delete request, of note id, to /notes.//
      url:"/api/notes/"+noteToDelete,
      method:"DELETE"
    }).then(function(){
      bootbox.hideAll();//Modal closed on completion.//
    });
  }
});