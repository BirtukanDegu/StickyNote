export const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    current.style.height = "auto"; 
    current.style.height = current.scrollHeight + "px"; 
}