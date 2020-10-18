var selectedSort;
var producer__input;
var name__input;
var short__descript__input;
var keys = []
var new__sort = [];
var sortValue;
function my__function__how__many() {
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("text");
  if (checkBox.checked == true) {

    text.style.display = "block";
    document.getElementById("text").textContent = "У нас є в наявності є " + keys.length + " книжок)))";

  } else {
    text.style.display = "none";

  }
}

function filter__sheck() {
  var sortFilter = document.getElementById('sortFilter');
  var checkBox = document.getElementById("myCheck3");

  if (sortFilter.value === 'ua' && checkBox.checked == true) {
    selectedSort = "Ukrain";
    alert(sortFilter.value);
    loadFirebaseToSortedByDESC();
  } else if (sortFilter.value === 'pl' && checkBox.checked == true) {
    selectedSort = "Poland";
    alert(sortFilter.value);
    loadFirebaseToFilter();
  } else if (sortFilter.value === 'jp' && checkBox.checked == true) {
    selectedSort = "Japan";
    alert(sortFilter.value);
    loadFirebaseToFilter();

  } else if (sortFilter.value === 'usa' && checkBox.checked == true) {
    selectedSort = "USA";
    alert(sortFilter.value);
    loadFirebaseToFilter();

  } else {
    loadFirebase();
  }




}

function sort__check() {
  let sortFilter = document.getElementById('sort_list');
  let checkBox = document.getElementById("myCheck4");

  if (sortFilter.value === 'asc' && checkBox.checked == true) {

    alert(sortFilter.value);
    loadFirebaseToSortedByASC();

  } else if (sortFilter.value === 'desc' && checkBox.checked == true) {

    alert(sortFilter.value);
    loadFirebaseToSortedByDESC();

  } else {
    loadFirebase();
  }




}


function my__function__search() {

  var checkBox = document.getElementById("myCheck2");

  if (checkBox.checked == true) {
    loadFirebaseTosearch();

  } else {
    loadFirebase();
  }
}

function setup() {

 
  firebase.initializeApp(config);
  database = firebase.database();


  producer__input = select('#producer');

  name__input = select('#name');
  short__descript__input = select('#short__descript');


  var submit = select('#submit');

  submit.mousePressed(sendToFirebase);


  loadFirebase();

}



const clearInput = () => {
  producer__input.value = '';
  producer__imp.value = '';
  short__descript__imp.value = ''
};

function loadFirebase() {
  var ref = database.ref("Books");
  ref.on("value", gotData, errData);
  ref.orderByChild("name").once('value', function (snapshot) {
    console.log(snapshot.val());
  });


}

function loadFirebaseTosearch() {
  var ref = database.ref("Books");
  ref.on("value", searchData, errData);


}
function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}


function gotData(data) {

  var books = data.val();

  keys = Object.keys(data.val());
  let innerItem = '';
  const contactsHtmlWrapper = document.getElementById('books');

  keys.forEach((book, index) => {
    key = keys[index];
    book = books[key];


    innerItem += `
        <li class="main-card-item">
            <a href="#">
                <div class="card-info">
                    <div class="card-id">
                        ${index + 1}
                    </div>
                    <div class="card-first-name">
                        ${book.name}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-last-name">
                        ${book.producer}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-phone-number">
                    ${book.short__descript}
                    </div>
                </div>
                
                <div class="card-button-wrapper">
                    <button id="btnEdit" onclick="editContact(${index})" type="button" class="card-btn">
                        Edit
                    </button>
                    <button id="btnDelete" onclick="clearList(${index})"  type="button" class="card-btn btn-delete">
                        Delete
                    </button>
                </div>
            </a>
        </li>
    `;

  });

  contactsHtmlWrapper.innerHTML = innerItem;
}




function editContact(index) {
  key = keys[index]


  firebase.database().ref("Books/" + key).set({
    name: name__input.value(),
    producer: producer__input.value(),
    short__descript: short__descript__input.value()
  });


  console.log(producer__input.value())

  loadFirebase();

}

function clearList(index) {
  console.log("Firebase generated key: " + key);
  console.log("Firebase generated key: " + index);
  key = keys[index]
  database.ref("Books/" + key).remove();
  console.log("Firebase generated key: " + keys.length);

}



function sendToFirebase() {



  var data = {
    producer: producer__input.value(),
    name: name__input.value(),
    short__descript: short__descript__input.value()
  }

  fruit = database.ref('Books').push(data, finished);
  console.log("Firebase generated key: " + fruit.key);



  function finished(err) {
    if (err) {
      console.log("ooops, something went wrong.");
      console.log(err);
    } else {
      console.log('Data saved successfully');
    }
  }
}


function searchData(data) {

  var books = data.val();

  keys = Object.keys(data.val());
  let innerItem = '';
  const contactsHtmlWrapper = document.getElementById('books');

  keys.forEach((book, index) => {
    key = keys[index];
    book = books[key];
    if (book.name == document.getElementById('searchInput').value) {
      innerItem += `
        <li class="main-card-item">
            <a href="#">
                <div class="card-info">
                    <div class="card-id">
                        
                    </div>
                    <div class="card-first-name">
                        ${book.name}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-last-name">
                        ${book.producer}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-phone-number">
                    ${book.short__descript}
                    </div>
                </div>
                
                <div class="card-button-wrapper">
                    <button id="btnEdit" onclick="editContact(${index})" type="button" class="card-btn">
                        Edit
                    </button>
                    <button id="btnDelete" onclick="clearList(${index})"  type="button" class="card-btn btn-delete">
                        Delete
                    </button>
                </div>
            </a>
        </li>
    `;
    }

  });

  contactsHtmlWrapper.innerHTML = innerItem;
}



