document.getElementById('searchbar').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const scholarshipDivs = document.querySelectorAll('.scholarship');

    scholarshipDivs.forEach(function(div) {
        const countryName = div.querySelector('.country').textContent.toLowerCase();
        if (countryName.includes(searchQuery)) {
            div.classList.remove('hidden');
        } else {
            div.classList.add('hidden');
        }
    });
});
