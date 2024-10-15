import {
  useForm,
  SubmitHandler,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputMask from "react-input-mask";
import { ScriptProps } from "next/script";
import { Textarea } from "@/components/ui/textarea";

export type DynamicFormInputType =
  | "textarea"
  | "email"
  | "string"
  | "number"
  | "boolean"
  | "enum"
  | "unknown";

export type DynamicFormField = {
  label?: string;
  placeholder?: string;
  schema: ZodSchema<any>;
  mask?: string;
  maskChar?: string;
  type?: DynamicFormInputType;
};

interface DynamicFormProps<T extends FieldValues> {
  dFields: Record<string, DynamicFormField>;
  onSubmit: SubmitHandler<T>;
  formId: string;
  inlineFields?: (string[] | string)[];
}

export const DynamicForm = <T extends Record<string, any>>({
  dFields,
  onSubmit,
  formId,
  inlineFields = [],
}: DynamicFormProps<T>) => {
  const schema = z.object(
    Object.keys(dFields).reduce(
      (a, c) => ({ ...a, ...{ [c]: dFields[c].schema } }),
      {} as z.ZodRawShape
    )
  );

  const form = useForm<T>({
    resolver: zodResolver(schema),
  });

  const zodKeys = <T extends z.ZodTypeAny>(schema: T): string[] => {
    if (schema === null || schema === undefined) return [];
    if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional)
      return zodKeys(schema.unwrap());
    if (schema instanceof z.ZodArray) return zodKeys(schema.element);
    if (schema instanceof z.ZodObject) {
      const entries = Object.entries(schema.shape);
      return entries.flatMap(([key, value]) => {
        const nested =
          value instanceof z.ZodType
            ? zodKeys(value).map((subKey) => `${key}.${subKey}`)
            : [];
        return nested.length ? nested : [key];
      });
    }
    return [];
  };

  const fields = zodKeys(schema);

  const getFieldType = (field: any): DynamicFormInputType => {
    if (field instanceof z.ZodEffects) field = field._def.schema;
    if (field instanceof z.ZodString) return "string";
    if (field instanceof z.ZodNumber) return "number";
    if (field instanceof z.ZodBoolean) return "boolean";
    return "unknown";
  };

  const renderField = (
    field: ControllerRenderProps<FieldValues, string>,
    fieldName: string,
    fieldType: DynamicFormInputType,
    fieldProps: DynamicFormField
  ) => {
    const type = fieldProps.type || fieldType;
    switch (type) {
      case "email":
      case "number":
      case "string":
        return fieldProps?.mask ? (
          <InputMask
            type={fieldType === "string" ? "text" : "number"}
            id={"input-" + fieldName}
            {...form.register(field.name as Path<T>)}
            aria-invalid={form.formState.errors[fieldName] ? "true" : "false"}
            aria-describedby={`${fieldName}-error`}
            mask={fieldProps?.mask}
            maskChar={fieldProps?.maskChar}
          >
            {
              ((inputProps: ScriptProps) => (
                <Input
                  type="text"
                  id={"input-" + fieldName}
                  {...form.register(field.name as Path<T>)}
                  placeholder={fieldProps.placeholder}
                  aria-invalid={
                    form.formState.errors[fieldName] ? "true" : "false"
                  }
                  aria-describedby={`${fieldName}-error`}
                />
              )) as any
            }
          </InputMask>
        ) : (
          <Input
            type="text"
            id={"input-" + fieldName}
            placeholder={fieldProps.placeholder}
            {...form.register(field.name as Path<T>)}
            aria-invalid={form.formState.errors[fieldName] ? "true" : "false"}
            aria-describedby={`${fieldName}-error`}
          />
        );
      case "textarea":
        return <Textarea rows={4}></Textarea>;
      case "boolean":
      case "enum":
      case "unknown":
      default:
        return <></>;
    }
  };

  const formatField = (fieldName: string) => {
    const field = (schema as any).shape[fieldName];
    const fieldType = getFieldType(field);
    const fieldProps = dFields?.[fieldName];

    return (
      <FormField
        name={fieldName}
        key={fieldName}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="text-white" htmlFor={"input-" + fieldName}>
              {fieldProps.label || fieldName}
            </FormLabel>
            <FormControl>
              <>{renderField(field, fieldName, fieldType, fieldProps)}</>
            </FormControl>
            <FormMessage>
              {form.formState.errors[fieldName] && (
                <p id={`${fieldName}-error`} className="text-red-600 text-sm">
                  {(form.formState.errors[fieldName] as any).message}
                </p>
              )}
            </FormMessage>
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 py-2"
      >
        {inlineFields.length > 0
          ? inlineFields.map((rowFields, rowIndex) => (
              <div className="flex gap-4" key={`row-${rowIndex}`}>
                {(Array.isArray(rowFields) ? rowFields : [rowFields]).map(
                  formatField
                )}
              </div>
            ))
          : fields.map(formatField)}
      </form>
    </Form>
  );
};
