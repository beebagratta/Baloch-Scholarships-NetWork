// Import the necessary Firebase modules from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Run the code once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Get references to elements in the HTML for scholarship container and overlay
    const scholarshipsContainer = document.querySelector(".scholarship_cont");
    const overlay = document.querySelector(".overlay"); // Added overlay element reference

    // Firebase configuration details for your web app
    const firebaseConfig = {
        apiKey: "AIzaSyCsVNh41ZgBVUMeoK01gaBkd0AxT57F9mo",
        authDomain: "balochscholarshipnetwork-99fd9.firebaseapp.com",
        projectId: "balochscholarshipnetwork-99fd9",
        storageBucket: "balochscholarshipnetwork-99fd9.appspot.com",
        messagingSenderId: "543212144164",
        appId: "1:543212144164:web:642a05a4b2f8ff03affab1",
        measurementId: "G-FQC5BR7H23"
      };
    // Initialize Firebase app and Firestore database
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Function to display a popup with full scholarship details when a card is clicked
    function showPopup(scholarship) {
        // Create a new div element to represent the popup
        const popup = document.createElement('div');
        popup.classList.add('popup'); // Add the 'popup' class for styling

        // Insert scholarship details inside the popup
        popup.innerHTML = `
        <div class="popup-content">
            <button class="close-popup">&times;</button> <!-- Close button -->
            <h2>${scholarship.Name}</h2>
            <p><strong>Country:</strong> ${scholarship.Country}</p>
            <p><strong>Class:</strong> ${scholarship.Class}</p>
            <p><strong>Start Date:</strong> ${scholarship.StartDate}</p>
            <p><strong>End Date:</strong> ${scholarship.EndDate}</p>
            <p><strong>Description:</strong> ${scholarship.Description}</p>
            <a href="${scholarship.Link}" target="_blank">Apply Here</a>
        </div>
    `;

        // Display the popup and overlay
        popup.style.display = "flex";
        overlay.style.display = "flex";

        // Add event listener to close the popup when the close button is clicked
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove(); // Remove the popup from the DOM
            overlay.style.display = "none"; // Hide the overlay
        });

        // Append the popup to the body so it displays over other elements
        document.body.appendChild(popup);
    }

    // Function to add a new scholarship to Firestore
    // Function to handle class filtering
    function handleClassSelector() {
        const selectClass=document.querySelector("#selectClass")
        if (!selectClass) {
            console.error("Class selector element not found");
            return;
        }

        selectClass.addEventListener('input', function () {
            const selectedClass = selectClass.value.toLowerCase();
            const scholarship_card = document.querySelectorAll('.scholarship-card');

            scholarship_card.forEach(scholarship => {
                const scholarshipClassesElement = scholarship.querySelector('.class');
                if (scholarshipClassesElement) {
                    const scholarshipClasses = scholarshipClassesElement.textContent.toLowerCase().split(', ');

                    if (selectedClass === 'all' || scholarshipClasses.includes(selectedClass)) {
                        scholarship.style.display = 'block';
                    } else {
                        scholarship.style.display = 'none';
                    }
                } else {
                    scholarship.style.display = 'none';
                }
            });

            if (selectedClass === 'all') {
                filteredByCountry.forEach(scholarship => {
                    scholarship.style.display = 'block';
                });
            }
        });
    }
    handleClassSelector()
    // Function to display a single scholarship card on the homepage
    function displayScholarship(scholarship, id) {
        // Create a new div element for the scholarship card
        const newdiv = document.createElement("div");

        // Set the inner HTML to display Name, Country, and Start Date
        newdiv.innerHTML = `
        <div class="name">${scholarship.Name}</div>
        <div class="country"><strong>Country:</strong> ${scholarship.Country}</div>
        <div class="startDate"><strong>Class:</strong> ${scholarship.Class}</div>
    `;
        // Add the 'scholarship-card' class to the div for styling
        newdiv.classList.add("scholarship-card");

        // Append the card to the scholarship container
        scholarshipsContainer.append(newdiv);

        // Add event listener to show popup when a card is clicked
        newdiv.addEventListener("click", () => showPopup(scholarship));
    }

    // Function to load all scholarships from Firestore and display them
    async function loadScholarships() {
        try {
            // Retrieve all documents from the 'scholarships' collection in Firestore
            const querySnapshot = await getDocs(collection(db, "scholarships"));

            // Loop through each document and display the scholarships
            querySnapshot.forEach((doc) => {
                const scholarship = doc.data(); // Get the scholarship data
                console.log(scholarship); // Log the scholarship data for debugging
                displayScholarship(scholarship, doc.id); // Display each scholarship
            });
        } catch (e) {
            // Handle errors if loading fails
            console.error("Error retrieving scholarships: ", e.message);
        }
    }

    // Function to handle the navbar functionality for small devices
    function Navbar() {
        // Add event listener to show the navbar when the menu icon is clicked
        document.getElementById('menu').addEventListener('click', function () {
            document.querySelector('.navbar').style.display = 'flex'; // Show navbar
            document.getElementById('menu').style.display = 'none'; // Hide menu icon
            document.getElementById('close').style.display = 'flex'; // Show close icon
            document.querySelector('.navbar').classList.add('slideIn'); // Add sliding animation
        });

        // Add event listener to hide the navbar when the close icon is clicked
        document.getElementById('close').addEventListener('click', function () {
            document.querySelector('.navbar').style.display = 'none'; // Hide navbar
            document.getElementById('menu').style.display = 'flex'; // Show menu icon
            document.getElementById('close').style.display = 'none'; // Hide close icon
        });
    }

    // Function to hide specific elements, such as templates (optional)
    function HideTemplete() {
        const templete = document.querySelectorAll(".templete");
        templete.forEach(temp => { temp.style.display = "none"; }); // Hide all template elements
    }
    HideTemplete(); // Call the function to hide templates

    // Function to filter and display scholarships by country using the search bar
    function searchCountry() {
        let typingTimer;  // Declare typingTimer to track input pauses
        const doneTypingInterval = 500; // Time in ms (0.5 seconds) to wait after typing

        // Get reference to the search bar
        const searchbar = document.querySelector("#searchbar");

        // Check if the search bar element exists
        if (!searchbar) {
            console.error("Searchbar element not found");
            return;
        }

        // Add event listener for when the user types in the search bar
        searchbar.addEventListener('input', function () {
            console.log("Searching...");

            // Reset the typing timer on each input
            clearTimeout(typingTimer);

            // Start a timer to filter scholarships once typing has stopped
            typingTimer = setTimeout(() => {
                const filter = searchbar.value.toLowerCase().trim(); // Get the user's input
                const scholarships = document.querySelectorAll('.scholarship-card'); // Get all displayed scholarships

                // Filter scholarships based on the user's input (matching the country)
                scholarships.forEach(scholarship => {
                    const country = scholarship.querySelector('.country').textContent.toLowerCase().replace('country: ', '');
                    // Show scholarships if the country matches, otherwise hide them
                    if (filter === "" || filter === country) {
                        scholarship.style.display = 'block'; // Show the card
                        HideTemplete(); // Hide any templates
                    } else {
                        scholarship.style.display = 'none'; // Hide the card
                        HideTemplete(); // Hide templates
                    }
                });

                // Optionally log if no scholarships match the search criteria
                const visibleScholarships = document.querySelectorAll('.scholarship-card[style*="display: block"]');
                if (visibleScholarships.length === 0 && filter !== "") {
                    console.log("No scholarships match the search criteria.");
                }
            }, doneTypingInterval);  // Wait before filtering after typing stops
        });
    }

    // Call searchCountry to enable search functionality
    searchCountry();

    // Call the Navbar function to add the navbar functionality
    Navbar();

    loadScholarships();
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyC') {
            event.preventDefault();
            alert("Opening Developer Tools is not allowed on this page.");
        }
    });

    // Disable right-click on the page and show an alert
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        alert("Right-clicking is disabled on this page.");
    });
});
