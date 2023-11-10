import React ,{useEffect,useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
    const [articles,setArticles]=useState([])
    const [loading,setloading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,settotalResults]=useState(0)
   
 
   const capitalizFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    
  
    const updateNews= async()=>{
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setloading(true)
      let data =await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json()
      props.setProgress(70);
      console.log(parsedData);
      setArticles(parsedData.articles)
      settotalResults(parsedData.totalResults)
      setloading(false)
     
      props.setProgress(100);
    }
    useEffect(()=>{
       document.title=`${capitalizFirstLetter(props.category)}-SnapNews`;
      updateNews();
      /* eslint-disable */
    },[])

    // async componentDidMount(){
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ef588f61db9493ebb42d7ca906a32c1&page=1&pageSize=${props.pageSize}`;
    //   {this.setState({loading:true})};
    //   let data =await fetch(url);
    //   let parsedData = await data.json()
     
    //   this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults,
    //   loading:false
    //   })
    //   this.updateNews();
    // }

    // const handlePrevClick =async()=>{
    //   console.log("Previous");
    //   setPage(page-1);
    //   updateNews();
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ef588f61db9493ebb42d7ca906a32c1&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //   {this.setState({loading:true})};
    //     let data =await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //   this.setState({
    //     page:this.state.page-1,
    //     articles:parsedData.articles,
    //     loading:false
    //   })
    //   this.setState({page:this.state.page -1})
    //   this.updateNews();
    // }


  //  const handleNextClick =async()=>{
  //       setPage(page+1);
  //       updateNews();
   
  //   if (!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
  //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ef588f61db9493ebb42d7ca906a32c1&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //     {this.setState({loading:true})};
  //     let data =await fetch(url);
  //     let parsedData = await data.json()
  //     this.setState({
  //     page:this.state.page+1,
  //     articles:parsedData.articles,
  //     loading:false
  //   })
  //   }
  //   this.setState({page:this.state.page +1})
  //   this.updateNews();
  // }

  const fetchMoreData =async () => {
   
  //  setState({page:this.state.page +1})
   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page+1);
  //  {this.setState({loading:true})};
  setloading(true)
   let data =await fetch(url);
   let parsedData = await data.json()
   setArticles(articles.concat(parsedData.articles))
   settotalResults(parsedData.totalResults)
   console.log(parsedData);
  //  this.setState({
  //  articles:articles.concat(parsedData.articles),
  //  totalResults:parsedData.totalResults,
  //  loading:false
  //  })
  };


 
    return (
      <>
        <h1 className="text-center" style={{marginTop:'90px', marginBottom:'30px'}}>SnapNews - Top {capitalizFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner/> }  
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>
            <div className="container">
        <div className="row">
        {articles.map((element ,)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>})}
          
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize
          ))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
       
      </>
    )
  
}
News.defaultProps={
  country : 'in',
  pageSize: 6,
  category: 'general'
}
News.propsTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News