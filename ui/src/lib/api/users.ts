import { KyInstance } from "ky";

export const registerUser = async (
  api: KyInstance,
  email: string
): Promise<any> => {
  return api
    .post("users/register", {
      json: { email },
    })
    .json();
};

export const confirmEmail = async (
  api: KyInstance,
  userId: string,
  code: string
): Promise<any> => {
  return api
    .post("users/confirm-email", {
      json: { userId, code },
    })
    .json();
};

export const updateUser = async (
  api: KyInstance,
  userId: string,
  details: any
): Promise<any> => {
  return api
    .post("users/update-user", {
      json: { userId, details },
    })
    .json();
};

export const confirmPhone = async (
  api: KyInstance,
  userId: string,
  code: string
) => {
  return api
    .post("users/confirm-phone", {
      json: {
        userId,
        code,
      },
    })
    .json();
};
