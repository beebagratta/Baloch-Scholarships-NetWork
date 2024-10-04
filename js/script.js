import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { uniqueScholarships } from './Scholarships.js'; // Adjust the path as necessary

// Run the code once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to elements in the HTML for scholarship container and overlay
    const scholarshipsContainer = document.querySelector(".scholarship_cont");
    const overlay = document.querySelector(".overlay");

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
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <button class="close-popup">&times;</button>
                <h2>${scholarship.Name}</h2>
                <p><strong>Country:</strong> ${scholarship.Country}</p>
                <p><strong>Class:</strong> ${scholarship.Class}</p>
                <p><strong>Start Date:</strong> ${scholarship.StartDate}</p>
                <p><strong>End Date:</strong> ${scholarship.EndDate}</p>
                <p><strong>Description:</strong> ${scholarship.Description}</p>
                <a href="${scholarship.Link}" target="_blank">Apply Here</a>
            </div>
        `;

        popup.style.display = "flex";
        overlay.style.display = "flex";

        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
            overlay.style.display = "none";
        });

        document.body.appendChild(popup);
    }

    // Function to display a single scholarship card
    function displayScholarship(scholarship, id) {
        const newdiv = document.createElement("div");
        newdiv.innerHTML = `
            <div class="name">${scholarship.Name}</div>
            <div class="country"><strong>Country:</strong> ${scholarship.Country}</div>
            <div class="class"><strong>Class:</strong> ${scholarship.Class}</div>
        `;
        newdiv.classList.add("scholarship-card");
        newdiv.setAttribute("data-country", scholarship.Country);
        scholarshipsContainer.append(newdiv);
        newdiv.addEventListener("click", () => showPopup(scholarship));
    }

    // Load scholarships from Firestore
    async function loadScholarships() {
        try {
            const querySnapshot = await getDocs(collection(db, "scholarships"));
            scholarshipsContainer.innerHTML = ''; // Clear existing scholarships

            querySnapshot.forEach((doc) => {
                const scholarship = doc.data();
                displayScholarship(scholarship, doc.id);
            });
        } catch (e) {
            console.error("Error retrieving scholarships: ", e.message);
        }
    }

    // Function to filter scholarships by class
    function filterByClass() {
        const selectClass = document.getElementById("selectClass");
        selectClass.addEventListener("change", () => {
            const selectedClass = selectClass.value;
            const scholarshipCards = document.querySelectorAll('.scholarship-card');

            scholarshipCards.forEach(card => {
                const cardClass = card.querySelector('.class').textContent.split(': ')[1];
                // Show card if the class matches the selected class or if 'All' is selected
                if (selectedClass === "all" || cardClass === selectedClass) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Function to search scholarships by country
    function searchScholarships() {
        const searchbar = document.getElementById("searchbar");
        searchbar.addEventListener('input', () => {
            const searchTerm = searchbar.value.toLowerCase(); // Get the search term
            const scholarshipCards = document.querySelectorAll('.scholarship-card');

            scholarshipCards.forEach(card => {
                const cardCountry = card.querySelector('.country').textContent.toLowerCase();
                // Show card if the country matches the search term
                if (cardCountry.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Function to add scholarships to Firestore using the scholarship name as the document ID
    async function addScholarshipsToFirestore(scholarships) {
        try {
            for (const scholarship of scholarships) {
                await setDoc(doc(db, "scholarships", scholarship.name), {
                    Name: scholarship.name,
                    Country: scholarship.Country,
                    Class: scholarship.class,
                    StartDate: scholarship.startdate,
                    EndDate: scholarship.enddate,
                    Description: scholarship.desc,
                    Link: scholarship.links,
                });
                console.log(`Added scholarship with ID (name): ${scholarship.name}`);
            }
            console.log("All scholarships added successfully.");
        } catch (error) {
            console.error("Error adding scholarships: ", error.message);
        }
    }

    // Call the function to add scholarships to Firestore
    addScholarshipsToFirestore(uniqueScholarships);

    // Call loadScholarships and set up event listeners
    loadScholarships().then(() => {
        filterByClass(); // Add the filtering functionality
        searchScholarships(); // Add the search functionality
    });
});
