import ky from "ky";

export default ky.create({
  prefixUrl: "http://localhost:3000/api/",
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
