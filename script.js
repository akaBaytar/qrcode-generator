const form = document.querySelector("form");
const userURL = document.querySelector("#user-url");
const img = document.querySelector("#qr-img");
const imgSize = document.querySelector("#img-size");
const downloadButton = document.querySelector(".download-button");

form.addEventListener("input", () => {
  if (userURL.value.length > 0) {
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${imgSize.value}&data=${userURL.value}`;
  } else {
    img.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=www.github.com/akabaytar";
  }
});

function fetchQR(url) {
  fetch(url)
    .then((response) => response.blob())
    .then((qr) => {
      let tempURL = URL.createObjectURL(qr);
      let a = document.createElement("a");
      a.href = tempURL;
      a.download = `${userURL.value + " QR Code.png"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

downloadButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetchQR(img.src);
});
