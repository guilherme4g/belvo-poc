import Client from 'belvo';
import belvoEnviroment from './belvo-enviroment';

class BelvoConnector {
  private readonly url: string = belvoEnviroment.url;
  private readonly secretId: string = belvoEnviroment.secretId;
  private readonly secretPassword: string = belvoEnviroment.secretPassword;
  client: null | Client = null;

  async connect(): Promise<Client> {
    if (this.client !== null) {
      return this.client;
    }

    console.log(this.secretId);
    console.log(this.secretPassword);
    console.log(this.url);

    this.client = new Client(this.secretId, this.secretPassword, this.url);

    await this.client.connect();

    return this.client;
  }
}

const belvoConnector = new BelvoConnector();

export { belvoConnector };
