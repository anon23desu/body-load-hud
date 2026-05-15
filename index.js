console.log("[Body Load HUD] TEST LOADED");

setTimeout(() => {
  const box = document.createElement("div");
  box.textContent = "BODY LOAD HUD TEST";
  box.style.position = "fixed";
  box.style.right = "20px";
  box.style.bottom = "20px";
  box.style.zIndex = "999999";
  box.style.background = "#1b1020";
  box.style.color = "#ffd6f4";
  box.style.border = "2px solid #ff9fe8";
  box.style.borderRadius = "12px";
  box.style.padding = "12px";
  box.style.fontSize = "16px";
  box.style.fontWeight = "bold";
  box.style.boxShadow = "0 0 20px #ff9fe866";
  document.body.appendChild(box);
}, 2000);
