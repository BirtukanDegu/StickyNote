export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;
 
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};