const getDeckID = async () => {
  const deckResponse = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle"
  );
  const deckData = await deckResponse.json();
  return deckData.deck_id;
};

const withdrawCard = async (deck_id) => {
  const cardResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck_id}/draw`
  );
  const cardData = await cardResponse.json();
  if (cardData.remaining === 1) {
    const drawButton = document.querySelector("button");
    drawButton.disabled = true;
    drawButton.classList.add("disabled");
  }
  return cardData;
};

const showCardInfo = async (deck_id) => {
  const cardData = await withdrawCard(deck_id);
  const image_url = cardData?.cards[0]?.image;
  // Create a new image element
  const newCardImage = document.createElement("img");
  newCardImage.src = image_url;
  newCardImage.classList.add("card-stack");

  // Append the new image to the body
  document.body.appendChild(newCardImage);

  // Apply rotation to the new image
  const rotationAngle = Math.random() * 20 - 10; // Random angle between -10 and 10 degrees
  newCardImage.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
};

async function main() {
  const deckId = await getDeckID();
  const drawButton = document.querySelector("button");
  drawButton.addEventListener("click", () => {
    showCardInfo(deckId);
  });
}

main();
