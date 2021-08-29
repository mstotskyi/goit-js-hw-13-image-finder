export default class PicsApiService{


constructor() {
this.searchQuery ='';
this.page = 1;

}

fetchPictures () {
    const API_KEY = '23134043-5454bb2c28435773c6d2778ec';
    const BASE_URL = 'https://pixabay.com/api/';
    let page = 1;
    const URL = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(URL)
        .then(response => response.json())
        .then(data=>{
        this.incrementPage();
            return data.hits})
}

incrementPage(){
    this.page +=1
}

resetPage() {
    this.page = 1;
    }

get query() {
    return this.searchQuery;
}
set query(newQuery) {
    this.searchQuery = newQuery;
}
}


