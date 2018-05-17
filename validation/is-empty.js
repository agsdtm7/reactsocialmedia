// this function will check empty undefined, object or string

// Before refactored
//  function isEmpty(value) {
//     return (
//       value === undefined ||
//       value === null ||
//       (typeof value === "object" && Object.keys(value).length === 0) ||
//       (typeof value === "string" && value.trim().length === 0)
//     );
//   }

// after refactor #1
// const isEmpty = value => {
//   return (      // return can be omitted since it is one-liner statement
//     value === undefined ||
//     value === null ||
//     (typeof value === "object" && Object.keys(value).length === 0) ||
//     (typeof value === "string" && value.trim().length === 0)
//   );
// };

// further refactor
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
