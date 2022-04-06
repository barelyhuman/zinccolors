const copyCSSBtn = document.getElementById("copy-css");
const pallete = document.getElementById("pallete");
const colorCards = pallete.querySelectorAll(".card");

copyCSSBtn.addEventListener("click", () => {
  copy(`
:root{
    --zinc-50: #fafafa;
    --zinc-100: #f4f4f5;
    --zinc-200: #e4e4e7;
    --zinc-300: #d4d4d8;
    --zinc-400: #a1a1aa;
    --zinc-500: #71717a;
    --zinc-600: #52525b;
    --zinc-700: #3f3f46;
    --zinc-800: #27272a;
    --zinc-900: #18181b;
} 
    `);
});

for (let index = 0; index < colorCards.length; index++) {
  const element = colorCards[index];

  element.addEventListener("click", () => {
    const color = element.getAttribute("data-color").split("/")[0];
    copy(color);
  });
}

function copy(toCopy) {
  navigator.clipboard.writeText(toCopy).then(() => {
    toast(`Copied to clipboard`);
  });
}

function toast(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background: "var(--text)",
      color:"var(--surface)"
    },
  }).showToast();
}
