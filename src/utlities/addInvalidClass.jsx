const addInvalidClass = (element) => {
  if (!element.value) {
    element.parentNode.classList.add("form__label--invalid");
    element.classList.add("form__input--invalid");
  } else {
    element.parentNode.classList.remove("form__label--invalid");
    element.classList.remove("form__input--invalid");
  }
};

export { addInvalidClass };
