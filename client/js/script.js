"use strict";

document.addEventListener("DOMContentLoaded", onPageLoad);

function onPageLoad() {
    document.getElementById('portfolio2').innerHTML += displayViewList(getGaleryData());

}


function displayViewList(value) {
    window.arrayOfData = value;
    value = JSON.parse(value);
    //console.log(value);
    let galerey = '';
    for (let data in value) {

        galerey += `
      <article class="col-xxxl-12-5 col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 portfolio-item">
                            <div class="portfolio-item-content">
                            	<div class="portfolio-img">
                            		<img alt="image" src="${value[data]['srcPhoto']}">
                                    <div class="portfolio-img-detail">
                                    	<div class="portfolio-img-detail-inner">
                                    		<a class="portfolio-img-detail-content" href="${value[data]['srcPhoto']}" data-lightbox="portfolio-images"><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="portfolio-item-info">
                                    <div class="portfolio-item-cat">
                                    	<a href="#">${value[data]['category']}</a>
                                  	</div>
                                    <a class="popup-window-trigger" data-popup="#popup-portfolio-10">${value[data]['photoLabel']}</a>
                                </div>
                        	</div>
                        </article>       
        `;
    }
    return galerey;
}

function getGaleryData() {
    return getDataByRequest('/Galery');
}

function getDataByRequest(url) {

    var xhr = new XMLHttpRequest();

    if (isSet(arguments[1])) {
        xhr.open(arguments[1],url , false)
    } else {
        xhr.open('GET', url, false);
    }

    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();
    if (xhr.status !== 200) {
        alert('seems something wrong');
    } else {
        if (xhr.responseText === '')
            alert('There are no result by those parameter');
        return xhr.responseText;
    }
}


/* var xhr = new XMLHttpRequest();
 xhr.open('GET', url, false);
 xhr.setRequestHeader("content-type", "application/json");
 xhr.send();
 if (xhr.status !== 200) {
     alert('seems something wrong');
 } else {
     if (xhr.responseText === '')
         alert('There are no result by those parameter');
     return xhr.responseText;
 }*/

/*
    $.ajax({
        type: "GET",
        url: "http://localhost/Galery"
    }).done(function (datain) {
        alert(datain);
        mainQuestion = datain;
        $("#QuestionField").html(getdata(datain));

    });*/
/* document.getElementById('similarFilms').innerHTML = displayViewList(getTopFilms());
 document.getElementById('similarFilms').style.visibility = 'visible';
 document.getElementById('hiddenDiv').innerHTML = '<h2>Top Films</h2>';



document.getElementById('hiddenDiv').style.visibility = 'visible';*/


/*$(document).ready(function () {
    $(document).ready(function () {

        $.ajax({
            type: "GET",
            url: "http://localhost/Galery"
        }).done(function (datain) {
            alert(datain);
            mainQuestion = datain;
            $("#QuestionField").html(getdata(datain));

        });
        return false;
    });

});*/


