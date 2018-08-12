const formCustomer = [
  {
    id: 1,
    name: 'customer',
    input_name: 'name',
    className: 'inputSize-4',
    label: 'Nome Completo',
    type: 'text',
  },
  {
    id: 2,
    name: 'customer',
    input_name: 'email' ,
    className: 'inputSize-4',
    label: 'Email',
    type: 'text',
  },
]
const formBilling = [
  {
    id: 1,
    name: "billing",
    input_name: "zipcode",
    className: "inputSize-2",
    label: "Cep",
    type: "text",
    mask: "99999-999"
  },
  {
    id: 2,
    name: "billing",
    input_name: "street",
    className: "inputSize-3",
    label: "Rua",
    type: "text"
  },
  {
    id: 3,
    name: "billing",
    input_name: "street_number",
    className: "inputSize-1",
    label: "Número",
    type: "text"
  },
  {
    id: 4,
    name: "billing",
    input_name: "neighborhood",
    className: "inputSize-2",
    label: "Bairro",
    type: "text"
  },
  {
    id: 5,
    name: "billing",
    input_name: "city",
    className: "inputSize-2",
    label: "Cidade",
    type: "text"
  },
  {
    id: 6,
    name: "billing",
    input_name: "state",
    className: "inputSize-2",
    label: "Estado",
    type: "text"
  }
]
const formPayment = [
  {
    id: 1,
    input_name: "card_number",
    className: "inputSize-2",
    label: "Número Cartão",
    type: "text",
    placeholder: "**** **** **** ****",
    mask: "9999 9999 9999 9999"
  },
  {
    id: 2,
    input_name: "card_holder_name",
    className: "inputSize-2",
    label: "Titular",
    placeholder: "",
    type: "text"
  },
  {
    id: 3,
    input_name: "card_cvv",
    className: "inputSize-2",
    label: "CVV",
    type: "text",
    placeholder: "***",
    mask: "999"
  },
  {
    id: 4,
    input_name: "card_expiration_date",
    className: "inputSize-2",
    label: "Válidade",
    type: "text",
    placeholder: "**/**",
    mask: "99/99"
  }
]

export {
  formBilling,
  formCustomer,
  formPayment,
}