export const Selectors = {
  add_service_task: ".css-1yxmbwk",
  create_service_task_form: ".Block_block__U3GqW",
  input: ".css-mnn31",
  description: ".css-10oer18",
  system_code: ".react-select__input-container",
};

export const today = new Date().toDateString();
export const time = new Date().toLocaleTimeString();

export const expect_urls = [
  {
    url: "work-orders?status=open&tab=1",
  },
  {
    url: "work-orders?status=pending&tab=2",
  },
  {
    url: "work-orders?status=completed&tab=3",
  },
  {
    url: "work-orders?tab=0&status=",
  },
];
