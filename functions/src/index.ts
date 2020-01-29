

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as firebaseFunctions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp();

enum FunctionType {
  Trigger,
  Call
}

interface FunctionObjectType {
  key: string;
  path: string;
  type: FunctionType;
  [key: string]: string | FunctionType;
}

const functionList: FunctionObjectType[] = [
  // { key: "createUser", path: "./createUser", type: FunctionType.Trigger },
  // { key: "createInvite", path: "./createInvite", type: FunctionType.Trigger },

  // { key: "sendSMSInvite", path: "./sendSMSInvite", type: FunctionType.Call },
  { key: "helloFunc", path: "./class/helloFunc", type: FunctionType.Trigger }
];

const load = (functions: FunctionObjectType[]) => {
  const functionName = process.env.FUNCTION_NAME;

  functions.forEach((f: FunctionObjectType) => {
    if (!functionName || functionName.startsWith(f.key)) {
      if (f.type === FunctionType.Trigger) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        module.exports[f.key] = require(f.path);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        module.exports[f.key] = firebaseFunctions
          .region("asia-northeast1")
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          .https.onCall(require(f.path));
      }
    }
  });
};

console.log("process.env.FUNCTION_NAME:", process.env.FUNCTION_NAME);
load(functionList);
console.log("exports:", exports);
