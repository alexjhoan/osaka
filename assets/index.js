$(window).on('load', function () {
  $('#page').delay(100).css('opacity', '1');

  $(".edf-select").on("click touchstart" ,function () {
    const nameLevel = this.id.replaceAll('_',' ')
    const capitalize = nameLevel.slice(0,1).toUpperCase() + nameLevel.slice(1)
    $(this).addClass('active').siblings().removeClass("active")
    $('.edfImgLevel').attr('src',`assets/images/units/typology2/plantas/${this.id}.png`)
    $(".edfLevelUrl").attr('href',`assets/images/units/typology2/plantas/${this.id}.png`)
    $("#nameLevel span").text(nameLevel)
  })

    $(".edf-select3").on("click touchstart" ,function () {
    const nameLevel = this.id.replaceAll('_',' ')
    const capitalize = nameLevel.slice(0,1).toUpperCase() + nameLevel.slice(1)
    $(this).addClass('active').siblings().removeClass("active")
    $('.edfImgLevel3').attr('src',`assets/images/units/typology3/plantas/${this.id}.png`)
    $(".edfLevelUrl3").attr('href',`assets/images/units/typology3/plantas/${this.id}.png`)
    $("#nameLevel3 span").text(nameLevel)
  })

    $(".prueba").click( function(){
      $(this).addClass('active').siblings().removeClass('active')
      const nameclase = $(this).attr("class")
      if (nameclase=="bsol prueba active") {
        $('.day').fadeTo(300,1)
        $('.night').fadeTo(300,0)
      } else{
        $('.night').fadeTo(300,1)
        $('.day').fadeTo(300,0)
      }

  })

  $("header .nav-link").click(function (e) {
    e.preventDefault()
    $("header .collapse.show").removeClass("show")
    const url = $(this).attr("href")
    const header = $("header").height()
    if (!url.includes("html")) {
      const section = $(url.slice(1)).offset().top;
      window.scrollTo({top: section - header,behavior: "smooth"});
    } else{
      window.location = url
    }
  })
});

let offset

if (screen.width > 768){
  offset = 200
} else {
  offset = 0
}

new WOW({offset:offset, scrollContainer: null}).init()

$(".homeDesign").fancybox({
  overlay : {
    closeClick : true,
  }
});
$(".edfLevelUrl").fancybox({
  overlay : {
    closeClick : true,
  }
});
$(".edfLevelUrl3").fancybox({
  overlay : {
    closeClick : true,
  }
});

$('header').load('components/header.html')
$('footer').load('components/footer.html')

// ------------------------------Locations-----------------------------
$(".list .locations_item").click(function(){
  let type = $(this).data("type")
  $(`.${type}`).addClass("active").siblings().removeClass("active")
  $(this).addClass("selector").siblings().removeClass("selector")
 });

$(".mybtn").click(function(){
  $(".locations_right div").addClass("active").siblings().removeClass("selector")
});
//----------------------------------------My-Chart-----------------------------
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Vendido', 'No Vendido'],
        datasets: [{
            label: ['50%','50%'],
            backgroundColor: ['#976480','#cecece'],
            borderColor: '#CDAC7D',
            borderWidth: 0,
            data: [50,50],
        }]
    },
    // Configuration options go here
    options: {
      cutoutPercentage: 65,
      tooltips: false,
        legend: {
            display: false,
        }
    }
});
// ------------------------------My Modal----------------------------
$('#myModalA').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
$('#myModalB').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
// ----------Swipper Modal-----------------
const swiperpopupa = new Swiper('.swiper-popupa', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
const swiperpopupb = new Swiper('.swiper-popupb', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
// ------------------------------Units Gallery-----------------------------
const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 20,
  loop: true,
  slidesPerView: 7,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
const galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs
  }
});
// ------------------------------Gallery-Advance-----------------------------
if (screen.width > 768){
  $("#lightgallery").lightGallery();
  const items =  $('#lightgallery a').length;
  const imgInit = 8
  const ImgMore = 4
  $('#lightgallery a:lt('+imgInit+')').show();
  if(imgInit >= items) {
    $('.btnMore').hide()
  }
  function seeMore() {
    let visibleItems = $('#lightgallery a:visible').length + ImgMore
    $('#lightgallery a:lt('+visibleItems+')').fadeIn(800);
    if(visibleItems >= items) {
      $('.btnMore').hide();
    }
  }
}
  if (screen.width < 768) {
    $("#gallery").addClass("swiper")
    $("#lightgallery").addClass("swiper-wrapper")
    $(".kids").addClass("swiper-slide")
      const mygallery = new Swiper(".swiper", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      })
  }
//---------------------------------Form-------------------------------
function dataSubmited(data) {
  const requestOptions = {
    method: 'POST',
    body: data,
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
  };
  fetch("https://www.infocasas.com.uy/proyectos/osaka?&formulario=1&json=1", requestOptions)
  .then((json) => {
    setTimeout(()=>{
      if (json.status === 200) {
        $('#formSuccess').fadeIn();
      } else {
        $('#formError').fadeIn();
      }
      $('#formSending').hide();
    }, 2000)
  })
  .catch(error => {
    console.log('error', error);
    setTimeout(() => {
      $('#formSending').hide();
      $('#formError').fadeIn();
    }, 2000)
  });
}

function submited() {
 'use strict'
  const form = document.querySelector('#contactForm')
  const data = JSON.stringify({
    nombre: form.name.value,
    apellido: "",
    email: form.email.value,
    telefono: form.phone.value,
    tel: form.phone.value,
    source: 2,
    utm_source: "web_cliente",
    utm_medium: "osaka",
    extra: form.consult.value,
    InfoLeads: 1,
    IDflow_execution: 4315
  })
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }else{
    dataSubmited(data)
    setTimeout(()=>{
      $(form).fadeOut();
      $('#formSending').fadeIn();
    },300)
  }
  form.classList.add('was-validated')
}
