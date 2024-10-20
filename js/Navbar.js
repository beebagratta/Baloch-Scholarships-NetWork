document.addEventListener("DOMContentLoaded",()=>{
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
    Navbar()
})