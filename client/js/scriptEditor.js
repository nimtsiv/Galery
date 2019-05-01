"use strict";

document.addEventListener("DOMContentLoaded", onPageLoad);

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function onPageLoad() {
    document.getElementById('tableDiv').innerHTML += displayViewList(getGaleryData('Galery?skip=0'));
}

function deleteRecord(value) {
    console.log(arrayOfData[value]['_id']);
    getDataByRequest('Galery/' + arrayOfData[value]['_id'], 'DELETE');
    document.getElementById('tr' + value).remove();
}

function createNew() {

    let formData = new FormData();
    formData.append('file', $('#media')[0].files[0]);
    let x = document.getElementById('category').value;
    let y = document.getElementById('photoLabel').value;

    let body = JSON.stringify({
        "photoLabel": y,
        "category": x
    });


    $.ajax({
        url: "/Galery",
        type: "POST",
        data: formData,
        headers: {
            "photoLabel": y,
            "category": x
        },
        //headers: {body: body,
        processData: false,
        contentType: false,
        success: function (response) {
            //alert(response);
            hide();
            document.getElementById('tableDiv').innerHTML = displayViewList(getGaleryData('Galery?skip=0'));
            // .. do something
        },
        error: function (jqXHR, textStatus, errorMessage) {
            console.log(errorMessage); // Optional


        }
    });

}

function editRecord(value) {
    if (isNaN(value)) {
        let element = document.getElementById("editForm");
        element.setAttribute(
            "style", "visibility: visible;  position:fixed; z-index : 1; width : 50%; margin-left : 33%; padding : 3% 60px;");
        //document.getElementById('editForm').style.visibility='visible';
        element.innerHTML = `<div class="modal-content"style="text-align: center">
        <span class="close" onclick="hide()">&times;</span>
      
        <button style="margin-bottom: 15px; width: 90px; height: auto; margin-right: 50px">
        <img style="max-height: 100%; width: 70px"  src="data:image/png;base64,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" style="max-width:100%; height: 200px" alt="">
        </button>
        
        <input   type="file"  id="media" name="media"  accept="image/*" multiple />
        
        <label for="category" style="color: #1b1b1b; margin: 25px">Write the category</label><br>
        <input name="category" id="category"  type="text" title="category">
        <label for="photoLabel" style="color: #1b1b1b; margin: 25px">Write the label of picture</label><br>
        <input name="photoLabel" id="photoLabel"  type="text" title="label of picture">
         <input type="submit" value="Save" onclick="createNew()" style="display: inline-block ; color: #1b1b1b">
    </div>`;
    }
    else {
        let element = document.getElementById("editForm");
        element.setAttribute(
            "style", "visibility: visible;  position:fixed; z-index : 1; width : 50%; margin-left : 33%; padding : 3% 60px;");
        //document.getElementById('editForm').style.visibility='visible';
        element.innerHTML = `<div class="modal-content"style="text-align: center">
        <span class="close" onclick="hide()">&times;</span>
        <img src="${arrayOfData[value]['srcPhoto']}" style="max-width:100%; height: 200px" alt="">
        <label for="category" style="color: #1b1b1b; margin: 25px">Write the category</label><br>
        <input name="category" id="category"  type="text" value="${arrayOfData[value]['category']}">
        <label for="photoLabel" style="color: #1b1b1b; margin: 25px">Write the label of picture</label><br>
        <input name="photoLabel" id="photoLabel"  type="text" value="${arrayOfData[value]['photoLabel']}">
         <input type="button" value="Save" onclick="saveData(${value})" style="display: inline-block ; color: #1b1b1b">
    </div>`;
    }
}

function saveData(value) {
    let x = document.getElementById('category').value;
    let y = document.getElementById('photoLabel').value;
    if (isSet(value || value !== "0")) {
        let data = JSON.stringify({
            "photoLabel": y,
            "category": x,
            "srcPhoto": arrayOfData[value]['srcPhoto']
        });
        document.getElementById('label' + value).innerHTML = y;
        arrayOfData[value]['srcPhoto'] = y;
        getDataByRequest('Galery/' + arrayOfData[value]['_id'], 'PUT', data);
    } else {

    }
    hide();

}

function hide() {
    document.getElementById("editForm").style.visibility = 'hidden';
}

function displayViewList(value) {
    value = JSON.parse(value);
    window.arrayOfData = value;
    let galerey = `
    <table class="table-fill">
                    <thead>
                     <tr>
                        <th class="text-left" colspan="3" style="text-align: center" onclick="editRecord()">  Add new photo + </th>                        
                    </tr>
                    <tr>
                        <th class="text-left"> <img src="images/prev-Button.png" alt="">Photo</th>
                        <th class="text-left">Subject</th>
                        <th class="text-left">Action<img src="images/next-Button.png" alt=""></th>
                        
                    </tr>
                    </thead>
                    <tbody class="table-hover">
    `;


    for (let data in value) {

        galerey += `
                    <tr id="${'tr' + data}">
                        <td class="text-left" id="${'src' + data}"><img src="${value[data]['srcPhoto']}" alt="" style="width : 150px"></td>
                        <td class="text-left" id="${'label' + data}">${value[data]['photoLabel']}</td>
                        <td class="text-left">
                            <button id="${data}" onclick="editRecord(this.id)"><img src="/ico/Updata.jpg" alt="" style="width: 30px; height: 30px; display: inline;  padding: 0px"></button>
                            <button id="${data}" onclick="deleteRecord(this.id)"><img src="/ico/Delete.jpg" alt="" style="width: 30px;height: 30px; display: inline;  padding: 0px"></button>
                        </>
                    </tr>          
        `;
    }
    return galerey + '</tbody></table>';
}

function getGaleryData(value) {
    return getDataByRequest(value);
}

function getDataByRequest(url) {

    var xhr = new XMLHttpRequest();

    if (isSet(arguments[1])) {
        xhr.open(arguments[1], url, false)
    } else {
        xhr.open('GET', url, false);
    }

    xhr.setRequestHeader("content-type", "application/json");
    if (isSet(arguments[2])) {
        // alert(arguments[2]);
        xhr.send(arguments[2]);
    } else {
        // alert(isSet(arguments[2]));
        xhr.send();
    }

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


