export const Selectors = {
  part_number_input: 'input[name="part_number"]',
  description_input: 'textarea[name="description"]',
  select_field: ".react-select__input-container",
  input: ".css-mnn31",
};

export const today = new Date().toDateString();
export const todayForFill = new Date().toLocaleDateString("ru-RU");
export const time = new Date().toLocaleTimeString();
