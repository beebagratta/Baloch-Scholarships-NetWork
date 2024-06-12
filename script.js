document.addEventListener('DOMContentLoaded', function() {
    // adding new scholarships
    addScholarship('New Scholarship', 'Italy', '10', '2024-01-01', '2024-06-13', 'This is a sample description. This description is intentionally long to demonstrate the expanding functionality of the scholarship div. When the text is long, the div should expand accordingly to accommodate all the content.', '#');
    addScholarship('Old Scholarship', 'Italy', '15', '2024-01-01', '2024-6-12', 'This is another sample description. This description is also intentionally long to demonstrate the expanding functionality of the scholarship div. When the text is long, the div should expand accordingly to accommodate all the content.', '#');

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
                const name = scholarship.querySelector('.name').textContent.trim();
                const country = scholarship.querySelector('.country').value.trim();
                const classValue = scholarship.querySelector('.class').value.trim();
                const startDate = scholarship.querySelector('.Startingdate').textContent.trim();
                const endDate = scholarship.querySelector('.Enddate').textContent.trim();
                const description = scholarship.querySelector('.description').textContent.trim();

                if (name !== 'Name: ' && country !== '' && classValue !== '' && startDate !== 'Starting_date: ' && endDate !== 'End_date: ' && description !== 'Description: ') {
                    scholarship.style.display = 'block';
                } else {
                    scholarship.style.display = 'none';
                }
            });
        }
    });

    // Remove scholarships with end dates equal to the current date
    removeExpiredScholarships();
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

    // Append the new scholarship to the container only if it has valid data
    if (name && country && classValue && startDate && endDate && description) {
        document.querySelector('.scholarshipcont2').appendChild(newScholarship);

        // Attach click event listener for expanding and collapsing
        newScholarship.addEventListener('click', function() {
            if (newScholarship.classList.contains('expanded')) {
                newScholarship.classList.remove('expanded');
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
}

function removeExpiredScholarships() {
    const currentDate = new Date().toISOString().split('T')[0];
    const scholarships = document.querySelectorAll('.scholarship');
    
    scholarships.forEach(scholarship => {
        const endDate = scholarship.querySelector('.Enddate').textContent.replace('End_date: ', '').trim();
        if (endDate === currentDate) {
            scholarship.remove();
        }
    });
}
