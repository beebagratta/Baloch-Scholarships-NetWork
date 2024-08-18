import { myScholarships } from "./Scholarships.js";

document.addEventListener('DOMContentLoaded', function () {
    const scholarshipsContainer = document.querySelector('.scholarship_cont');
    const searchbar = document.getElementById('searchbar');
    let filteredByCountry = [];
    console.log(myScholarships.length)


    // Function to search for a country
    function searchCountry() {
        let typingTimer;                // Timer identifier
        const heroSection=document.querySelector(".heroSection");
        const mainContent=document.querySelector("main");
        const doneTypingInterval = 500; // Time in ms (0.5 seconds)
        
        searchbar.addEventListener('input', function () {
            if(searchbar.value===""){
                heroSection.style.display="flex";
                mainContent.style.overflow="hidden";
            }else if(searchbar.value !==""){
                heroSection.style.display="none";
                mainContent.style.overflow="scroll";
            }
            clearTimeout(typingTimer);  // Clear the timer on every input
            typingTimer = setTimeout(() => {
                const filter = searchbar.value.toLowerCase().trim(); // Get the trimmed value
                const scholarships = document.querySelectorAll('.scholarship-card');
                let matchedCountry = false;

                // Reset the filtered list
                filteredByCountry = [];

                scholarships.forEach(scholarship => {
                    const country = scholarship.querySelector('.country').textContent.toLowerCase().replace('country: ', '');

                    // Show scholarships only if the input exactly matches a country name
                    if (filter === country) {
                        scholarship.style.display = 'block';
                        filteredByCountry.push(scholarship); // Add to the filtered list
                        matchedCountry = true;
                    } else {
                        scholarship.style.display = 'none';
                    }
                });

                // If no exact match is found or input is empty, hide all cards
                if (!matchedCountry || filter === "") {
                    scholarships.forEach(scholarship => {
                        scholarship.style.display = 'none';
                    });
                    filteredByCountry = []; // Clear the filter
                }
            }, doneTypingInterval);  // Set the delay to execute after typing stops
        });
        
    }

    // Function for class selection
    function classSelector() {
        const selectClass = document.getElementById('selectClass');
        selectClass.addEventListener("click",()=>{
            if(searchbar.value===""){
                alert("Search for a country.")
            } else if(searchbar.value !==""){
                selectClass.addEventListener('input', function () {
                    const selectedClass = selectClass.value.toLowerCase();
        
                    // Use the filtered list of scholarships based on the country
                    filteredByCountry.forEach(scholarship => {
                        const scholarshipClasses = scholarship.querySelector('.class').textContent.split(': ')[1].toLowerCase().split(', ');
                        const inputValue = scholarshipClasses.value
                        if (selectedClass === 'all' || scholarshipClasses.includes(selectedClass)) {
                            scholarship.style.display = 'block';
                        } else {
                            scholarship.style.display = 'none';
                        }
                    });
        
                    // If no class is selected (i.e., 'all'), reset to country filter
                    if (selectedClass === 'all') {
                        filteredByCountry.forEach(scholarship => {
                            scholarship.style.display = 'block';
                        });
                    }
                });
            }
        })
        // Filter scholarships based on selected class
        



    }

    // Function to show popup
    function showPopup(scholarship) {
        const popup = document.createElement('div');
        popup.style.display = "none";
        popup.classList.add('popup');
        const overlay = document.querySelector(".overlay");
        const mainContent = document.querySelector("main");
        scholarshipsContainer.addEventListener("click", () => {
            popup.style.display = "flex";
            overlay.style.display = "flex";
        });

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

    // Function to hide default template
    function HideTemplete() {
        const templete = document.querySelectorAll(".templete");
        templete.forEach(temp => { temp.style.display = "none"; });
    }

    // Function for Navbar functionality
    function Navbar() {
        // NavBar for small devices
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
    }

    // Hide all cards initially
    function hideAllCards() {
        const scholarships = document.querySelectorAll('.scholarship-card');
        scholarships.forEach(scholarship => {
            scholarship.style.display = 'none';
        });
    };
    function addScholarship(scholarship) {
        const card = document.createElement('div');
        card.classList.add('scholarship-card');

        // Add name, country, and class to the card
        card.innerHTML = `
            <div class="name">${scholarship.name}</div>
            <div class="country">Country: ${scholarship.Country}</div>
            <div class="class">Class: ${scholarship.class}</div>
        `;

        // Initially hide the card
        card.style.display = 'none';

        // Append card to the container
        scholarshipsContainer.appendChild(card);

        // Add event listener to show popup
        card.addEventListener('click', () => {
            showPopup(scholarship);
        });
    }

    // Call functions
    hideAllCards();
    Navbar();
    classSelector();
    searchCountry();
    HideTemplete();

    // Load all scholarships
    myScholarships.forEach(addScholarship);
});
