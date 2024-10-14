import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
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

interface DynamicFormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  labels?: Record<string, string>;
  onSubmit: SubmitHandler<T>;
  formId: string;
}

export const DynamicForm = <T extends Record<string, any>>({
  schema,
  labels,
  onSubmit,
  formId,
}: DynamicFormProps<T>) => {
  // Hook de formulaire avec validation Zod
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

  // Fonction pour détecter le type de champ
  const getFieldType = (field: any): string => {
    if (field instanceof z.ZodString) return "string";
    if (field instanceof z.ZodNumber) return "number";
    if (field instanceof z.ZodBoolean) return "boolean";
    // Ajoute d'autres types Zod si nécessaire
    return "unknown";
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 py-2"
      >
        {fields.map((fieldName) => {
          const field = (schema as any).shape[fieldName];
          const fieldType = getFieldType(field);

          return (
            <FormField
              name={fieldName}
              key={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-white"
                    htmlFor={"input-" + fieldName}
                  >
                    {labels?.[fieldName] || fieldName}
                  </FormLabel>
                  <FormControl>
                    <>
                      {fieldType === "string" && (
                        <Input
                          type="text"
                          id={"input-" + fieldName}
                          {...form.register(field.name as Path<T>)}
                          aria-invalid={
                            form.formState.errors[fieldName] ? "true" : "false"
                          }
                          aria-describedby={`${fieldName}-error`}
                        />
                      )}
                      {fieldType === "number" && (
                        <Input
                          type="number"
                          id={"input-" + fieldName}
                          {...form.register(fieldName as Path<T>)}
                          aria-invalid={
                            form.formState.errors[fieldName] ? "true" : "false"
                          }
                          aria-describedby={`${fieldName}-error`}
                        />
                      )}
                    </>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors[fieldName] && (
                      <p
                        id={`${fieldName}-error`}
                        className="text-red-600 text-sm"
                      >
                        {(form.formState.errors[fieldName] as any).message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
          );
        })}
      </form>
    </Form>
  );
};
