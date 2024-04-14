//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
  const colorBoard = document.getElementById("colorBoard");

  // Create 800 squares dynamically
  for (let i = 0; i < 800; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    
    // Attach event listener to each square
    square.addEventListener("mouseover", function () {
      // Change background color on hover
      square.style.backgroundColor = getRandomColor();
      
      // Reset color after 1 second
      setTimeout(() => {
        square.style.backgroundColor = "black";
      }, 1000);
    });

    colorBoard.appendChild(square);
  }

  // Function to generate a random color
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});