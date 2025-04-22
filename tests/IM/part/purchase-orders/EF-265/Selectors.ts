export const Selectors = {
  new_purchase_order_form: ".PurchaseOrderForm_container__2sBhd",
  select_fields: ".css-19bb58m",
  quantity_input: 'input[name="line_items\\[0\\]\\.quantity"]',
  unit_cost_input: 'input[name="line_items\\[0\\]\\.unit_cost"]',
  discount_input: 'input[name="discount"]',
  shipping_input: 'input[name="shipping"]',
  tax_input: 'input[name="tax"]',
  description_input: 'textarea[name="description"]',
};

export const today = new Date().toDateString();
export const time = new Date().toLocaleTimeString();
