const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

let menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];


for (let i = 0; i < menuLinks.length; i++) {
  let linkEl = document.createElement("a");
  linkEl.setAttribute("href", menuLinks[i].href);
  linkEl.textContent = menuLinks[i].text;
  topMenuEl.appendChild(linkEl);
}

// SUB-MENU ELEMENT 
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// Part 4 Adding Menu Interaction

let topMenuLinks = topMenuEl.querySelectorAll("a");


topMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (!event.target.matches("a")) {
    return;
  }


  const clickedLink = event.target;

  topMenuLinks.forEach((link) => {
    link.classList.remove("active")
  });

  const isActive = clickedLink.classList.toggle("active");


  const clickedLinkObj = menuLinks.find(linkObj => linkObj.text === clickedLink.textContent);

  if (isActive) {
    if (clickedLinkObj && clickedLinkObj.subLinks) {
      subMenuEl.style.top = "100%"; // Show the submenu
      buildSubmenu(clickedLinkObj.subLinks);
    } else {
      subMenuEl.style.top = "0"; // Hide the submenu if no subLinks
      subMenuEl.innerHTML = ''; // Clear submenu content
      if (clickedLinkObj.text.toLowerCase() === 'about') {
        mainEl.innerHTML = `<h1>About</h1>`;
      }
    }
  } else {
    subMenuEl.style.top = "0"; // Hide the submenu when link becomes inactive
    subMenuEl.innerHTML = ''; // Clear submenu content
  }

});

function buildSubmenu(subLinks) {
  // Clear the current contents of subMenuEl
  subMenuEl.innerHTML = '';
  // Iterate over the subLinks array
  for (let link of subLinks) {
    // create a new <a> element
    let subLinkEl = document.createElement("a");
    // Set the href attribute of the <a> element
    subLinkEl.setAttribute("href", link.href);
    // Set the content of the <a> element
    subLinkEl.textContent = link.text;
    // Append the new <a> element to subMenuEl
    subMenuEl.appendChild(subLinkEl);
  }
 
  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`
  
}

subMenuEl.addEventListener("click", function (event) {
  event.preventDefault() // event.preventDefault() to prevent the default action of the <a> tag, which is navigating to a new page.

  //should immediately return if the element clicked was not an <a> element.
  if (!event.target.matches("a")) {
    return;
  }


  // Log the content of the <a> to verify the handler is working.
  console.log(event.target.textContent);
  // should set the CSS top property of subMenuEl to 0.
  subMenuEl.style.top = "0";
  // Remove the active class from each <a> element in topMenuLinks.
  topMenuLinks.forEach((link) => {
    link.classList.remove("active")
  });
 
  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`
  
  
 
});