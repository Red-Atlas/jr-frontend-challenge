import { IoIosCloseCircle } from "react-icons/io";
import "./CreateProperty.css";
import React from "react";
import { Property } from "../../types/types";
import { createProperty } from "../../services/createProperty";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

interface Props {
  onClose: () => void;
}

const CreatePropertyForm: React.FC<Props> = ({ onClose }) => {
  const initialValues: Property = {
    id: "500",
    address: "",
    title: "",
    description: "",
    location: { lat: 0, lng: 0 },
    images: ["https://dummyimage.com/800x600/cccccc/000000&text=Property+11"],
    type: "apartment",
    status: "sale",
    isActive: true,
    price: 0,
    area: 0,
    owner: { name: "", contact: "" },
  };

  //TODO:Mover a utils
  const validationSchema = Yup.object({
    address: Yup.string().required("La dirección es obligatoria"),
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    location: Yup.object({
      lat: Yup.number().required("La latitud es obligatoria"),
      lng: Yup.number().required("La longitud es obligatoria"),
    }),
    images: Yup.array()
      .of(Yup.string().url("Debe ser una URL válida"))
      .min(1, "Debes proporcionar al menos una imagen"),
    type: Yup.string()
      .oneOf(["apartment", "house"])
      .required("El tipo es obligatorio"),
    status: Yup.string()
      .oneOf(["sale", "rent"])
      .required("El estado es obligatorio"),
    isActive: Yup.boolean().required("Este campo es obligatorio"),
    price: Yup.number()
      .positive("El precio debe ser mayor que cero")
      .required("El precio es obligatorio"),
    area: Yup.number()
      .positive("El área debe ser mayor que cero")
      .required("El área es obligatoria"),
    owner: Yup.object({
      name: Yup.string().required("El nombre del propietario es obligatorio"),
      contact: Yup.string().required(
        "El contacto del propietario es obligatorio"
      ),
    }),
  });

  const handleSubmit = async (
    values: Property,
    { resetForm }: FormikHelpers<Property>
  ) => {
    try {
      await createProperty(values);
      console.log("Propiedad creada exitosamente");
      resetForm();
    } catch (error) {
      console.error("Error creando la propiedad:", error);
    }
  };

  return (
    <section id="modal-backdrop">
      <div className="bg-white w-[1000px] h-auto rounded p-4">
        <div className="flex flex-row justify-between items-center">
          <span className="text-2xl font-bold">Crear nueva propiedad</span>
          <button onClick={onClose}>
            <IoIosCloseCircle className="text-red" size={32} />
          </button>
        </div>

        <div className="form-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-10 mt-6">
                <div className="flex flex-col">
                  <label htmlFor="address" className="font-bold">
                    Dirección
                  </label>
                  <Field className="shadow-xl" type="text" name="address" />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="address"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="title">
                    Título
                  </label>
                  <Field className="shadow-xl" type="text" name="title" />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="title"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="description">
                    Descripción
                  </label>
                  <Field
                    className="shadow-xl"
                    as="textarea"
                    name="description"
                  />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="description"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="location.lat">
                    Latitud
                  </label>
                  <Field
                    className="shadow-xl"
                    type="number"
                    name="location.lat"
                  />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="location.lat"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="location.lng">
                    Longitud
                  </label>
                  <Field
                    className="shadow-xl"
                    type="number"
                    name="location.lng"
                  />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="location.lng"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="type">
                    Tipo
                  </label>
                  <Field className="shadow-xl" as="select" name="type">
                    <option value="">Selecciona un tipo</option>
                    <option value="apartment">Apartamento</option>
                    <option value="house">Casa</option>
                  </Field>
                  <ErrorMessage
                    className="text-red font-bold"
                    name="type"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="status">
                    Estado
                  </label>
                  <Field className="shadow-xl" as="select" name="status">
                    <option value="">Selecciona un estado</option>
                    <option value="sale">En venta</option>
                    <option value="rent">En renta</option>
                  </Field>
                  <ErrorMessage
                    className="text-red font-bold"
                    name="status"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="price">
                    Precio
                  </label>
                  <Field className="shadow-xl" type="number" name="price" />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="price"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="area">
                    Área
                  </label>
                  <Field className="shadow-xl" type="number" name="area" />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="area"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="owner.name">
                    Propietario
                  </label>
                  <Field className="shadow-xl" type="text" name="owner.name" />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="owner.name"
                    component="div"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold" htmlFor="owner.contact">
                    Contacto
                  </label>
                  <Field
                    className="shadow-xl"
                    type="text"
                    name="owner.contact"
                  />
                  <ErrorMessage
                    className="text-red font-bold"
                    name="owner.contact"
                    component="div"
                  />
                </div>

                <button
                  className="bg-red p-1 text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Crear Propiedad"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default CreatePropertyForm;
