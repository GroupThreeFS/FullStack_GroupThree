document.getElementById('dropdownToggle').addEventListener('click', function() {
    const content = document.querySelector('.dropdown-content');
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
});