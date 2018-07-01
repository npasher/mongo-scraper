const axios=require("axios");
const cheerio=require("cheerio");

const scrape=function(){//Scrapes website.//
  return axios.get("https://www.caranddriver.com").then(function(res){
    const $=cheerio.load(res.data);
  
    const articles=[];//Saves info.//

    $("h2").each(function(i,element){
      
      const head=$(this)//Obtains headline.//
        .children("a")
        .text()
        .trim();

      const url = $(this)//Obtains URL.//
        .children("a")
        .attr("href");

      const sum=$(this)//Obtains summary.//
        .text()
        .trim();

      if (head && sum && url){//Validates data.//
        
        const result={
          headline:head,
          summary:sum,
          url:"https://www.caranddriver.com"+url
        };
        articles.push(result);
      }
    });
    return articles;
  });
};

module.exports=scrape;//Exports function.//