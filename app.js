let frases = [];

window.onload = async () => {
  const res = await fetch("frases.json");
  frases = await res.json();
  filtrarFrases();
};

function filtrarFrases() {
  const categoria = document.getElementById("categoriaSelect").value;
  const soGratis = document.getElementById("gratisCheckbox").checked;
  const lista = document.getElementById("listaFrases");

  lista.innerHTML = "";

  frases.forEach(frase => {
    if ((categoria === "" || frase.categoria === categoria) && (!soGratis || frase.acesso === "Grátis")) {
      const card = document.createElement("div");
      card.className = "frase-card";

      card.innerHTML = `
        <p>${frase.frase}</p>
        <small>Categoria: ${frase.categoria} | ${frase.acesso}</small>
        <button onclick="copiarFrase(\"${frase.frase.replace(/"/g, '&quot;')}\")">Copiar</button>
      `;

      lista.appendChild(card);
    }
  });
}

function copiarFrase(texto) {
  navigator.clipboard.writeText(texto);
  alert("Frase copiada!");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}