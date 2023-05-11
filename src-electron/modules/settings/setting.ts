/**
 * Setting Library
 */

export default {
  getPlatform: async (): Promise<string> => {
    return process.platform;
  },

  getAppVersion: (): string => {
    return process.env.npm_package_version as string;
  }
}
