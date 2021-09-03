export default class PicsApiService{

constructor() {
this.searchQuery ='';
this.page = 1;
this.hits = 0;
}

fetchPictures () {
    const API_KEY = '23134043-5454bb2c28435773c6d2778ec';
    const BASE_URL = 'https://pixabay.com/api/';
    const URL = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    console.log(this.page);
    return fetch(URL)
        .then(response => response.json())
        .then(data=>{
        this.incrementPage();
        console.log(this.page);
        this.getHits (data.totalHits);
        return data.hits})
}

incrementPage(){
    this.page +=1
}

resetPage() {
    this.page = 1;
}

getHits (totalHits) {
    this.hits = totalHits
}

get query() {
    return this.searchQuery;
}

set query(newQuery) {
    this.searchQuery = newQuery;
}
}


