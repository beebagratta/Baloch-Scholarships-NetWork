document.addEventListener('DOMContentLoaded', function() {
    // Example of adding new scholarships
    addScholarship('New Scholarship', 'Italy', '10', '2024-01-01', '2024-12-31', 'This is a sample description.', '#');
   
    
    // Event listener for the menu button
    const menuButton = document.getElementById('menu');
    const navMenu = document.querySelector('nav ul');

    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Search functionality
    const searchbar = document.getElementById('searchbar');
    searchbar.addEventListener('input', function() {
        const filter = searchbar.value.toLowerCase();
        const scholarships = document.querySelectorAll('.scholarship');
        
        scholarships.forEach(scholarship => {
            const country = scholarship.querySelector('.country').value.toLowerCase();
            if (country.includes(filter)) {
                scholarship.style.display = 'block';
            } else {
                scholarship.style.display = 'none';
            }
        });

        // Remove empty scholarships
        if (filter === '') {
            scholarships.forEach(scholarship => {
                scholarship.style.display = 'none';
            });
        }
    });
});

function addScholarship(name, country, classValue, startDate, endDate, description, linkUrl) {
    // Clone the template
    const template = document.querySelector('#scholarship-template');
    const newScholarship = template.cloneNode(true);
    
    // Remove the id from the cloned node and make it visible
    newScholarship.id = '';
    newScholarship.style.display = 'block';

    // Populate the cloned node with the provided data
    newScholarship.querySelector('.name').textContent = `Name: ${name}`;
    newScholarship.querySelector('.country').value = country;
    newScholarship.querySelector('.class').value = classValue;
    newScholarship.querySelector('.Startingdate').textContent = `Starting_date: ${startDate}`;
    newScholarship.querySelector('.Enddate').textContent = `End_date: ${endDate}`;
    newScholarship.querySelector('.description').textContent = `Description: ${description}`;
    newScholarship.querySelector('.link a').href = linkUrl;

    // Append the new scholarship to the container
    document.querySelector('.scholarshipcont2').appendChild(newScholarship);

    // Attach click event listener for expanding and collapsing
    newScholarship.addEventListener('click', function() {
        if (newScholarship.classList.remove('expanded')) {
            
            newScholarship.querySelector('.close-btn').style.display = 'none';
        } else {
            newScholarship.classList.add('expanded');
            newScholarship.querySelector('.close-btn').style.display = 'flex';
        }
    });

    // Attach click event listener for close button
    newScholarship.querySelector('.close-btn').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent triggering the parent click event
        newScholarship.classList.remove('expanded');
        newScholarship.querySelector('.close-btn').style.display = 'none';
    });
}
