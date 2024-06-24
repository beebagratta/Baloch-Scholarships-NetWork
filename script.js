document.addEventListener('DOMContentLoaded', function() {
    // Adding new scholarships with multiple links
    addScholarship(
        'Regional Scholarships Italy', 
        'Italy', 
        'Becholar, Master and PhD', 
        'May/Jun Each Year', 
        'July/Agust Each year', 
        "Italy offers regional scholarships through the Italian government. These scholarships apply only to the universities that fall within the specific region. Studying in Italy has become easy as these scholarships support a student's tuition fees, accommodation, and living expenses.  `Some of the regional scholarships are purely need-based, meaning that people having low merit and scores on their degrees can also apply based on their inability to support their degree financially. To prove that you truly need financial assistance, the scholarship application requires you to present Bank certificate Property certificate Family income certificate`",
        ['https://www.laziodisco.it/', 'https://second-link.com/', 'https://third-link.com/' , 'https://www.google.com']
    );
    addScholarship('Name', 'Country','Class', 'Start_date','End_date', "Description",['link']);
    
    // Event listener for the menu button
    const menuButton = document.getElementById('menu');
    const closeButton = document.getElementById('close');
    const sidebar = document.getElementById('sidebar');

    menuButton.addEventListener('click', function() {
        sidebar.classList.add('nav-open');
        menuButton.style.display = 'none';
        closeButton.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        sidebar.classList.remove('nav-open');
        menuButton.style.display = 'block';
        closeButton.style.display = 'none';
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

function addScholarship(name, country, classValue, startDate, endDate, description, linkUrls) {
    // Clone the template
    const template = document.querySelector('#scholarship-template');
    const newScholarship = template.cloneNode(true);
    
    // Remove the id from the cloned node and make it visible
    newScholarship.id = '';
    newScholarship.style.display = 'block';

    // Populate the cloned node with the provided data
    newScholarship.querySelector('.name').textContent = `${name}`;
    newScholarship.querySelector('.country').value = country;
    newScholarship.querySelector('.class').value = classValue;
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
        newScholarship.addEventListener('click', function() {
            newScholarship.classList.add('expanded');
            newScholarship.querySelector('.close-btn').style.display = 'flex';
        });

        // Attach click event listener for close button
        newScholarship.querySelector('.close-btn').addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent triggering the parent click event
            newScholarship.classList.remove('expanded');
            newScholarship.querySelector('.close-btn').style.display = 'none';
        });
    }
}
