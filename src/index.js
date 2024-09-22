document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const input = document.querySelector("input");
    const url = input.value.trim();

    if (url === "") {
      alert("Por favor, digite a URL antes de gerar o QR Code.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.invertexto.com/v1/qrcode?token=15428%7CaSmwhFqA7cxY82hbFl7oegMLulArdNro&text=${url}%2F&scale=4`,
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

      const resultContainer = document.getElementById("result-container");
      resultContainer.innerHTML = "";
      resultContainer.appendChild(imgElement);
    } catch (error) {
      console.error("Erro ao processar requisição:", error);
      alert("Ocorreu um erro ao gerar o QR Code. Por favor, tente novamente.");
    }
  });
});
