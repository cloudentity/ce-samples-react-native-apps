const {randomBytes} = require('react-native-randombytes');
import {sha256} from 'react-native-sha256';

class CodeVerifier {
  private static verifier = '';

  private static generateVerifier(): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(32, (err: any, buffer: Buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(CodeVerifier.base64URLEncode(buffer));
        }
      });
    });
  }

  static async getVerifier() {
    if (!CodeVerifier.verifier) {
      CodeVerifier.verifier = await CodeVerifier.generateVerifier();
    }
    return CodeVerifier.verifier;
  }

  static async getCodeChallenge() {
    const verifier = await CodeVerifier.getVerifier();
    const sha = await sha256(verifier);
    return CodeVerifier.base64URLEncode(Buffer.from(sha, 'hex'));
  }

  private static base64URLEncode(buffer: Buffer) {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/[=]/g, '')
      .trim();
  }
}

export default CodeVerifier;
