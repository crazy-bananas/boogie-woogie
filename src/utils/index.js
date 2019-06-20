/* global AWS */
import AWS from "aws-sdk";
const bucketName = "boogie-woogie-banana";
const identityPoolId = "us-east-1:55e2fe65-fb21-4158-b7ff-c588c1d94384";

// students: ap-northeast-1:131db146-e5b9-4f7b-8b58-d0c59e2deeaf
AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  })
});

const bucket = new AWS.S3({
  params: {
    Bucket: bucketName
  }
});

// const textDecoder = new TextDecoder("utf8");

// export function listObjects() {
//   const listObjects = new Promise((resolve, reject) => {
//     bucket.listObjects((error, data) => {
//       if (error) {
//         console.error("error: ", error);
//         return;
//       }

//       resolve(data.Contents);
//     });
//   });

//   return listObjects;
// }

export function getSingleObject(key) {
  const getSingleObject = new Promise((resolve, reject) => {
    bucket.getObject(
      {
        Bucket: bucketName,
        Key: key
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }

        resolve(data.Body.toString("base64"));
      }
    );
  });

  return getSingleObject;
}

export function saveObject(file) {
  const saveObject = new Promise((resolve, reject) => {
    bucket.putObject(
      {
        Key: file.name,
        Body: file,
        ACL: "public-read"
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }
        resolve(data);
      }
    );
  });
  return saveObject;
}
