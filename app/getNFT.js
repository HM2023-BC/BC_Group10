import contract from './BC_Group10/ether/web3.js';
import web3 from './BC_Group10/ether/web3.js';

async function getNFTInfo(searchField) {
    try {
      const result = await contract.methods.getNFTInfo(searchField).call();
      const id = result[0];
      const age = result[1];
      const name = result[2];
      const surname = result[3];
      const height = result[4];
      const eyeColor = result[5];
      const religion = result[6];
      const location = result[7];
      const eId = result[8];
      const issuanceDate = result[9];
      const expiryDate = result[10];
      const uri = result[11];
      document.getElementById("tokenIdDisplay").innerHTML = "NFT ID: " + id;
      document.getElementById("ageDisplay").innerHTML = "Alter: " + age;
      document.getElementById("nameDisplay").innerHTML = "Vorname: " + name;
      document.getElementById("surnameDisplay").innerHTML = "Nachname: " + surname;
      document.getElementById("heightDisplay").innerHTML = "Größe: " + height;
      document.getElementById("eyeColorDisplay").innerHTML = "Augenfarbe: " + eyeColor;
      document.getElementById("religionDisplay").innerHTML = "Religion: " + religion;
      document.getElementById("locationDisplay").innerHTML = "Wohnort: " + location;
      document.getElementById("eIdDisplay").innerHTML = "E-ID: " + eId;
      document.getElementById("issuanceDateDisplay").innerHTML = "Ausstellungsdatum: " + issuanceDate;
      document.getElementById("eIdDisplay").innerHTML = "Ablaufdatum: " + expiryDate;
     // document.getElementById("issuanceDateDisplay").innerHTML = "uri: " + uri;
      var nftImage = document.getElementById("nftImage");
      nftImage.src = uri;
      nftImage.style.display = "block";
      console.log("NFT Information:", result);
    } catch (error) {
      console.error("Error getting NFT information:", error);
    }
  }
  // Event Listener für das Formular zur NFT-Abfrage
  const getNFTInfoForm = document.getElementById("getNFTInfoForm");
  getNFTInfoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchField = document.getElementById("searchField").value;
    if (searchField) {
      getNFTInfo(searchField);
    } else {
      console.error("Please enter a search field.");
    }
  });