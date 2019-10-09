const variables = {
  Api: {
    port: process.env.port || "8080"
  },
  Database: {
    connection:
      process.env.connection ||
      "mongodb+srv://weton01:Dragonite1@cluster0-dfrik.mongodb.net/test?retryWrites=true&w=majority"
  },
  Security: {
    secretKey: "e20bdb327fbf0ee17d296e21ea9fab75"
  }
};

module.exports = variables;
