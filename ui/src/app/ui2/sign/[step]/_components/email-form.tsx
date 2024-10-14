import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface FormData {
  email: string;
}

export const EmailForm = () => {
  const router = useRouter();
  const form = useForm<FormData>();

  const [error, setError] = useState("");

  const onSubmit = (data: FormData) => {
    console.log("Email Submitted: ", data.email);
    router.push("/ui2/sign/nom");
  };

  return (
    <Form {...form}>
      <form
        id="step-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 py-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white" htmlFor="email">
                Adresse Email
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@example.com"
                  className="bg-gray-800 text-white placeholder-gray-400"
                  {...form.register("email", {
                    required: "L'adresse email est obligatoire.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Veuillez entrer une adresse email valide.",
                    },
                  })}
                />
              </FormControl>
              {error && (
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
