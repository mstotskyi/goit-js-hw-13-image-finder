import './sass/main.scss';
import photoCardTpl from './templates/photocardtpl.hbs'
import PicsApiService from './js/apiService.js'
import OnTopBtn from './js/ontopbtn.js'
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";
import { error, notice, alert} from "@pnotify/core/dist/PNotify";

const refs = {
    search: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more-btn'),
    modal: document.querySelector('.lightbox'),
    modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
    overlayClickModalClose: document.querySelector('.lightbox__overlay'),
    modalIsOpenImg: document.querySelector('.lightbox__image'),
    spinner: document.querySelector('.spinner'),
 }

const onTopBtn = new OnTopBtn ();

onTopBtn.onTop();

const picsApiService = new PicsApiService ();



function onSearch (e) {
    e.preventDefault();
    picsApiService.query = e.currentTarget.elements.query.value.trim();
  if (picsApiService.query ==='') {
    error({
    title: 'Внимание!',
    text: 'Поле запроса пустое!'
  }); 
  return
}
   picsApiService.fetchPictures().then(pics=>{
      if (picsApiService.hits === 0){
        alert ({
          title: `Внимание!`,
          text: `Некорректный запрос`
        })   
        return
      } 
      else {
        loadMoreBtnShow ()
    refs.gallery.innerHTML = '';
    loadMoreBtnDisabled ();
    picsApiService.resetPage();
        renderCard (pics),
        notice ({
          title: `Поздравляем!`,
          text: `Найдено ${picsApiService.hits} совпадений!`}),
        loadMoreBtnEnable (), scrollIntoView()
    };
  })
 }

function onLoadMore () {
    loadMoreBtnDisabled ();
    picsApiService.fetchPictures().then(pics=>{renderCard (pics),
      loadMoreBtnEnable ()
      scrollIntoView()
   }) 
}

function scrollIntoView () {
     const element = document.getElementById('body');
      element.scrollIntoView({
        behavior: 'smooth',
        block: "end",
      });
}

function renderCard (pics){
    const picsCard = photoCardTpl (pics);
    refs.gallery.insertAdjacentHTML('beforeend', picsCard)
}

refs.search.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', modalOpen);

function modalOpen (event){

  event.preventDefault();
  if (event.target.nodeName !== "IMG"){
    return;
  }
 modalIsOpen(event);
};

function modalIsOpen(event) {
  modalToggle();
  refs.modalIsOpenImg.src = event.target.dataset.source;
  refs.modalIsOpenImg.alt = event.target.alt;
}

function modalToggle(){
refs.modal.classList.toggle('is-open')
};

refs.overlayClickModalClose.addEventListener('click', modalIsClose);
refs.modalCloseBtn.addEventListener("click", modalIsClose);
window.addEventListener('keyup', closeModalOnESC);

function modalIsClose (){
  modalToggle();
  refs.modalIsOpenImg.src = '';
}

function closeModalOnESC(event) {
  if (event.key !== 'Escape'){
    return;
  };
  modalIsClose ();
};

function loadMoreBtnShow () {
  refs.loadMore.classList.remove('is-hidden');
}

function loadMoreBtnEnable () {
  refs.loadMore.classList.remove('is-hidden');
  refs.loadMore.disabled = false;
  refs.spinner.classList.add('is-hidden');
  
 
};

function loadMoreBtnDisabled () { 
  refs.loadMore.classList.remove('is-hidden');
  refs.loadMore.disabled = true;
  refs.spinner.classList.remove('is-hidden');
}

