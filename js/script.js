
import { myscholorship } from "./scholorshippdf.js"

document.addEventListener('DOMContentLoaded', function () {
    // Adding new scholarships
    // addScholarship('Name', 'Country', "class", 'startdate', 'enddate', "Description",['links']);
    let scholarshipdeatils = myscholorship.map((schol) => {
        schol = addScholarship(schol.name, schol.Country, schol.class, schol.desc, schol.enddate, schol.desc, schol.links);
    });




    // NavBar for small device
    document.getElementById('menu').addEventListener('click', function () {
        document.querySelector('.navbar').style.display = 'flex';
        document.getElementById('menu').style.display = 'none';
        document.getElementById('close').style.display = 'flex';
        document.querySelector('.navbar').classList.add('slideIn');
    });
    
    document.getElementById('close').addEventListener('click', function () {
        document.querySelector('.navbar').style.display = 'none';
        document.getElementById('menu').style.display = 'flex';
        document.getElementById('close').style.display = 'none';
    });
    
    const scholarships = document.querySelectorAll('.scholarship');
    scholarships.forEach((scholarship, index) => {
        scholarship.style.setProperty('--i', index + 1);
        scholarship.addEventListener('click', () => {
            scholarship.classList.add('expanded');
        });
    });
    

    // Showing Menu accroding to Scrolling
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Search functionality
    const searchbar = document.getElementById('searchbar');
    searchbar.addEventListener('input', function () {
        const filter = searchbar.value.toLowerCase();
        const scholarships = document.querySelectorAll('.scholarship');
        const scholarship_temp = document.querySelector("#scholarship-template");

        scholarships.forEach(scholarship => {
            const country = scholarship.querySelector('.country').textContent.toLowerCase();
            if (country.indexOf(filter) !== -1) {
                scholarship.style.display = '';
                scholarship_temp.style.display = "none";
            } else {
                scholarship.style.display = 'none';
                scholarship_temp.style.display = "none";
            }
        });

        // Remove empty scholarships
        if (filter === '') {
            scholarships.forEach(scholarship => {
                const name = scholarship.querySelector('.name').textContent.trim();
                const country = scholarship.querySelector('.country').textContent.trim();
                const classValue = scholarship.querySelector('.class').textContent.trim();
                const startDate = scholarship.querySelector('.Startingdate').textContent.trim();
                const endDate = scholarship.querySelector('.Enddate').textContent.trim();
                const description = scholarship.querySelector('.description').textContent.trim();

                if (name !== '' && country !== '' && classValue !== '' && startDate !== '' && endDate !== '' && description !== '') {
                    scholarship.style.display = 'block';
                } else {
                    scholarship.style.display = 'none';
                }
            });
        }
    });
});

function addScholarship(name, country, classValue, startDate, endDate, description, linkUrls) {
    // Clone the template
    const template = document.querySelector('#scholarship-template');
    const newScholarship = template.cloneNode(true);

    // Remove the id from the cloned node and make it visible
    newScholarship.id = '';
    newScholarship.style.display = 'block';

    // Populate the cloned node with the provided data
    newScholarship.querySelector('.name').textContent = `${name}`;
    newScholarship.querySelector('.country').textContent = `Country: ${country}`;
    newScholarship.querySelector('.class').textContent = `Class: ${classValue}`;
    newScholarship.querySelector('.Startingdate').textContent = `Starting_date: ${startDate}`;
    newScholarship.querySelector('.Enddate').textContent = `End_date: ${endDate}`;
    newScholarship.querySelector('.description').textContent = `Description: ${description}`;

    // Clear existing links
    const linksContainer = newScholarship.querySelector('.links');
    linksContainer.innerHTML = '';

    // Add each link
    linkUrls.forEach(linkUrl => {
        const linkElement = document.createElement('div');
        linkElement.classList.add('link');
        linkElement.innerHTML = `<a href="${linkUrl}" target="_blank" class="link-url">${linkUrl}</a>`;
        linksContainer.appendChild(linkElement);
    });

    // Append the new scholarship to the container only if it has valid data
    if (name && country && classValue && startDate && endDate && description) {
        document.querySelector('.scholarshipcont2').appendChild(newScholarship);

        // Attach click event listener for expanding and collapsing
        newScholarship.addEventListener('click', function () {
            newScholarship.classList.add('expanded');
            newScholarship.querySelector('.close-btn').style.display = 'flex';
        });

        // Attach click event listener for close button
        newScholarship.querySelector('.close-btn').addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent triggering the parent click event
            newScholarship.classList.remove('expanded');
            newScholarship.querySelector('.close-btn').style.display = 'none';
        });
    };
}

