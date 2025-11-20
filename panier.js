let panier = [];
let total = 0;

function ajouterAuPanier(nom, prix) {
    panier.push({ nom, prix });
    total += prix;
    sauvegarderPanier();
    afficherPanier();
}

function afficherPanier() {
    const liste = document.getElementById("liste-panier");
    liste.innerHTML = "";
    panier.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nom} - ${item.prix} CFA`;

        // Bouton supprimer
        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = () => supprimerDuPanier(index);
        li.appendChild(btn);

        liste.appendChild(li);
    });

    document.getElementById("total").textContent = "Total : " + total + " CFA";
}

function supprimerDuPanier(index) {
    total -= panier[index].prix;
    panier.splice(index, 1);
    sauvegarderPanier();
    afficherPanier();
}

function sauvegarderPanier() {
    localStorage.setItem("panier", JSON.stringify(panier));
    localStorage.setItem("total", total);
}

function chargerPanier() {
    const panierSauvegarde = localStorage.getItem("panier");
    const totalSauvegarde = localStorage.getItem("total");
    if (panierSauvegarde) {
        panier = JSON.parse(panierSauvegarde);
        total = parseInt(totalSauvegarde);
        afficherPanier();
    }
}

// 🧍‍♀ Afficher le formulaire de commande
function passerCommande() {
    if (panier.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    document.getElementById("formulaire-commande").style.display = "block";
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// ✅ Valider la commande
function validerCommande() {
    const nom = document.getElementById("nom-client").value.trim();
    const adresse = document.getElementById("adresse-client").value.trim();
    const numero = document.getElementById("numero-client").value.trim();

    if (nom === "" || adresse === "" || numero === "") {
        alert("Veuillez remplir votre nom et votre adresse avant de valider.");
        return;
    }

    let recap = `🧾 Reçu de commande\n\n👤 Client : ${nom}\n📍 Adresse : ${adresse}\n\nArticles :\n`;
    panier.forEach(item => {
        recap += `- ${item.nom} : ${item.prix} CFA\n`;
    });
    recap += `\nTotal : ${total} CFA\n\nMerci pour votre achat 🛍`;

    alert(recap);

    // Réinitialiser le panier et le formulaire
    panier = [];
    total = 0;
    localStorage.clear();
    afficherPanier();
    document.getElementById("formulaire-commande").style.display = "none";
    document.getElementById("nom-client").value = "";
    document.getElementById("adresse-client").value = "";
    document.getElementById("numero-client").value = "";
}

// Charger le panier automatiquement à l'ouverture
window.onload = chargerPanier;