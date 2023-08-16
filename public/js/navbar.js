// This code adds an event listener to an HTML element with the ID 'dropdownToggle'
document
  .getElementById("dropdownToggle")
  .addEventListener("click", function () {
    // This line selects an HTML element with the class 'dropdown-content' and assigns it to the 'content' variable
    const content = document.querySelector(".dropdown-content");

    // This section checks the current display style of the 'content' element
    if (content.style.display === "block") {
      // If the display style is 'block', it means the content is currently visible
      // So, this line changes the display style to 'none' to hide the content
      content.style.display = "none";
    } else {
      // If the display style is not 'block' (which means it's hidden or some other value),
      // this section is executed and changes the display style to 'block' to show the content
      content.style.display = "block";
    }
  });
