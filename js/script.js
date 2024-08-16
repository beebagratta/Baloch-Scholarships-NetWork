import { myScholarships } from "./Scholarships.js";

document.addEventListener('DOMContentLoaded', function () {
    const scholarshipsContainer = document.querySelector('.scholarship_cont');
    document.getElementById('menu').addEventListener('click', function () {
        document.querySelector('header').classList.add('nav-open');
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
    const searchbar = document.getElementById('searchbar');
    searchbar.addEventListener('input', function() {
        const filter = searchbar.value.toLowerCase();
        const scholarships = document.querySelectorAll('.scholarship-card');
        
        scholarships.forEach(scholarship => {
            const country = scholarship.querySelector('.country').textContent.toLowerCase();
            const templete=document.querySelectorAll(".templete")
            if (country.includes(filter)) {
                scholarship.style.display = 'block';
            } else {
                scholarship.style.display = 'none';
            }
            templete.forEach(temp=>{
                temp.style.display="none";
            })
        });
        
    });
    

    // Function to create the scholarship card
    function addScholarship(scholarship) {
        const card = document.createElement('div');
        card.classList.add('scholarship-card');

        // Add name, country, and class to the card
        card.innerHTML = `
            <div class="name">${scholarship.name}</div>
            <div class="country">Country: ${scholarship.Country}</div>
            <div class="class">Class: ${scholarship.class}</div>
        `;

        // Append card to the container
        scholarshipsContainer.appendChild(card);

        // Add event listener to show popup
        card.addEventListener('click', () => {
            showPopup(scholarship);
        });
    }



    // Function to show popup
    function showPopup(scholarship) {
        const popup = document.createElement('div');
        popup.style.display = "none";
        popup.classList.add('popup');
        const overlay = document.querySelector(".overlay");
        const mainContent = document.querySelector("main");
        scholarshipsContainer.addEventListener("click", () => {
            popup.style.display = "flex"
            overlay.style.display = "flex";
        })

        popup.innerHTML = `
            <div class="popup-content">
                <button class="close-popup">&times;</button>
                <h2>${scholarship.name}</h2>
                <p><strong>Country:</strong> ${scholarship.Country}</p>
                <p><strong>Class:</strong> ${scholarship.class}</p>
                <p><strong>Start Date:</strong> ${scholarship.startdate}</p>
                <p><strong>End Date:</strong> ${scholarship.enddate}</p>
                <p><strong>Description:</strong> ${scholarship.desc}</p>
                <div class="links">
                    <strong>Links:</strong>
                    ${scholarship.links.map(link => `<p><a href="${link}" target="_blank">${link}</a></p>`).join('')}
                </div>
            </div>
        `;

        // Add event listener to close popup
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
            overlay.style.display = "none";
        });

        // Append popup to the body
        document.body.appendChild(popup);
    }

    // Load all scholarships
    myScholarships.forEach(addScholarship);
});
