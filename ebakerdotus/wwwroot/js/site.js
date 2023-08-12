/*
    This script handles the interactive behavior of my portfolio
    website. It provides functionality to automatically close the navigation
    toggler, change the expand button text to "Collapse" on click, to open
    collapsed sections, to change skill icon color on project hover, to toggle
    dark mode, to change the background based on mouse position, and to track
    users' eye' location when it is toggled.

    Author: Ethan Baker
    Date: 8/2/2023
*/

/**
    Automatically closes the navigation list upon clicking one of its anchors.
*/
function closeNavList() {
    if (window.innerWidth < 710) {
        const navButton = document.getElementById("toggler");
        navButton.click();
    }
}

/**
    Expands the education and experiences collapsible on clicking the
    "My Credentials" button.
*/
function openEduExp() {
    const expandButton = document.getElementById("edu-exp-expand");
    if (expandButton.innerHTML === 'Expand<br>∨') {
        expandButton.click();
    }
}

/**
    Expands the skills collapsible on clicking the
    "more" button.
*/
function openSkills() {
    const skillExpandButton = document.getElementById("skill-expand-button")
    if (skillExpandButton.innerHTML === 'Expand<br>∨') {
        skillExpandButton.click();
    }
}

/**
    Changes button text of the .expand class when they are clicked to
    display "Collapse" instead of "Expand" when the associated dropdown
    is open.
*/
function toggleExpandText(event) {
    const expandButton = event.target;
    const targetId = expandButton.getAttribute('data-bs-target');
    const targetElement = document.querySelector(targetId);

    setTimeout(() => {
        if (targetElement.classList.contains('show')) {
            expandButton.innerHTML = 'Collapse<br>∨';
        } else {
            expandButton.innerHTML = 'Expand<br>∨';
        }
    }, 360);
}

/**
    Changes the color of the skill icons depending on which project is being
    hovered over.
*/
function addSkillColors(event) {
    const project = event.currentTarget;
    if (project.id === 'ebaker') {
        for (skill of ['html5', 'css3', 'javascript', 'csharp', 'dotnet', 'bootstrap', 'photoshop']) {
            skillElement = document.getElementById(skill);
            skillElement.classList.add("selected");
        }
    }
    if (project.id === 'connexion') {
        for (skill of ['python', 'pandas', 'numpy', 'selenium', 'json']) {
            skillElement = document.getElementById(skill);
            skillElement.classList.add("selected");
        }
    }
}

/**
    Reverts colors of skill icons after hover ends.
*/
function removeSkillColors(event) {
    for (skill of document.getElementsByClassName('skill-icon')) {
        skill.classList.remove("selected");
    }
}
/**
    Animates items as they scroll into frame.
*/
function animateScroll() {
    const elements = document.querySelectorAll(".animate-scroll");
    for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const display = window.getComputedStyle(element).display;
        if (display !== 'none' &&
            rect.bottom >= 75 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 75) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    }
}

/**
    Scales the background div in the introduction section when the mouse moves
    across the screen.
*/
function animateBackgroundAndHeadshot(event) {
    try {
        const width = window.innerWidth;
        const div = document.getElementById('bg-div')
        const mousePosX = Math.min(.7, event.clientX / width);
        if (width >= 710) {
            div.style.width = '38.5vw';
            const mousePosX = Math.min(.7, event.clientX / width);
            div.style.width = (0.37 + (0.03 * mousePosX)) * width + 'px';
        } else {
            div.style.width = '100vw';
        }

        const headshot = document.getElementById('headshot-color');
        headshot.style.maxWidth = mousePosX / 0.7 * 100 + '%';
    } catch { }
}

/**
    Toggles dark mode by changing the color of certain elements and changing
    certain images
*/
function toggleDarkMode() {
    const toggleBtn = document.getElementById('moon-btn');
    elements = document.querySelectorAll('*');
    const darkModeImage = document.getElementById('moon-img');
    const topRightLine = document.getElementById('top-right-line');
    const bottomLeftLine = document.getElementById('bottom-left-line');
    if (toggleBtn.checked) {
        localStorage.setItem('darkMode', 'on');
        for (const element of elements) {
            element.classList.add('darkmode');
        }
        darkModeImage.src = '/images/sun.png';
        try {
            topRightLine.src = '/images/dark-top-right-line.png';
            bottomLeftLine.src = '/images/dark-bottom-left-line.png';
        } catch { }

    } else {
        localStorage.setItem('darkMode', 'off');
        for (const element of elements) {
            element.classList.remove('darkmode')
        }
        darkModeImage.src = '/images/moon.png'
        try {
            topRightLine.src = '/images/top-right-line.png';
            bottomLeftLine.src = '/images/bottom-left-line.png';
        } catch { }
    }
}

/**
    Syncs dark mode settings between the privacy and home pages.
*/
function syncDarkMode() {
    try {
        const status = localStorage.getItem('darkMode');
        if (status === 'on') {
            if (!document.getElementById('moon-btn').checked) {
                document.getElementById('moon-btn').click();
            }
        } else {
            if (document.getElementById('moon-btn').checked) {
                document.getElementById('moon-btn').click();
            }
        }
    } catch { }
}

document.addEventListener('DOMContentLoaded', function () {
    // closeNavList()
    const links = document.getElementsByClassName("nav-link");
    for (const link of links) {
        link.addEventListener('click', closeNavList)
    }

    // openEduExp()
    const credButton = document.getElementById('credentials-button');
    try {
        credButton.addEventListener('click', openEduExp);
    } catch {
        
    }

    // openSkills()
    const moreButton = document.getElementById('more-skills');
    try {
        moreButton.addEventListener('click', openSkills);
    } catch {
        
    }

    // toggleExpandText()
    const expandButtons = document.getElementsByClassName('expand');
    for (const btn of expandButtons) {
        btn.addEventListener('click', toggleExpandText);
    }

    // addSkillColors() + removeSkillColors()
    const projects = document.getElementsByClassName('project');
    for (const project of projects) {
        project.addEventListener('mouseover', addSkillColors)
        project.addEventListener('mouseout', removeSkillColors)
    }

    // animateScroll()
    window.addEventListener('scroll', animateScroll);
    window.addEventListener('resize', animateScroll);
    animateScroll();
    const expandbtns = document.getElementsByClassName('expand');
    for (const btn of expandbtns) {
        btn.addEventListener('click', animateScroll);
    }

    // animateBackgroundAndHeadshot()
    window.addEventListener('resize', animateBackgroundAndHeadshot);
    window.addEventListener('mousemove', animateBackgroundAndHeadshot);

    // toggleDarkMode()
    toggleBtn = document.getElementById('moon-btn');
    toggleBtn.addEventListener('change', toggleDarkMode);
    moonBtn = document.getElementById('moon-btn');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (!moonBtn.checked) {
            moonBtn.click();
        }
    }
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', event => {
            if (event.matches) {
                if (!moonBtn.checked) {
                    moonBtn.click();
                }
            } else {
                if (moonBtn.checked) {
                    moonBtn.click();
                }
            }
        })

    // syncDarkMode()
    window.addEventListener('DOMContentLoaded', syncDarkMode);
});