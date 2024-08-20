

function buildTree(data, parentId = null) {
    let tree = [];
    data.forEach(item => {
        if (item.parent_id === parentId) {
            let children = buildTree(data, item.id);
            if (children.length) {
                item.children = children;
            }
            tree.push(item);
        }
    });
    return tree;
}

function createDropdownItem(item, level = 1) {
    let listItem = document.createElement('div');
    listItem.className = 'card-01--dropdown-item';

    let header = document.createElement('div');
    header.className = `card-01--dropdown-header`;
    header.setAttribute('data-level', level);
    header.setAttribute('onclick', 'toggleDropdown(this)');

    // Create the container for header content and footer
    let flexContainerCol = document.createElement('div');
    flexContainerCol.className = 'card-01--flex';

    // Create the header content
    let headerContent = document.createElement('div');
    headerContent.className = 'card-01--dropdown-header--content';
    let flexBoxLeft = document.createElement('div');
    let flexBoxRight = document.createElement('div');
    flexBoxLeft.className = 'card-01--flexbox-left';
    flexBoxRight.className = 'card-01--flexbox-right';
    
    let iconContainer = document.createElement('div');
    iconContainer.className = 'card-01--dropdown-header--icon';
    let icon = document.createElement('img');
    icon.src = 'images/flag-solid.svg'; // Adjust as needed
    icon.alt = 'Project Thumbnail';
    iconContainer.appendChild(icon);
    flexBoxLeft.appendChild(iconContainer);
    // headerContent.appendChild(iconContainer);

    let text = document.createElement('div');
    text.className = 'card-01-text';
    text.textContent = item.name;
    flexBoxLeft.appendChild(text);
    headerContent.appendChild(flexBoxLeft);
    // headerContent.appendChild(text);

    let leftIconContainer = document.createElement('div');
    leftIconContainer.className = 'card-01--item-icon-left';
    let leftIcon = document.createElement('img');

    // Conditional check for level 2 to replace the icon
    if (level === 1) {
        leftIcon.src = 'images/chat.svg'; // Replace with picture.svg when level is 2
    } else {
        leftIcon.src = 'images/picture.svg'; // Default icon (chat.svg)
    }

    // leftIcon.src = 'images/chat.svg'; 
    leftIcon.alt = 'Add Icon';
    leftIconContainer.appendChild(leftIcon);
    leftIconContainer.setAttribute('onclick', 'nextPage("27.html")');
    flexBoxRight.appendChild(leftIconContainer);
    // headerContent.appendChild(leftIconContainer);

    let rightIconContainer = document.createElement('div');
    rightIconContainer.className = 'card-01-icon-right';
    let rightIcon = document.createElement('img');
    rightIcon.src = 'images/chevron-left-regular.svg'; // Adjust as needed
    rightIcon.alt = 'Arrow Icon';
    rightIconContainer.appendChild(rightIcon);
    flexBoxRight.appendChild(rightIconContainer);
    headerContent.appendChild(flexBoxRight);
    // headerContent.appendChild(rightIconContainer);

    // Append header content to the flex container
    flexContainerCol.appendChild(headerContent);

    // Create the footer with progress bar and text
    let footer = document.createElement('div');
    footer.className = 'card-01--dropdown-footer';

    let progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = '34%'; // Adjust as needed
    footer.appendChild(progressText);

    let progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    let progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '34%'; // Adjust the width based on progress
    progressBarContainer.appendChild(progressBar);
    footer.appendChild(progressBarContainer);

    // Append footer to the flex container
    flexContainerCol.appendChild(footer);

    // Append the flex container to the header
    header.appendChild(flexContainerCol);

    // Append the header to the list item
    listItem.appendChild(header);

    // Check if the item has children
    if (item.children && item.children.length > 0) {
        let dropdownContent = document.createElement('div');
        dropdownContent.className = 'card-01--dropdown-content';

        item.children.forEach(child => {
            dropdownContent.appendChild(createDropdownItem(child, level + 1));
        });

        listItem.appendChild(dropdownContent);
    }

    return listItem;
}



function constructDropdown(id) {
    let data = [
        {"id": 1, "parent_id": null, "name": "งานออกแบบตัวบ้าน"},
        {"id": 3, "parent_id": 1, "name": "ออกแบบบ้าน"},
        {"id": 4, "parent_id": 3, "name": "งานออกแบบหลังคา"},
        {"id": 5, "parent_id": 3, "name": "งานออกแบบหลังคา"},
        {"id": 6, "parent_id": 5, "name": "Item 3"},
        {"id": 7, "parent_id": 1, "name": "ประวัติการนับ"},
        {"id": 8, "parent_id": null, "name": "testing"},
        {"id": 9, "parent_id": 8, "name": "testing2"}
    ];

    let treeData = buildTree(data); // Convert flat data to nested structure
    let dropdownContainer = document.getElementById(id).querySelector('.card-01--dropdown-content'); // Attach to the specific card by id

    // Loop through each root item and append it
    treeData.forEach(item => {
        dropdownContainer.appendChild(createDropdownItem(item));
    });
}

function toggleDropdown(element) {
    const dropdownContent = element.nextElementSibling;
    dropdownContent.classList.toggle('open');

    const arrowIcon = element.querySelector('.card-01-icon-right img');
    if (arrowIcon) {
        arrowIcon.classList.toggle('rotate');
    }
    element.classList.toggle('open');
}

function nextPage(url) {
    window.location.href = url;
}




// Run the function to construct the dropdown
constructDropdown('card-1');
constructDropdown('card-2');