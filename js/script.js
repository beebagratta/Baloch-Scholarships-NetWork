import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Run the code once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to elements in the HTML for scholarship container and overlay
    const scholarshipsContainer = document.querySelector(".scholarship_cont");
    const overlay = document.querySelector(".overlay");
    const searchbar = document.getElementById("searchbar");
    const currentMonthMessage = document.querySelector(".current-month-message");

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
                <p><strong>Levels:</strong> ${scholarship.Levels}</p>
                <p><strong>Start Date:</strong> ${scholarship.StartDate}</p>
                <p><strong>End Date:</strong> ${scholarship.EndDate}</p>
                <p><strong>Fields:</strong> ${scholarship.Fields}</p>
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
    function displayScholarship(scholarship) {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
            <div class="name">${scholarship.Name}</div>
            <div class="country"><strong>Country:</strong> ${scholarship.Country}</div>
            <div class="class"><strong>Class:</strong> ${scholarship.Levels}</div>
            <div class="startDate"><strong>Start Date:</strong> ${scholarship.StartDate}</div>
            <div class="endDate"><strong>Enddate:</strong> ${scholarship.EndDate}</div>
        `;
        newDiv.classList.add("scholarship-card");
        newDiv.setAttribute("data-country", scholarship.Country);
        scholarshipsContainer.append(newDiv);
        newDiv.addEventListener("click", () => showPopup(scholarship));
    }

    // Load scholarships from Firestore
    async function loadScholarships() {
        try {
            const querySnapshot = await getDocs(collection(db, "scholarships"));
            scholarshipsContainer.innerHTML = ''; // Clear existing scholarships

            querySnapshot.forEach((doc) => {
                const scholarship = doc.data();
                displayScholarship(scholarship);
            });
        } catch (e) {
            console.error("Error retrieving scholarships: ", e.message);
        }
    }

    function getCurrentMonth() {
        const currentDate = new Date();
        return currentDate.getMonth() + 1; // Returns the current month as a number (1 for January, 12 for December)
    }
    
    
    function filterScholarships() {
        const currentMonth = getCurrentMonth(); // Returns current month as a number (e.g., 4 for April)
        const searchQuery = searchbar.value.trim().toLowerCase();
        let filteredByMonth = false;
    
        const scholarshipCards = document.querySelectorAll('.scholarship-card');
    
        // If search bar is empty, filter scholarships by the current month
        if (searchQuery === "") {
            scholarshipCards.forEach(card => {
                const startDateStr = card.querySelector('.startDate')?.textContent || "";
                const endDateStr = card.querySelector('.endDate')?.textContent || "";
    
                // Parse start and end dates (day/month format)
                const [startDay, startMonth] = startDateStr.split("/").map(Number);
                const [endDay, endMonth] = endDateStr.split("/").map(Number);
    
                // Filter scholarships that are ongoing in the current month
                if (startMonth <= currentMonth && endMonth >= currentMonth) {
                    card.style.display = 'block';
                    filteredByMonth = true;
                } else {
                    card.style.display = 'none';
                }
            });
    
            // Show the "Current Month Scholarships" message
            currentMonthMessage.textContent = "Ongoing Scholarships";
            currentMonthMessage.style.display = filteredByMonth ? 'block' : 'none';
        } else {
            // If search bar has a value, filter scholarships by country
            scholarshipCards.forEach(card => {
                const country = card.getAttribute("data-country").toLowerCase();
                card.style.display = country.includes(searchQuery) ? 'block' : 'none'; // Show scholarships that match the search query
            });
    
            // Hide the "Current Month Scholarships" message when searching
            currentMonthMessage.style.display = 'none';
        }
    }
    
    
    // Run filterScholarships on search input
    searchbar.addEventListener('input', filterScholarships);

    // Load scholarships and set up event listeners
    loadScholarships().then(() => {
        filterScholarships(); // Call filterScholarships to show current month scholarships by default
    });
});