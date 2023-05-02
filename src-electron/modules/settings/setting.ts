/**
 * Setting Library
 */

export default {
  getPlatform: async () :Promise<string> => {
    return process.platform;
  },
}
