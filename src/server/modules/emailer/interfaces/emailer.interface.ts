export interface INodeMailer {
  service: string;
  host: string;
  auth: {
      user: string,
      pass: string
  };
}
