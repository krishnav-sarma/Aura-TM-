const button = document.querySelector(".pushable");
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

// Add an event listener to the document or any specific element
document.addEventListener('mousemove', mouse_position);

function mouse_position(event) {
  const mouseX = document.getElementById("XC").textContent = event.clientX;
  const mouseY = document.getElementById("YC").textContent = event.clientY;
  
  const buttonOffset = getOffset(button);
  const buttonX = buttonOffset.left + (button.offsetWidth / 2);
  const buttonY = buttonOffset.top;

  const distance = calculateDistance(mouseX, mouseY, buttonX, buttonY);
  document.getElementById("DIS").textContent = distance;

  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");

  if (email.value !== "imgay" || password.value !== "confirm ho") {
    email.style.outline = "red";

    if (distance < 100) {
      const displacementFactor = (100 - distance) * 0.05;
      const perspectiveFactor = calculatePerspectiveFactor(buttonX, buttonY);

      targetX = -(mouseX - buttonX) * displacementFactor * perspectiveFactor;
      targetY = -(mouseY - buttonY) * displacementFactor * perspectiveFactor;
    } else {
      targetX = 0;
      targetY = 0;
    }
  } else {
    targetX = 0;
    targetY = 0;
    button.textContent = "ab thek";
  }
}

// Smooth animation loop
function smoothDisplacement() {
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  button.style.transform = `translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(smoothDisplacement);
}
smoothDisplacement();

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function calculateDistance(X, Y, x, y) {
  return Math.ceil(Math.sqrt((X - x) ** 2 + (Y - y) ** 2));
}

function calculatePerspectiveFactor(x, y) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const distanceFromCenter = Math.sqrt((x - screenWidth / 2) ** 2 + (y - screenHeight / 2) ** 2);
  const perspectiveFactor = 1 - distanceFromCenter / (Math.sqrt(screenWidth ** 2 + screenHeight ** 2) / 2);

  return perspectiveFactor;
}
