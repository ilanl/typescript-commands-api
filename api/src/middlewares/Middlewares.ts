// import IDeviceRepository from "../devices/dao/IDeviceRepository";
// import DeviceRepository from "../devices/dao/DeviceRepository";

// var repository: IDeviceRepository = new DeviceRepository()

// export const registerModules = (app) => {
//         app.use(function(req, res, next) {
//             var end = res.end;
//             res.end = function(chunk, encoding){
//                 res.end = end;
//                 if (chunk) {
//                     console.log(chunk.toString());
//                 }
//                 res.end(chunk, encoding);
//             };
//             next();
//         });

//         app.use((req, res, next) => {
//             req["context"] = {
//                 repository
//             }
//             console.log(req.method, req.originalUrl);
//             if (Object.keys(req.body).length > 0) {
//                 console.log(req.body)
//             }
//             next()
//         })

//     }
// }
