
// deviceUtils.js
export const getDeviceInformation = () => {
    return new Promise((resolve) => {
        const deviceInfo = {
            deviceName: navigator.userAgentData ? navigator.userAgentData.brand : navigator.appName,
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            // uniqueDeviceNumber: 'DEV-' + Math.floor(Math.random() * 1000000),
        };

        resolve(deviceInfo);
    });
};

// // deviceUtils.js
// export const getDeviceInformation = () => {
//     return new Promise((resolve, reject) => {
//         const deviceInfo = {
//             deviceName: navigator.userAgentData ? navigator.userAgentData.brand : navigator.appName,
//             platform: navigator.platform,
//             userAgent: navigator.userAgent,
//             uniqueDeviceNumber: 'DEV-' + Math.floor(Math.random() * 1000000),
//             geolocation: {
//                 latitude: null,
//                 longitude: null,
//                 error: null
//             }
//         };

//         // Get geolocation if available
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     deviceInfo.geolocation.latitude = position.coords.latitude;
//                     deviceInfo.geolocation.longitude = position.coords.longitude;
//                     resolve(deviceInfo);
//                 },
//                 (error) => {
//                     deviceInfo.geolocation.error = error.message;
//                     resolve(deviceInfo);
//                 }
//             );
//         } else {
//             deviceInfo.geolocation.error = 'Geolocation not supported';
//             resolve(deviceInfo);
//         }
//     });
// };
