// Implement smooth scroll on hash change. Important for sidebar.

const anchorScroll = async (e) => {
    // pull the hash off the window
    let { hash } = window.location;
    // use the hash to identify which element should be targeted
    let node = document.getElementsByName(hash.replace('#', ''));
    // Scroll that element into view
    if (node.length > 0) {
        node[0].scrollIntoView({
        block: "start",
        behavior: "smooth"
        });
    }
    // Clear the url to avoid issues when moving between sections by scroll
    const state = {}
    const title = ''
    const url = '/'

    history.pushState(state, title, url)
};

window.addEventListener('hashchange', anchorScroll);

// Set up intersection observers to ensure sections centre on scroll and trigger relevant animations

const intersectHandler = (entries) => {
    entries.forEach(entry => {
        let elem = entry.target;
        if (entry.isIntersecting) {
            elem.scrollIntoView({
                block: "start",
                behavior: "smooth"
            });
        }
    });
};

const debounce = (func, wait = 100) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
};

const intersectHandlerDebounced = debounce(intersectHandler, 500);

let options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.5, 0.6, 0.7, 0.8, 0.9]
};

let observer = new IntersectionObserver(intersectHandlerDebounced, options);

let secondaryOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
}

const animationTrigger = (i) => {
    i = i < 6 ? i : 0;
    i++;
    let target = document.getElementById(`image-${i}`);
    console.log(`animating ${i}`)
    target.classList.toggle("hover")
    animationTrigger(i);
};

const animationTriggerDebounced = debounce(animationTrigger, 500);

const contactInfo = { 
    "jon": { number: "+61 409 360 118", email: "jon@lookinguplandscapes.com.au"},
    "bel": { number: "+61 409 420 118", email: "bel@lookinguplandscapes.com.au"}
}

const showContactInfo = (e) => {
    const { target } = e;
    const phone = document.createElement("P");
    const number = document.createTextNode(`${contactInfo[target.name].number}`);
    const email = document.createElement("P");
    const address = document.createTextNode(`${contactInfo[target.name].email}`)
    phone.appendChild(number);
    email.appendChild(address);
    target.parentNode.appendChild(phone);
    target.parentNode.appendChild(email);
    target.parentNode.removeChild(target);
}

const loadEvents = () => {
    let targets = document.querySelectorAll('.section-container');
    for (let target of targets) {
        observer.observe(target);
    };

    let buttons = document.querySelectorAll('.staff-contact-button');
    for (let button of buttons) {
        button.addEventListener('click', showContactInfo);
    };
};

window.addEventListener('load', loadEvents);