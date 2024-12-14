import { showToast } from "../components/alert/Toast";
import { Property } from "../interfaces/property.interface";

export const validateFormData = (formData: Partial<Property>) => {
  if (!formData.title || formData.title.trim() === "") {
    return showToast("error", "El campo titulo es requerido.");
  }

  if (!formData.address || formData.address.trim() === "") {
    return showToast("error", "El campo de dirección es requerido.");
  }

  if (!formData.type || formData.type.trim() === "") {
    return showToast("error", "El campo tipo de propiedad es requerido.");
  }

  if (formData.price === 0) {
    return showToast("error", "El precio debe ser mayor a 0.");
  }
};
