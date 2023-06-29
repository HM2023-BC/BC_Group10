import contract from './BC_Group10/ether/web3.js.js';
import web3 from './BC_Group10/ether/web3.js.js';

// Funktion zum Komprimieren des Bildes
function compressImage(file, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      // Skalieren, wenn das Bild die maximalen Abmessungen überschreitet
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      // Zeichnen des Bildes auf dem Canvas
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      // Konvertieren des Canvas-Bildes in das JPEG-Format mit der angegebenen Qualität
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const dataUrl = reader.result;
            resolve(dataUrl);
          };
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
// Funktion zur Erzeugung des NFTs und Zuweisung der ID
async function createNFT(
  age,
  name,
  surname,
  height,
  eyeColor,
  religion,
  location,
  eId,
  issuanceDate,
  image
) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const userAddress = accounts[0];
    // Komprimieren des Bildes
    const compressedImage = await compressImage(image, 800, 800, 0.8);
    const createNFTFunction = contract.methods.createNFT(
      age,
      name,
      surname,
      height,
      eyeColor,
      religion,
      location,
      eId,
      issuanceDate,
      compressedImage
    );
    const gas = await createNFTFunction.estimateGas({ from: userAddress });
    const transaction = await createNFTFunction.send({
      from: userAddress,
      gas,
    });
    if (transaction.status) {
      const receipt = await web3.eth.getTransactionReceipt(
        transaction.transactionHash
      );
      const events = contract.getPastEvents("NFTCreated", {
        fromBlock: receipt.blockNumber,
        toBlock: receipt.blockNumber,
      });
      if (events.length > 0) {
        const event = events[0].returnValues;
        const {
          id,
          age,
          name,
          surname,
          height,
          eyeColor,
          religion,
          location,
          eId,
          issuanceDate,
          expiryDate,
        } = event;
        console.log("NFT created with ID:", id);
        console.log("Age:", age);
        console.log("Name:", name);
        console.log("Surname:", surname);
        console.log("Height:", height);
        console.log("Eye Color:", eyeColor);
        console.log("Religion:", religion);
        console.log("Location:", location);
        console.log("E-ID:", eId);
        console.log("Issuance Date:", issuanceDate);
        console.log("Expiry Date:", expiryDate);
      }
    }
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}
// Event Listener für das Formular zum Erstellen des NFTs
const createNFTForm = document.getElementById("createNFTForm");
createNFTForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const age = document.getElementById("age").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const height = document.getElementById("height").value;
  const eyeColor = document.getElementById("eyeColor").value;
  const religion = document.getElementById("religion").value;
  const location = document.getElementById("location").value;
  const eId = document.getElementById("eId").value;
  const issuanceDate = document.getElementById("issuanceDate").value;
  const image = document.getElementById("image").files[0];
  if (image) {
    createNFT(age, name, surname, height, eyeColor, religion, location, eId, issuanceDate, image);
  } else {
    console.error("Please select an image file.");
  }
});