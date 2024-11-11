document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.getElementById("url-input");
  const button = document.getElementById("generate-btn");
  const iframe = document.getElementById("site-preview");
  const resultContainer = document.getElementById("result-container");
  const previewContainer = document.getElementById("preview-container");

  function isValidUrl(url) {
    const urlPattern = /^(https?:\/\/)/;
    return urlPattern.test(url);
  }

  input.addEventListener("input", function () {
    button.disabled = input.value.trim() === "";
  });

  button.addEventListener("mouseover", function () {
    if (button.disabled) {
      button.title = "Digite uma URL antes de gerar o QR Code";
    } else {
      button.title = "";
    }
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const url = input.value.trim();

    if (!isValidUrl(url)) {
      alert(
        "Por favor, digite uma URL válida que comece com 'http://' ou 'https://'."
      );
      return;
    }

    try {
      iframe.src = url;
      previewContainer.classList.remove("hidden");

      const response = await fetch(
        `https://api.invertexto.com/v1/qrcode?token=15428%7CaSmwhFqA7cxY82hbFl7oegMLulArdNro&text=${encodeURIComponent(
          url
        )}&scale=4`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao gerar QR Code: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = "QR Code";

      resultContainer.innerHTML = "";
      resultContainer.appendChild(imgElement);
      resultContainer.classList.remove("hidden"); // Exibe o QR Code
    } catch (error) {
      console.error("Erro ao processar requisição:", error);
      alert("Ocorreu um erro ao gerar o QR Code. Por favor, tente novamente.");
    }
  });
});
