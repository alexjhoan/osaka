$(window).on('load', function () {
  $('body').css('opacity', '1');
});

let offset

if (screen.width > 768){
  offset = 200
} else {
  offset = 0
}

new WOW({offset:offset, scrollContainer: null}).init()

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
            label: ['43%','57%'],
            backgroundColor: ['#976480','#cecece'],
            borderColor: '#CDAC7D',
            borderWidth: 0,
            data: [43,57],
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
$('#myModalC').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
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
  spaceBetween: 10,
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
$("#lightgallery .swiper-wrapper").lightGallery();
//---------------------------------Form-------------------------------
function dataSubmited(data) {
  const requestOptions = {
    method: 'POST',
    body: data,
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
  };
  fetch("https://www.infocasas.com.uy/proyectos/austin?&formulario=1&json=1", requestOptions)
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
    utm_medium: "austin",
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
