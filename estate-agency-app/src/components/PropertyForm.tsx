import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles/PropertyForm.scss";

type FormData = {
  address: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  type: string;
  status: string;
  price: number;
  area: number;
  owner: {
    name: string;
    contact: string;
  };
};

type PropertyFormProps = {
  onSubmit: SubmitHandler<FormData>;
  defaultValues?: FormData;
};

const PropertyForm: React.FC<PropertyFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="property-form"
      noValidate
    >
      <label>
        Dirección:
        <input
          {...register("address", {
            required: "La dirección es obligatoria.",
            minLength: 5,
            maxLength: 100,
          })}
        />
        {errors.address && (
          <span className="error">{errors.address.message}</span>
        )}
      </label>

      <label>
        Título:
        <input
          {...register("title", {
            required: "El título es obligatorio.",
            minLength: 5,
            maxLength: 50,
          })}
        />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </label>

      <label>
        Descripción:
        <textarea
          {...register("description", {
            required: "La descripción es obligatoria.",
            minLength: 10,
            maxLength: 500,
          })}
        />
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}
      </label>

      <label>
        Latitud:
        <input
          type="number"
          {...register("location.lat", {
            required: "La latitud es obligatoria.",
            min: { value: -90, message: "Latitud mínima: -90" },
            max: { value: 90, message: "Latitud máxima: 90" },
          })}
        />
        {errors.location?.lat && (
          <span className="error">{errors.location.lat.message}</span>
        )}
      </label>

      <label>
        Longitud:
        <input
          type="number"
          {...register("location.lng", {
            required: "La longitud es obligatoria.",
            min: { value: -180, message: "Longitud mínima: -180" },
            max: { value: 180, message: "Longitud máxima: 180" },
          })}
        />
        {errors.location?.lng && (
          <span className="error">{errors.location.lng.message}</span>
        )}
      </label>

      <label>
        Tipo:
        <select {...register("type", { required: "El tipo es obligatorio." })}>
          <option value="">Seleccione un tipo</option>
          <option value="apartment">Apartamento</option>
          <option value="house">Casa</option>
          <option value="land">Terreno</option>
          <option value="office">Office</option>
        </select>
        {errors.type && <span className="error">{errors.type.message}</span>}
      </label>

      <label>
        Estado:
        <select
          {...register("status", { required: "El estado es obligatorio." })}
        >
          <option value="">Seleccione un estado</option>
          <option value="sale">Venta</option>
          <option value="rent">Alquiler</option>
        </select>
        {errors.status && (
          <span className="error">{errors.status.message}</span>
        )}
      </label>

      <label>
        Precio:
        <input
          type="number"
          {...register("price", {
            required: "El precio es obligatorio.",
            min: { value: 1, message: "El precio debe ser al menos 1." },
            max: {
              value: 100000000,
              message: "El precio no puede exceder 100,000,000.",
            },
          })}
        />
        {errors.price && <span className="error">{errors.price.message}</span>}
      </label>

      <label>
        Área (m²):
        <input
          type="number"
          {...register("area", {
            required: "El área es obligatoria.",
            min: { value: 10, message: "El área debe ser al menos 10 m²." },
            max: {
              value: 10000,
              message: "El área no puede exceder 10,000 m².",
            },
          })}
        />
        {errors.area && <span className="error">{errors.area.message}</span>}
      </label>

      <label>
        Nombre del Propietario:
        <input
          {...register("owner.name", {
            required: "El nombre del propietario es obligatorio.",
            minLength: {
              value: 2,
              message: "Debe tener al menos 2 caracteres.",
            },
            maxLength: {
              value: 50,
              message: "No puede exceder 50 caracteres.",
            },
          })}
        />
        {errors.owner?.name && (
          <span className="error">{errors.owner.name.message}</span>
        )}
      </label>

      <label>
        Contacto del Propietario:
        <input
          {...register("owner.contact", {
            required: "El contacto del propietario es obligatorio.",
          })}
        />
        {errors.owner?.contact && (
          <span className="error">{errors.owner.contact.message}</span>
        )}
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default PropertyForm;
