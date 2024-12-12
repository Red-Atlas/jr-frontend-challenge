import { Field, Formik, Form } from "formik";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/ui/CustomInput";
import Divider from "../components/ui/Divider";
import RedAtlasBrand from "../assets/logo-red-atlas.png";
import ArrowIcon from "../components/ui/icons/ArrowIcon";
import { PropertyStatus } from "../interface/IProperty";
import { createFormSchema } from "../components/create/schema/create-form.schema";
import useProperties from "../hooks/useProperties";
import { notificationService } from "../services/notification.service";

const CreateProperty = () => {
  const navigate = useNavigate();
  const {addProperty} = useProperties();

  return (
    <Modal>
      <div className="shadow-xl rounded-lg flex max-w-xl w-full">
        <div className="flex py-4 w-full bg-white rounded-lg flex-col items-center gap-3 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-2 left-2"
          >
            <ArrowIcon className="fill-gray-950 w-12 h-12" />
          </button>
          <img
            src={RedAtlasBrand}
            alt="Red Atlas Brand"
            width={50}
            height={50}
          />
          <Divider text="Agregar Propiedad" />
          <Formik
            initialValues={{
              title: "",
              address: "",
              status: "",
              type: "",
              price: "",
              description: "",
            }}
            validationSchema={createFormSchema}
            onSubmit={(values) => {
              notificationService.success("Propiedad añadida exitosamente");
              addProperty(values);
              navigate("/");
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
              <button className="bg-primary text-white p-2 rounded mt-3 font-semibold" type="submit">
                Agregar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProperty;
