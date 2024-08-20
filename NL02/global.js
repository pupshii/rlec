function nextPage(url) {
    window.location.href = url;
}

function dropdown(element) {
    const dropdownContent = element.nextElementSibling;
    dropdownContent.classList.toggle('open');
    element.classList.toggle('hidden');
}

function removeParentClasses(button) {
    // Find the parent element that has the open class
    const parent = button.closest('.card-04--extended');
    if(parent) {
        const dropdownTrigger = parent.previousElementSibling;

        if (dropdownTrigger && dropdownTrigger.classList.contains('hidden')) {
            dropdownTrigger.classList.remove('hidden');
        }

        if (parent.classList.contains('open')) {
            parent.classList.remove('open');
        }
    }
    
    
}