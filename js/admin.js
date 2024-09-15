
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDthr_lCcPIt3SumqieuPrrWvDMbGjrQk0",
        authDomain: "balochscholarshipnetwork.firebaseapp.com",
        projectId: "balochscholarshipnetwork",
        storageBucket: "balochscholarshipnetwork.appspot.com",
        messagingSenderId: "13731205366",
        appId: "1:13731205366:web:73b7ffb2fb14ee23961cd7",
        measurementId: "G-ZZDQVTDFGT"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const adminScholarshipsContainer = document.querySelector(".scholarship_cont");

    // Function to ask for password on Admin.html
    function handlePasswordPrompt() {
        // Check if the current page is Admin.html
        if (window.location.pathname.includes("admin")) {
            // Prompt for password
            const password = prompt("Enter the admin password:");

            // If password is correct, allow access
            if (password === "123") {
                console.log("Access granted to Admin.html");
                loadScholarships();  // Load scholarships if access is granted
            } else {
                // Incorrect password, redirect to root index.html
                alert("Incorrect password. Redirecting to homepage...");
                window.location.href = "/index.html";  // Redirect to index.html in the root
            }
        }
    }

    // Function to add a new scholarship to Firestore
    async function addScholarship(Name, Class, Country, StartDate, EndDate, Description, Link) {
        try {
            // Save scholarship data to Firestore
            const docRef = await addDoc(collection(db, "scholarships"), {
                Name, Class, Country, StartDate, EndDate, Description, Link
            });
            console.log("Scholarship added successfully with ID: ", docRef.id);

            // Display the newly added scholarship on the page
            displayScholarship({ Name, Class, Country, StartDate, EndDate, Description, Link }, docRef.id);
        } catch (e) {
            // Handle errors if saving fails
            console.error("Error adding scholarship: ", e.message);
            alert("Failed to add scholarship. Please try again.");
        }
    }

    // Function to display a single scholarship card on the homepage
    function displayScholarship(scholarship, id) {
        // Check if the scholarship object has the expected properties
        if (!scholarship || !scholarship.Name || !scholarship.Country || !scholarship.StartDate) {
            console.error("Scholarship object is missing required fields: ", scholarship);
            return;
        }

        // Create a new div element for the scholarship card
        const newdiv = document.createElement("div");

        // Set the inner HTML to display Name, Country, and Start Date
        newdiv.innerHTML = `
            <div class="name"><strong>Name:</strong> ${scholarship.Name}</div>
            <div class="country"><strong>Country:</strong> ${scholarship.Country}</div>
            <div class="startDate"><strong>Start Date:</strong> ${scholarship.StartDate}</div>
        `;

        // Add the 'scholarship-card' class to the div for styling
        newdiv.classList.add("scholarship-card");

        // Append the card to the scholarship container
        adminScholarshipsContainer.append(newdiv);

        // Add event listener to show popup when a card is clicked
        newdiv.addEventListener("click", () => showPopup(scholarship));
    }

    // Function to load all scholarships from Firestore and display them in the admin section
    async function loadScholarships() {
        try {
            // Retrieve all documents from the 'scholarships' collection in Firestore
            const querySnapshot = await getDocs(collection(db, "scholarships"));

            // Clear the adminScholarshipsContainer before displaying new data
            adminScholarshipsContainer.innerHTML = "";

            // Loop through each document and display the scholarships
            querySnapshot.forEach((doc) => {
                const scholarship = doc.data(); // Get the scholarship data
                console.log(scholarship); // Log the scholarship data for debugging

                // Create a new div element for each scholarship
                const scholarshipDiv = document.createElement("div");
                scholarshipDiv.classList.add("scholarship-card");

                // Set the inner HTML for the scholarship (showing Name, Country, Class, etc.)
                scholarshipDiv.innerHTML = `
                <h3>${scholarship.Name}</h3>
                <p><strong>Country:</strong> ${scholarship.Country}</p>
                <p><strong>Class:</strong> ${scholarship.Class}</p>
                <p><strong>Start Date:</strong> ${scholarship.StartDate}</p>
                <p><strong>End Date:</strong> ${scholarship.EndDate}</p>
                <p><strong>Description:</strong> ${scholarship.Description}</p>
                <a href="${scholarship.Link}" target="_blank">Apply Here</a>
                <button class="delete-scholarship" data-id="${doc.id}">Delete</button>
            `;

                // Append the scholarship to the adminScholarshipsContainer
                adminScholarshipsContainer.appendChild(scholarshipDiv);

                // Add event listener for the delete button
                scholarshipDiv.querySelector(".delete-scholarship").addEventListener("click", () => deleteScholarship(doc.id, scholarshipDiv));
            });
        } catch (e) {
            // Handle errors if loading fails
            console.error("Error retrieving scholarships: ", e);
            alert("Failed to load scholarships. Please try again.");
        }
    }

    // Function to delete a scholarship
    async function deleteScholarship(id, scholarshipDiv) {
        try {
            await deleteDoc(doc(db, "scholarships", id));
            console.log("Scholarship deleted successfully with ID: ", id);

            // Remove the scholarship div from the DOM
            adminScholarshipsContainer.removeChild(scholarshipDiv);
        } catch (e) {
            console.error("Error deleting scholarship: ", e.message);
        }
    }
    document.getElementById('saveScholarship').addEventListener('click', function() {
        const scholarshipName = document.getElementById('scholarshipName').value.trim();
        const scholarshipClass = document.getElementById('scholarshipClass').value.trim();
        const scholarshipCountry = document.getElementById('scholarshipCountry').value.trim();
        const scholarshipStartDate = document.getElementById('scholarshipStartDate').value.trim();
        const scholarshipEndDate = document.getElementById('scholarshipEndDate').value.trim();
        const scholarshipDescription = document.getElementById('scholarshipDescription').value.trim();
        const scholarshipLink = document.getElementById('scholarshipLink').value.trim();
        
        // Now you have trimmed values and can perform actions with them
        addScholarship(scholarshipName,scholarshipClass,scholarshipCountry,scholarshipStartDate,scholarshipEndDate,scholarshipDescription,scholarshipLink)
        
        // Add further logic to save or handle the form data
    });
    deleteScholarship();
    // Only ask for password if the user is on Admin.html
    handlePasswordPrompt();

    // Prevent users from opening DevTools using Ctrl + Shift + C
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyC') {
            event.preventDefault();
            alert("Wanna Steal The Password BR0!");
        }
    });

    // Disable right-click on the page and show an alert
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        alert("Wanna Steal The Password BR0!");
    });
});
