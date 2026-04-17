export const ORDER_FORM_BASE = "https://homes.averyandbryant.com/order-forms";

export const ORDER_FORMS = {
  "real-estate": "01918da6-2d38-7375-8fe1-96d7d74f812a",
  builders: "01914ab4-8713-72aa-b503-63ed6d4a11a5",
  "airbnb-rentals": "01918dcc-0824-72a8-abbe-61a9c9d9edb1",
  "lot-land": "d6f632d8-1b59-4163-a63a-aeff8decce83",
  "multi-family": "01914ab7-5488-710c-b2c9-62a929eed936",
} as const;

export type Vertical = keyof typeof ORDER_FORMS;

export function orderFormUrl(vertical: Vertical): string {
  return `${ORDER_FORM_BASE}/${ORDER_FORMS[vertical]}`;
}
