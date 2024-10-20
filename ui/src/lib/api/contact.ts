import { KyInstance } from "ky";

export const contactMe = async (
  api: KyInstance,
  data: { fromName: string; from: string; message: string }
): Promise<any> => {
  return api
    .post("contact", {
      json: {
        fromName: data.fromName,
        from: data.from,
        message: data.message,
      },
    })
    .json();
};
