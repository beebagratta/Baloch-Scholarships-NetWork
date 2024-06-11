const searchbar=document.querySelector('#searchbar').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    const scholarships = document.querySelectorAll('.scholarship');

    scholarships.forEach(function (div) {
        const countryName = div.querySelector('.country').value.toLowerCase();
        const scholarshipcont2=document.querySelector(".scholarshipcont2")
        if (searchQuery === "") {
            div.style.display = 'none';
            scholarshipcont2.style.display = 'none';
        } else if (countryName.includes(searchQuery)) {
            div.style.display = 'block';
            scholarshipcont2.style.display = 'block';
        } else {
            div.style.display = 'none';
            scholarshipcont2.style.display = 'none';
        }
    });
});

const scholarshipBoxes = document.querySelectorAll('.scholarship');
const clickname = document.querySelector('.clickname');
const clickcountry = document.querySelector('.clickcountry');
const clickclass = document.querySelector('.clickclass');
const clickstarting = document.querySelector('.clickstarting');
const clickend = document.querySelector('.clickend');
const clickdesc = document.querySelector('.clickdesc');
const clicklink = document.querySelector('.clicklink');
scholarshipBoxes.forEach(box => {
    box.addEventListener('click', function () {
        const name = this.querySelector('.name').textContent.replace('Name : ', '');
        const country = this.querySelector('.country').value;
        const classValue = this.querySelector('.class').value;
        const startingDate = this.querySelector('.Startingdate').textContent.replace('Starting_date : ', '');
        const endDate = this.querySelector('.Enddate').textContent.replace('End_date : ', '');
        const description = this.querySelector('.description').textContent.replace('Description : ', '');
        const linkUrl = this.querySelector('.link a').href;

        clickname.textContent = `Name: ${name}`;
        clickcountry.textContent = `Country: ${country}`;
        clickclass.textContent = `Class: ${classValue}`;
        clickstarting.textContent = `Start Date: ${startingDate}`;
        clickend.textContent = `End Date: ${endDate}`;
        clickdesc.textContent = description;
        clicklink.textContent = 'Click here for more info';
        clicklink.href = linkUrl;
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById('menu');
    const navUl = document.querySelector('header nav ul');

    menuIcon.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
});
