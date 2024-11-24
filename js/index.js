var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var updateBtn = document.getElementById("updateBtn");
var submitBtn = document.getElementById("submitBtn");

var bookmarkContainer = [];

if (localStorage.getItem("bookmarks") !== null) {
  bookmarkContainer = JSON.parse(localStorage.getItem("bookmarks"));
  display();
}

function addBookmark() {
    if (validateFields(siteName) && validateFields(siteURL) ) {
        var bookmark = {
            name: siteName.value,
            url: siteURL.value,
          };
          bookmarkContainer.push(bookmark);
          console.log(bookmarkContainer);
          display();
          localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));
          clearFields();
    }



 
}

function clearFields() {
  siteName.value = null;
  siteURL.value = null;

  siteName.classList.remove('is-valid');
  siteURL.classList.remove('is-valid');

}

function display() {
  var content = "";
  for (var i = 0; i < bookmarkContainer.length; i++) {
    content += `<tr>
      <td>${i + 1}</td>
            <td>${bookmarkContainer[i].name}</td>
            <td>
              <button class="btn btn-success">
                <a target="_blank" href="${
                  bookmarkContainer[i].url
                }" class="text-decoration-none text-light">
                  <i class="fa-solid fa-eye pe-2"></i>
                  Visit
                </a>
              </button>
            </td>
            <td>
              <button class="btn btn-danger pe-2 text-light" onclick="deleteBookmark(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </td>
            <td>
              <button class="btn btn-warning pe-2 text-light"  onclick="setFieldsForUpdate(${i})">
              <i class="fa-solid fa-gear"></i>                
                Update
              </button>
            </td>
        </tr>`;
  }
  document.getElementById("tableContent").innerHTML = content;
}

function deleteBookmark(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        bookmarkContainer.splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));
        display();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

var updateIndex;

function setFieldsForUpdate(index) {
  updateIndex = index;
  siteName.value = bookmarkContainer[index].name;
  siteURL.value = bookmarkContainer[index].url;
  validateFields(siteName);
  validateFields(siteURL);
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateFields() {
    if (validateFields(siteName) && validateFields(siteURL) ) {
  bookmarkContainer[updateIndex].name = siteName.value;
  bookmarkContainer[updateIndex].url = siteURL.value;
  display();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));

  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  clearFields();
    }
}

function validateFields(ele) {
  var regex = {
    bookmarkName: /^[A-z]{3,10}( [A-z]{1,10}){0,1}$/,
    bookmarkURL:
     /^https:\/\/www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+\/?$/
  };
  if (regex[ele.id].test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
    ele.nextElementSibling.classList.add("d-none");

    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    ele.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