function sortData(data) {

  var books = data.val();
  keys = Object.keys(data.val());
  let innerItem = '';
  const contactsHtmlWrapper = document.getElementById('books');

  keys.forEach((book, index) => {
    key = keys[index];
    book = books[key];
    if (book.producer == selectedSort) {
      innerItem += `
        <li class="main-card-item">
            <a href="#">
                <div class="card-info">
                    <div class="card-id">
                      
                    </div>
                    <div class="card-first-name">
                        ${book.name}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-last-name">
                        ${book.producer}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-phone-number">
                    ${book.short__descript}
                    </div>
                </div>
                
                <div class="card-button-wrapper">
                    <button id="btnEdit" onclick="editContact(${index})" type="button" class="card-btn">
                        Edit
                    </button>
                    <button id="btnDelete" onclick="clearList(${index})"  type="button" class="card-btn btn-delete">
                        Delete
                    </button>
                </div>
            </a>
        </li>
    `;
    }

  });

  contactsHtmlWrapper.innerHTML = innerItem;
}
function loadFirebaseToFilter() {
  var ref = database.ref("Books");
  ref.on("value", sortData, errData);


}
function loadFirebaseToSortedByDESC() {
  var ref = database.ref("Books");
  ref.on("value", sortedDataByDESC, errData);


}


function loadFirebaseToSortedByASC() {
  var ref = database.ref("Books");
  ref.on("value", sortedDataByASC, errData);


}


function sortedDataByASC(data) {

  var books = data.val();

  keys = Object.keys(data.val());
  let innerItem = '';
  const contactsHtmlWrapper = document.getElementById('books');


  var sortBook = [];
  function bubble_Sort(a) {
    var swapp;
    var n = a.length - 1;
    var x = a;
    do {
      swapp = false;
      for (var i = 0; i < n; i++) {
        if (x[i].name < x[i + 1].name) {
          var temp = x[i];
          x[i] = x[i + 1];
          x[i + 1] = temp;
          swapp = true;
        }
      }
      n--;
    } while (swapp);
    return x;
  }
  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    book = books[key];
    sortBook.push(book);
  }
  console.log(bubble_Sort(sortBook)[1]);
  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    let test = bubble_Sort(sortBook)[i]
    console.log(test.name);





    innerItem += `
        <li class="main-card-item">
            <a href="#">
                <div class="card-info">
                    <div class="card-id">
                     
                    </div>
                    <div class="card-first-name">
                        ${test.name}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-last-name">
                        ${test.producer}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-phone-number">
                    ${test.short__descript}
                    </div>
                </div>
                
                <div class="card-button-wrapper">
                    <button id="btnEdit" onclick="editContact(${i})" type="button" class="card-btn">
                        Edit
                    </button>
                    <button id="btnDelete" onclick="clearList(${i})"  type="button" class="card-btn btn-delete">
                        Delete
                    </button>
                </div>
            </a>
        </li>
    `;



  }
  contactsHtmlWrapper.innerHTML = innerItem;
}




function sortedDataByDESC(data) {

  var books = data.val();

  keys = Object.keys(data.val());
  let innerItem = '';
  const contactsHtmlWrapper = document.getElementById('books');


  var sortBook = [];
  function bubble_Sort(a) {
    var swapp;
    var n = a.length - 1;
    var x = a;
    do {
      swapp = false;
      for (var i = 0; i < n; i++) {
        if (x[i].name > x[i + 1].name) {
          var temp = x[i];
          x[i] = x[i + 1];
          x[i + 1] = temp;
          swapp = true;
        }
      }
      n--;
    } while (swapp);
    return x;
  }
  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    book = books[key];
    sortBook.push(book);
  }
  console.log(bubble_Sort(sortBook)[1]);
  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    let test = bubble_Sort(sortBook)[i]
    console.log(test.name);





    innerItem += `
        <li class="main-card-item">
            <a href="#">
                <div class="card-info">
                    <div class="card-id">
                        
                    </div>
                    <div class="card-first-name">
                        ${test.name}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-last-name">
                        ${test.producer}
                    </div>
                    <span class="card-line"></span>
                    <div class="card-phone-number">
                    ${test.short__descript}
                    </div>
                </div>
                
                <div class="card-button-wrapper">
                    <button id="btnEdit" onclick="editContact(${i})" type="button" class="card-btn">
                        Edit
                    </button>
                    <button id="btnDelete" onclick="clearList(${i})"  type="button" class="card-btn btn-delete">
                        Delete
                    </button>
                </div>
            </a>
        </li>
    `;



  }
  contactsHtmlWrapper.innerHTML = innerItem;
}


function sort__sheck() {
  var sort = document.getElementById('sort');
  var checkBox = document.getElementById("myCheck3");

  if (sort.value === 'asc' && checkBox.checked == true) {
    sortValue = sort.value;
    loadFirebaseToSorted();
  } else if (sort.value === 'desc' && checkBox.checked == true) {
    sortValue = sort.value;
    loadFirebaseToSorted();

  } else {
    loadFirebase();
  }




}