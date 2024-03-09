// import React from "react";
// import { render, waitFor } from "@testing-library/react-native";
// import Home from "../../components/Home/Home";
// import StorageService from "../../services/StorageService";
// import LocationService from "../../services/LocationService";
// import WeatherDisplay from "../../components/WeatherDisplay/WeatherDisplay";

// jest.mock("../../services/StorageService", () => ({
//   get: jest.fn(() => Promise.resolve(null)),
//   set: jest.fn(() => Promise.resolve(null)),
// }));

// jest.mock("../../services/LocationService", () => ({
//   getCurrentLocation: jest.fn(() =>
//     Promise.resolve({ latitude: 0, longitude: 0 })
//   ),
// }));

// jest.mock("../../components/WeatherDisplay/WeatherDisplay", () =>
//   jest.fn(() => null)
// );

// describe("Home", () => {
//   it("calls StorageService.get with 'Show'", async () => {
//     render(<Home />);
//     await waitFor(() =>
//       expect(StorageService.get).toHaveBeenCalledWith("Show")
//     );
//   });

//   describe("when is the first time open app", () => {
//     beforeEach(() => {
//       render(<Home />);
//     });

//     it("Get the actual possition", async () => {
//       await waitFor(() => {
//         expect(LocationService.getCurrentLocation).toHaveBeenCalled();
//       });
//     });

//     it("calls StorageService.set with 'Show', 'Home'", async () => {
//       await waitFor(() =>
//         expect(StorageService.set).toHaveBeenCalledWith("Show", "Home")
//       );
//     });

//     it("calls StorageService.set with 'Home', locationData", async () => {
//       const locationData = { latitude: 0, longitude: 0 };
//       await waitFor(() =>
//         expect.arrayContaining([
//           expect.arrayContaining([["Home", locationData]]),
//         ])
//       );
//     });

//     it("calls WeatherDisplay with latitude: 0, longitude: 0", async () => {
//       await waitFor(() => {
//         expect(WeatherDisplay.mock.calls).toEqual(
//           expect.arrayContaining([
//             expect.arrayContaining([
//               expect.objectContaining({
//                 latitude: 0,
//                 longitude: 0,
//               }),
//             ]),
//           ])
//         );
//       });
//     });
//   });

//   describe("when the Show was set", () => {
//     beforeEach(() => {
//       const mockValues = {
//         Show: Promise.resolve("Home"),
//         Home: Promise.resolve({ latitude: 10, longitude: 10 }),
//         Home2: Promise.resolve({ latitude: 20, longitude: 0 }),
//       };

//       StorageService.get.mockImplementation(
//         (param) => mockValues[param] || Promise.resolve(null)
//       );
//       render(<Home />);
//     });

//     describe("when the show is 'Home'", () => {
//       describe("if the data of show location is null on the double check ", () => {
//         beforeEach(() => {
//           LocationService.getCurrentLocation.mockImplementation(() => ({
//             latitude: 0,
//             longitude: 0,
//           }));
//         });

//         it("Get the actual possition", async () => {
//           await waitFor(() => {
//             expect(LocationService.getCurrentLocation).toHaveBeenCalled();
//           });
//         });

//         it("calls StorageService.set with 'Show', 'Home'", async () => {
//           await waitFor(() =>
//             expect(StorageService.set).toHaveBeenCalledWith("Show", "Home")
//           );
//         });

//         it("calls StorageService.set with 'Home', locationData", async () => {
//           const locationData = { latitude: 0, longitude: 0 };
//           await waitFor(() =>
//             expect(StorageService.set).toHaveBeenCalledWith(
//               "Home",
//               locationData
//             )
//           );
//         });

//         it("calls WeatherDisplay with latitude: 0, longitude: 0", async () => {
//           await waitFor(() =>
//             expect(WeatherDisplay).toHaveBeenCalledWith(
//               expect.objectContaining({
//                 latitude: 0,
//                 longitude: 0,
//               }),
//               {}
//             )
//           );
//         });
//       });

//       describe("if the data of show location its ok", () => {
//         it("calls StorageService.set with 'Home', locationData", async () => {
//           const locationData = { latitude: 10, longitude: 10 };
//           await waitFor(() =>
//             expect.arrayContaining([
//               expect.arrayContaining([["Home", locationData]]),
//             ])
//           );
//         });

//         it("calls WeatherDisplay with latitude: 10, longitude: 10", async () => {
//           await waitFor(() => {
//             expect(WeatherDisplay.mock.calls).toEqual(
//               expect.arrayContaining([
//                 expect.arrayContaining([
//                   expect.objectContaining({
//                     latitude: 10,
//                     longitude: 10,
//                   }),
//                 ]),
//               ])
//             );
//           });
//         });
//       });
//     });
//   });
// });
