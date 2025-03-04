// --- Working for Uploading, Showing & deleting image --- //

// open sideBar
const toggleSideBar = () => {
    const sideBar = document.querySelector(".side_bar")
    const fileName = document.querySelector("#galleryFileName")

    if (fileName.style.whiteSpace !== "nowrap") { // already open
        sideBar.style.flex = "none"
        sideBar.style.width = "38px"
        fileName.style.whiteSpace = "nowrap"
    } else { // already close
        sideBar.style.flex = "3"
        sideBar.style.width = "280px"
        fileName.style.whiteSpace = "normal"
    }
}



// --- Working for showing & hiding image in large size --- //

// Opening Image
const openImage = (imageLink) => {
    const modal = document.getElementById("modal");
    const image = document.getElementsByClassName("photo-page-modal-content")[0];
    modal.style.display = "flex";
    image.src = imageLink;
}

// Closing Image
const closeImage = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}



// --- Working for Uploading, Showing & deleting image --- //

// Uploading Image
document.querySelector("#myFileInput").addEventListener("change", function () {

    for (i = 0; i < this.files.length; i++) {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            const newImg = {
                "_id": Math.random() * 10243,
                "imgDataUrl": reader.result
            };

            const allImages = localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")) : [];
            const newAllImages = [...allImages, newImg];

            localStorage.setItem("images", JSON.stringify(newAllImages));
            location.reload();
        });

        reader.readAsDataURL(this.files[i])
    }
})

// Showing all Images
const showAllImages = () => {
    const allImages = localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")) : []
    const totalPhotosHTML = document.querySelector("#total_photos")
    let totalImages = 0

    document.getElementById("img_box_content").innerHTML = allImages.map((img) => {
        const _id = img._id ? img._id : "no-id"
        const imgSrc = img.imgDataUrl ? img.imgDataUrl : "./img/no-photo.png"
        totalImages += 1;

        return `<div 
                    onmouseover="showCheckBox(${_id})"
                    onmouseout="hideCheckBox(${_id})"
                    class="imgNcheckbox"
                >
                    <input type="checkbox" name="image" id="${_id}" onclick="handleCheckBox(${_id})">
                    <div onClick="openImage('${imgSrc}')">
                        <img src='${imgSrc}'>
                    </div>
                </div>`
    }).join("")

    totalPhotosHTML.innerHTML = `${totalImages} Photos`
}

document.addEventListener("DOMContentLoaded", showAllImages)

// Delete Selected Images
const deleteSelectedImages = () => {
    const allImages = localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")) : [];
    const newImagesList = allImages.filter((img) => {
        const _id = img._id ? img._id : "no-id";
        return !checkedList.includes(_id);
    })

    localStorage.setItem("images", JSON.stringify(newImagesList));
    location.reload();
}



// --- Working for showing & hiding checkbox in top of the image --- //

// Showing Checkbox
const showCheckBox = (_id) => {
    const checkBox = document.getElementById(_id);
    checkBox.style.visibility = "visible";
}

// Hidding Checkbox
const hideCheckBox = (_id) => {
    const checkBox = document.getElementById(_id);
    checkBox.checked === false ? checkBox.style.visibility = "hidden" : "";
}



// --- Working for selecting multiple images using shift + click --- //
const checkedList = [];
let lastChecked;

// This function will handle shift + click behavior
function handleCheck(e) {
    var _this = this;
    var inBetween = false;

    if (e.shiftKey && this.checked) {
        var checkboxes = document.querySelectorAll('.imgNcheckbox input[type="checkbox"]');

        checkboxes.forEach(function (checkbox) {
            if (checkbox === _this || checkbox === lastChecked) {
                inBetween = !inBetween;
                console.log('Checking the boxes in between');
            }
            if (inBetween) {
                checkbox.checked = true;
                checkedList.push(parseFloat(checkbox.id));
                checkbox.style.visibility = "visible";
            }
        });
    }

    lastChecked = _this;
}

// This function will initialize event listeners for the checkboxes
function addCheckBoxListeners() {
    const checkboxes = document.querySelectorAll('.imgNcheckbox input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', handleCheck);
    });
}

// This function will handle checkbox checking and unchecking logic
const handleCheckBox = (_id) => {
    if (_id) {
        const checkBox = document.getElementById(_id);
        checkBox.checked === true ? checkedList.push(_id) : checkedList.splice(checkedList.indexOf(_id), 1);
    }
}

// calling 1 time for attach checkbox event listener
window.addEventListener('DOMContentLoaded', () => {
    addCheckBoxListeners();
})