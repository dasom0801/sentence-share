import { TextField, TextFieldProps, ThemeProvider } from '@mui/material';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { customTheme } from '../../utils';

const theme = customTheme();

export type InputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TextFieldProps & UseControllerProps<TFieldValues, TName>;

const Input = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: InputProp<TFieldValues, TName>
) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <ThemeProvider theme={theme}>
      <TextField
        {...props}
        {...field}
        error={!!error}
        helperText={error?.message || props.helperText}
      />
    </ThemeProvider>
  );
};

export default Input;
