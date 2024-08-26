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
    if (level === 1) {
        header.className = `card-07--dropdown-header`;// Replace with picture.svg when level is 2
    } else {
        header.className = `card-08--dropdown-header`;; // Default icon (chat.svg)
    }
    
    header.setAttribute('data-level', level);
    header.setAttribute('onclick', 'toggleDropdown(this)');

    let flexContainerCol = document.createElement('div');
    flexContainerCol.className = 'card-01--flex';

    let headerContent = document.createElement('div');
    headerContent.className = 'card-01--dropdown-header--content';
    let flexBoxLeft = document.createElement('div');
    let flexBoxRight = document.createElement('div');
    flexBoxLeft.className = 'card-01--flexbox-left';
    flexBoxRight.className = 'card-01--flexbox-right';
    if (level === 1) {
        let iconContainer = document.createElement('div');
        iconContainer.className = 'card-01--dropdown-header--icon';
        let icon = document.createElement('img');
        icon.src = 'images/flag-solid.svg'; // Adjust as needed
        icon.alt = 'Project Thumbnail';
        iconContainer.appendChild(icon);
        flexBoxLeft.appendChild(iconContainer);
    }
    else {
        let iconContainer = document.createElement('div');
        iconContainer.className = 'card-08--dropdown-header--icon';
        let icon = document.createElement('img');
        icon.src = 'images/square.png'; // Adjust as needed
        icon.alt = 'Project Thumbnail';
        iconContainer.appendChild(icon);

        // let descriptionContainer = document.createElement('div');
        // descriptionContainer.className = 'card-08--dropdown-header--desc';
        // let desc = document.createElement('div');
        // desc.DOCUMENT_TYPE_NODE = 'test'

        flexBoxLeft.appendChild(iconContainer);
    }

    let card08Container = document.createElement('div');
    card08Container.className = 'flex-container-col';

    let text = document.createElement('div');
    text.className = 'card-01-text';
    text.textContent = item.name;
    card08Container.appendChild(text);

    if (level !== 1){
        
        let card08SubContainer = document.createElement('div');
        card08SubContainer.className = 'flex-container-row';
        let text1 = document.createElement('div');
        text1.className = 'card-08-text';
        text1.textContent = 'จำนวน';
        let text2 = document.createElement('div');
        text2.className = 'card-08-text';
        text2.textContent = '1,000,000,000';
        let text3 = document.createElement('div');
        text3.className = 'card-08-text';
        text3.textContent = 'หน่วย';
        let text4 = document.createElement('div');
        text4.className = 'card-08-text';
        text4.textContent = 'ชิ้น';
        let text5 = document.createElement('div');
        text5.className = 'card-08-text';
        text5.textContent = 'ราคาต่อหน่วย';
        let text6 = document.createElement('div');
        text6.className = 'card-08-text';
        text6.textContent = '10';
        card08SubContainer.appendChild(text1);
        card08SubContainer.appendChild(text2);
        card08SubContainer.appendChild(text3);
        card08SubContainer.appendChild(text4);
        card08SubContainer.appendChild(text5);
        card08SubContainer.appendChild(text6);
        card08Container.appendChild(card08SubContainer);
    }
    flexBoxLeft.appendChild(card08Container);
    headerContent.appendChild(flexBoxLeft);



    if (level === 1){
        let leftIconContainer = document.createElement('div');
        leftIconContainer.className = 'card-01-icon-left';
        let leftIcon = document.createElement('img');

        leftIcon.src = 'images/plus-solid.svg'; // Replace with picture.svg when level is 2
        leftIcon.alt = 'Add Icon';
        leftIconContainer.appendChild(leftIcon);
        leftIconContainer.setAttribute('onclick', 'nextPage("27.html")');
        flexBoxRight.appendChild(leftIconContainer);

        let rightIconContainer = document.createElement('div');
        rightIconContainer.className = 'card-01-icon-right';
        let rightIcon = document.createElement('img');
        rightIcon.src = 'images/chevron-left-regular.svg'; // Adjust as needed
        rightIcon.alt = 'Arrow Icon';
        rightIconContainer.appendChild(rightIcon);
        flexBoxRight.appendChild(rightIconContainer);
        headerContent.appendChild(flexBoxRight);
    }

     flexContainerCol.appendChild(headerContent);
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
        {"id": 3, "parent_id": 1, "name": "ตะปู"},
        {"id": 4, "parent_id": 1, "name": "ตะปู"},
        {"id": 5, "parent_id": 1, "name": "ตะปู"},
        {"id": 6, "parent_id": 8, "name": "Item 3"},
        {"id": 7, "parent_id": 8, "name": "ตะปู"},
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