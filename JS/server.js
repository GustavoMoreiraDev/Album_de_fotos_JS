class Album_de_fotos {
  
    async GetPhotos (index){
      
      const BaseUrl = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`
      const data = await this.fetchImagens(BaseUrl)
      this.NextPage.setAttribute('data-img', 'curated');
      this.GenerateHTML(data.photos)
      console.log(data)
    }
  
    async fetchImagens(BaseUrl){
      const response = await fetch(BaseUrl, {
        
        method: 'GET',
        headers: {
          
          Accept: 'application/json',
          Authorization: this.API_KEY
        }

      });
  
      const data = await response.json()
      return data;
    }
  
    GenerateHTML(photos){
     
      photos.forEach(photo=>{
       
        const item= document.createElement('div')
        item.classList.add('item')
        item.innerHTML = 
            
           `<div class="img-wrapper">
              <a class="img" loading="lazy" href='${photo.src.original}'target="_blank"><img loading="lazy" class="img" src="${photo.src.medium}"></a>
            </div>`
  
        this.galeriaDIv.appendChild(item)

      })
    }
  
    async getSearchedImagens(e){
      this.NextPage.setAttribute('data-img', 'search')
      e.preventDefault()
      this.galeriaDIv.innerHTML=''
      const searchValue = e.target.querySelector('input').value
      this.searchValueGlobal = searchValue
      const BaseUrl = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`
      const data = await this.fetchImagens(BaseUrl)
      this.GenerateHTML(data.photos)
      e.target.reset()
    }
  
    async getMoreSearchedImagens(index){
    
      const BaseUrl = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`
      const data = await this.fetchImagens(BaseUrl)
      console.log(data)
      this.GenerateHTML(data.photos)
    }
  
    loadMoreImagens(e){
      let index = ++this.pageIndex;
      const loadMoreData = e.target.getAttribute('data-img')
      if(loadMoreData === 'curated'){
    
        this.GetPhotos(index)
      }else{
  
        this.getMoreSearchedImagens(index)
      }
    }
  
    constructor(){
      
      this.API_KEY = "563492ad6f91700001000001dac507b22f25415c861a3bd1f27322ea"
      this.galeriaDIv = document.querySelector('.root')
      this.searchForm = document.querySelector('.buscador form')
      this.NextPage = document.querySelector('.next-page')
      this.logo = document.querySelector('.logo')
      this.pageIndex = 1
      this.searchValueGlobal = ''
      this.eventHandle()
    }
  
    eventHandle(){
      document.addEventListener('DOMContentLoaded',() =>{
        this.GetPhotos(1)
      });
  
      this.searchForm.addEventListener('submit', (e) =>{
        this.pageIndex = 1
        this.getSearchedImagens(e)
      });
  
      this.NextPage.addEventListener('click', (e) =>{
        this.loadMoreImagens(e);
      })
  
      this.logo.addEventListener('click', () =>{
        this.pageIndex = 1
        this.galeriaDIv.innerHTML = ''
        this.GetPhotos(this.pageIndex)
      })
    }
  }

  const root = new Album_de_fotos


  