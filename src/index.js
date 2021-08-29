import './sass/main.scss';
import photoCardTpl from './templates/photocardtpl.hbs'
import PicsApiService from './apiService.js'


const refs = {
    search: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more-btn')
}


const picsApiService = new PicsApiService ();


function onSearch (e) {
    e.preventDefault();
    refs.gallery.innerHTML = '';
   picsApiService.query = e.currentTarget.elements.query.value.trim();
   picsApiService.resetPage()
   picsApiService.fetchPictures().then(pics=>{renderCard (pics)})
   renderCard ()
  }

function onLoadMore () {
    picsApiService.fetchPictures().then(pics=>{renderCard (pics)})
    renderCard ()
}

function renderCard (pics){
    const picsCard = photoCardTpl (pics);
    refs.gallery.insertAdjacentHTML('beforeend', picsCard)
  }

refs.search.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadMore)
