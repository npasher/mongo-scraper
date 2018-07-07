const db=require("../models");
const scrape=require("../scripts");

module.exports={
  scrapeHeadlines:function(req,res){
    
    return scrape()//Scraping of website.//
      .then(function(articles){//Insert articles into DB.//
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline){
        if (dbHeadline.length===0){
          res.json({
            message: "New articles not found. Please check back later."
          });
        }else{
          res.json({//Sends back number of new articles scraped.//
            message:"Added: "+dbHeadline.length+" new articles."
          });
        }
      })
      .catch(function(err){
        res.json({//Returned message upon scrape completion.//
          message:"Scrape Completion."
        });
      });
  }
};