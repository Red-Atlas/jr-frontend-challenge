import ArrowIcon from "../ui/icons/ArrowIcon";
import RedAtlasBrand from "../../assets/logo-red-atlas.png";
import { IProperty, PropertyStatus } from "../../interface/IProperty";
import Divider from "../ui/Divider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createFormSchema } from "../create/schema/create-form.schema";
import CustomInput from "../ui/CustomInput";
import useProperties from "../../hooks/useProperties";

interface EditPropertyModalContentProps {
  property: IProperty;
  handleEdit: () => void;
}

const EditPropertyModalContent = ({
  property,
  handleEdit,
}: EditPropertyModalContentProps) => {
  const { updateProperty } = useProperties();

  return (
    <div className="shadow-xl rounded-lg flex max-w-xl w-full">
      <div className="flex py-4 w-full bg-white rounded-lg flex-col items-center gap-3 relative">
        <button onClick={handleEdit} className="absolute top-2 left-2">
          <ArrowIcon className="fill-gray-950 w-12 h-12" />
        </button>
        <img src={RedAtlasBrand} alt="Red Atlas Brand" width={50} height={50} />
        <Divider text="Editar Propiedad" />
        <Formik
          initialValues={{
            title: property.title,
            address: property.address,
            status: property.status,
            type: property.type,
            price: property.price,
            description: property.description,
          }}
          validationSchema={createFormSchema}
          onSubmit={(values) => {
            updateProperty({
              ...values,
              price: Number(values.price),
              id: property.id,
            });
          }}
        >
          <Form className="w-full flex flex-col gap-6 px-3">
            <CustomInput
              id="title"
              placeholder="Titulo"
              className="border-b border-primary"
            />
            <CustomInput
              id="address"
              placeholder="Dirección"
              className="border-b border-primary"
            />
            <div className="w-full flex flex-col">
              <Field
                as="select"
                id="status"
                name="status"
                className="border-b border-primary p-3 focus:outline-none"
              >
                <option value="" label="Selecciona estado" />
                <option value={PropertyStatus.RENT} label="En Alquiler" />
                <option value={PropertyStatus.SALE} label="En Venta" />
              </Field>
              <ErrorMessage
                className="text-red-500 text-xs w-full"
                name="status"
                component="p"
              />
            </div>
            <CustomInput
              id="type"
              placeholder="Tipo"
              className="border-b border-primary"
            />
            <CustomInput
              id="price"
              placeholder="Precio"
              className="border-b border-primary"
            />
            <CustomInput
              id="description"
              placeholder="Descripción"
              className="border-b border-primary"
            />
            <button
              className="bg-primary text-white p-2 rounded mt-3 font-semibold"
              type="submit"
            >
              Editar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditPropertyModalContent;
