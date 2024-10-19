import ky from "ky";

console.log("API URL : ", process.env.API_URL);

export default ky.create({
  prefixUrl: process.env.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //   hooks: {
  //     beforeRequest: [
  //       (request) => {
  //         if (session.data?.accessToken) {
  //           request.headers.set(
  //             "Authorization",
  //             `Bearer ${session.data.accessToken}`
  //           );
  //         }
  //       },
  //     ],
  //   },
});
