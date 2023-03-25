import React from 'react';
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const inputFields = ['input1', 'input2', 'input3', 'input4'];

const schema = yup.object().shape({
  input1: yup.string().required(),
  input2: yup.number().required(),
  input3: yup.string().email().required(),
  input4: yup.string().min(5).required(),
});

export default function App() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { input1: '', input2: '', input3: '', input4: '' },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInputs />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

function NestedInputs() {
  const { control } = useFormContext();
  const fields = inputFields.map((name) => {
    const { field, fieldState } = useController({ name, control });
    return { field, fieldState };
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={index}>
          <input {...field.field} />
          {field.fieldState.error && (
            <div style={{ color: 'red' }}>{field.fieldState.error.message}</div>
          )}
        </div>
      ))}
    </>
  );
}
