import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const KEY = "12312312312312369312312312312312";
const IV = crypto.randomBytes(16);

export const encrypt = (data: any) => {
  console.log("Asdf", data);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  const encryptedData = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);

  return {
    iv: IV.toString("hex"),
    encryptedData: encryptedData.toString("hex"),
  };
};

export const decrypt = (data: { iv: string, encryptedData: any }) => {
  const iv = Buffer.from(data.iv, "hex");
  const encryptedData = Buffer.from(data.encryptedData, "hex");
  const unencryptedData = crypto.createDecipheriv(ALGORITHM, KEY, iv);

  return Buffer.concat([unencryptedData.update(encryptedData), unencryptedData.final()]).toString();
};
