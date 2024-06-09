// // Predefined code value
// const code = '1111';

// // Select input elements
// const codeInput = document.getElementById('codeInput');
// const nameInput = document.getElementById('nameInput');
// const lastDateInput = document.getElementById('lastDateInput');
// const descriptionInput = document.getElementById('descriptionInput');
// const linkInput = document.getElementById('linkInput');
// const countryInput = document.getElementById('countryInput');
// const classSelector = document.getElementById('classSelector');
// const saveButton = document.getElementById('saveButton');
// const divContainer = document.getElementById('divContainer');
// const searchBox = document.getElementById('searchBox');
// const classFilter = document.getElementById('classFilter');

// // Enable inputs based on the code
// if (codeInput) {
//     codeInput.addEventListener('input', function () {
//         if (codeInput.value === code) {
//             nameInput.disabled = false;
//             lastDateInput.disabled = false;
//             descriptionInput.disabled = false;
//             linkInput.disabled = false;
//             countryInput.disabled = false;
//             classSelector.disabled = false;
//             saveButton.disabled = false;
//             nameInput.focus();
//         } else {
//             nameInput.disabled = true;
//             lastDateInput.disabled = true;
//             descriptionInput.disabled = true;
//             linkInput.disabled = true;
//             countryInput.disabled = true;
//             classSelector.disabled = true;
//             saveButton.disabled = true;
//             nameInput.value = '';
//             lastDateInput.value = '';
//             descriptionInput.value = '';
//             linkInput.value = '';
//             countryInput.value = '';
//             classSelector.value = '';
//         }
//     });
// }

// // Save button functionality
// if (saveButton) {
//     saveButton.addEventListener('click', function () {
//         const name = nameInput.value;
//         const lastDate = lastDateInput.value;
//         const description = descriptionInput.value;
//         const link = linkInput.value;
//         const country = countryInput.value;
//         const className = classSelector.value;

//         const divs = JSON.parse(localStorage.getItem('divs')) || [];
//         divs.push({ name, lastDate, description, link, country, className });
//         localStorage.setItem('divs', JSON.stringify(divs));

//         nameInput.value = '';
//         lastDateInput.value = '';
//         descriptionInput.value = '';
//         linkInput.value = '';
//         countryInput.value = '';
//         classSelector.value = '';
//         nameInput.focus();
//     });
// }

// // Load and display divs
// function loadDivs(filterCountry = '', filterClass = '') {
//     divContainer.innerHTML = ''; // Clear the container
//     const divs = JSON.parse(localStorage.getItem('divs')) || [];
//     divs.forEach((div, index) => {
//         if ((filterCountry && div.country.toLowerCase() !== filterCountry.toLowerCase()) ||
//             (filterClass && div.className !== filterClass)) {
//             return; // Skip divs that don't match the search
//         }

//         const divElement = document.createElement('div');
//         divElement.className = 'new-div';

//         const nameElem = document.createElement('p');
//         nameElem.textContent = `Name: ${div.name}`;
//         divElement.appendChild(nameElem);

//         const dateElem = document.createElement('p');
//         dateElem.textContent = `Last Date: ${div.lastDate}`;
//         divElement.appendChild(dateElem);

//         const descElem = document.createElement('p');
//         descElem.textContent = `Description: ${div.description}`;
//         divElement.appendChild(descElem);

//         const linkElem = document.createElement('a');
//         linkElem.href = div.link;
//         linkElem.textContent = div.link;
//         divElement.appendChild(linkElem);

//         const countryElem = document.createElement('p');
//         countryElem.textContent = `Country: ${div.country}`;
//         divElement.appendChild(countryElem);

//         const classElem = document.createElement('p');
//         classElem.textContent = `Class: ${div.className}`;
//         divElement.appendChild(classElem);

//         if (window.location.pathname.includes('edit_delete.html')) {
//             const editButton = document.createElement('button');
//             editButton.textContent = 'Edit';
//             editButton.addEventListener('click', () => editDiv(index));
//             divElement.appendChild(editButton);

//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = 'Delete';
//             deleteButton.addEventListener('click', () => deleteDiv(index));
//             divElement.appendChild(deleteButton);
//         }

//         divContainer.appendChild(divElement);
//     });
// }

// // Initial load
// if (divContainer) {
//     loadDivs();
// }

// // Search functionality
// if (searchBox) {
//     searchBox.addEventListener('input', function () {
//         loadDivs(searchBox.value, classFilter ? classFilter.value : '');
//     });
// }

// // Class filter functionality
// if (classFilter) {
//     classFilter.addEventListener('change', function () {
//         loadDivs(searchBox ? searchBox.value : '', classFilter.value);
//     });
// }

// // Edit div functionality
// function editDiv(index) {
//     const divs = JSON.parse(localStorage.getItem('divs'));
//     const div = divs[index];

//     const newName = prompt('Enter new name:', div.name);
//     const newLastDate = prompt('Enter new last date:', div.lastDate);
//     const newDescription = prompt('Enter new description:', div.description);
//     const newLink = prompt('Enter new link:', div.link);
//     const newCountry = prompt('Enter new country:', div.country);
//     const newClass = prompt('Enter new class:', div.className);

//     if (newName && newLastDate && newDescription && newLink && newCountry && newClass) {
//         divs[index] = { name: newName, lastDate: newLastDate, description: newDescription, link: newLink, country: newCountry, className: newClass };
//         localStorage.setItem('divs', JSON.stringify(divs));
//         location.reload(); // Reload the page to reflect changes
//     }
// }

// // Delete div functionality
// function deleteDiv(index) {
//     const divs = JSON.parse(localStorage.getItem('divs'));
//     divs.splice(index, 1);
//     localStorage.setItem('divs', JSON.stringify(divs));
//     location.reload(); // Reload the page to reflect changes
// }
