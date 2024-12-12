import * as Yup from "yup";

export const createFormSchema = Yup.object({
  title: Yup.string().required("Titulo es requerido"),
  address: Yup.string().required("Direccion es requerida"),
  status: Yup.string().required("Estado es requerido"),
  type: Yup.string().required("Tipo es requerido"),
  price: Yup.number()
    .required("Precio es requerido")
    .min(1, "El precio mínimo es 1"),
  description: Yup.string().required("Descripcion es requerido"),
});
