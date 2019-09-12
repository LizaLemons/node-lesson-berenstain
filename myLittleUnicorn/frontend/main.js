// FE: run `http-server` & navigate to localhost:8080
// the FE makes ajax requests to the BE (localhost:3000)



window.onload = function(){
  /*
       \
        \
       /.(((
      (,/"(((__,--.
          \  ) _( /{
          !|| " :||
          !||   :||

    ~ mY liTTlE uNiCoRn! ~
 */

  // get the elements:
  var allDiv = document.getElementById('all-div');
  var addDiv = document.getElementById('add-div');
  var findDiv = document.getElementById('find-div');
  var deleteDiv = document.getElementById('delete-div');
  var updateDiv = document.getElementById('update-div');

  // hide upon load:
  allDiv.style.display = 'none';
  addDiv.style.display = 'none';
  findDiv.style.display = 'none';
  deleteDiv.style.display = 'none';
  updateDiv.style.display = 'none';

  // the URL of our backend to use in our AJAX calls:
  var url = 'http://localhost:3000';

  /* Go! button */
  document.getElementById('go-button').addEventListener('click', function(){
    // get val of radios:
    var chosenRadio = document.querySelector('.unicorns-radios:checked');
    if (chosenRadio.value == 'see-all') { // see all
      // show the el
      allDiv.style.display = 'block';
      // get all
      $.ajax({
        url: url + '/unicorns',
        dataType: 'json'
      }).done(function(response){
        console.log("response: ", response);

        /* Loop & append to DOM: */
        var unicornsList = document.getElementById('unicorns-list');
        // remove existing li's first
        unicornsList.innerHTML = '';
        for (var i = 0; i < response.length; i++) {
          var liText = 'Name: ' + response[i].name + ' | Tail color: ' + response[i].tailColor;
          var theLi = document.createElement('li');
          theLi.appendChild(document.createTextNode(liText));
          unicornsList.appendChild(theLi);
        }
      });
    } else if (chosenRadio.value == 'add-new') { // add new
      // show add new inputs
      addDiv.style.display = 'block';

      // hide the rest
      findDiv.style.display = 'none';
      deleteDiv.style.display = 'none';
      updateDiv.style.display = 'none';
      allDiv.style.display = 'none';

    } else if (chosenRadio.value == 'find-by-name') { // find
      // show find name input
      findDiv.style.display = 'block';

      // hide the rest
      addDiv.style.display = 'none';
      deleteDiv.style.display = 'none';
      updateDiv.style.display = 'none';
      allDiv.style.display = 'none';

    } else if(chosenRadio.value == 'delete-by-name') { // delete
      // show delete name input
      deleteDiv.style.display = 'block';

      // hide the rest
      addDiv.style.display = 'none';
      findDiv.style.display = 'none';
      updateDiv.style.display = 'none';
      allDiv.style.display = 'none';

    } else if(chosenRadio.value == 'update-by-name') { // update
      // show update name input
      updateDiv.style.display = 'block';

      // hide the rest
      addDiv.style.display = 'none';
      findDiv.style.display = 'none';
      deleteDiv.style.display = 'none';
      allDiv.style.display = 'none';
    }
  }); // end submit btn fxn

  /* 'add new' button */
  document.getElementById('add-unicorn-button').addEventListener('click', function() {
    var newName = document.getElementById('add-new-name').value.toLowerCase();
    var tailColor = document.getElementById('add-new-tail').value.toLowerCase();

    var data = {
      name: newName,
      tailColor: tailColor
    };
    // post:
    $.ajax({
      url: url + '/unicorns/new',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log( "response: ", response );
    }); // end AJAX
  }); // end Add Button listener

  /* 'find' button */
  document.getElementById('find-unicorn-button').addEventListener('click', function() {
    var searchName = document.getElementById('find-name').value.toLowerCase();
    console.log("finding: ", searchName);
    var data = {
      name: searchName
    };
    $.ajax({
      url: url + '/unicorns/' + searchName,
      method: 'get',
      data: data,
      dataType: 'json'
    }).done(function(response){
      if (response.length){
        console.log(response);
      } else {
        console.log("none found");
      }
    }); // end ajax
  }); // end search name button listener

  /* 'delete' button */
  document.getElementById('delete-unicorn-button').addEventListener('click', function() {
    var deleteName = document.getElementById('delete-name').value.toLowerCase();
    console.log("deleting: ", deleteName);
    var data = {
      name: deleteName
    };
    $.ajax({
      url: url + '/unicorns/' + deleteName,
      dataType: 'json',
      data: data,
      method: 'delete'
    }).done(function(response){
      console.log(deleteName + " has been deleted.");
      console.log(response);
    }); // end ajax
  }); // end delete button

  /* 'update' button */
  document.getElementById('update-unicorn-button').addEventListener('click', function() {
    var nameToUpdate = document.getElementById('update-name').value.toLowerCase();
    var newName = document.getElementById('new-update-name').value.toLowerCase();
    var newTailColor = document.getElementById('new-update-tail').value.toLowerCase();
    var data = {
      name: nameToUpdate,
      newName: newName,
      newTailColor: newTailColor
    }
    $.ajax({
      url: url + '/unicorns/' + nameToUpdate,
      dataType: 'json',
      method: 'put',
      data: data
    }).done(function(response){
      console.log(response);
    }); // end ajax

  }); // end update button

}; // end window onload fxn
