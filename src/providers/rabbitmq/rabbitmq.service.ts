import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, ConfirmChannel, Connection, Options } from 'amqplib';
import { ENUM } from 'src/common/enum';
import { Consumer } from './rabbitmq.consumer';

export let channels: any = {};

@Injectable()
export class RabbitMQ implements OnApplicationShutdown {
  private connection: Connection;

  constructor(private readonly configService: ConfigService, private readonly consumer: Consumer) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onApplicationShutdown(signal?: string | undefined) {
    if (this.connection) await this.connection.close();
  }

  async createConnection() {
    return new Promise<ConfirmChannel[]>(async (resolve, reject) => {
      try {
        console.log("inside try")
        const connectionOptions: Options.Connect = {
          hostname: 'localhost',
          port: 5672,
        };

        this.connection = await connect(connectionOptions);

        this.connection.on('error', async (err: any) => {
          console.error('[Rabbit MQ] Error in connection: ' + err.message);
        });

        this.connection.on('close', async (err: any) => {
          console.error('[Rabbit MQ] Connection close:' + err);
          await this.createConnection();
        });

        console.info('[Rabbit MQ] connecting!');

        channels = {};

        for await (const CHANNEL_NAME of Object.keys(ENUM.CHANNEL_TYPE)) {
          const channel = await this.connection.createConfirmChannel();
          console.info(
            `[Rabbit MQ] connecting! Channels connected ${CHANNEL_NAME} ${Object.keys(channels).length + 1}/${Object.keys(ENUM.CHANNEL_TYPE).length}`
          );
          await this.consumeQueues(channel, CHANNEL_NAME);
          channel.on('error', (err: any) => {
            console.error(`[Rabbit MQ] Error in channel ${CHANNEL_NAME}: ` + err.message);
          });
          channels[CHANNEL_NAME] = channel;
        }
        console.info('[Rabbit MQ] connected');
        resolve(channels);
      } catch (error) {
        console.error(`[Rabbit MQ] Error connecting ==> ${error}`);
        reject(error);
      }
    });
  }

  private async consumeQueues(channel: ConfirmChannel, routingKey: string) {
    try {
      const QUEUE: any = this.configService.get<string>('RABBIT_MQ_QUEUE') ?? 'demo_queue';
      await channel.assertExchange(QUEUE, 'direct', { durable: false });
      const q0 = await channel.assertQueue(QUEUE, { exclusive: false });
      channel.bindQueue(q0.queue, QUEUE, routingKey);
      this.consumer.startConsume(channel);
    } catch (error) {
      console.error(`[Rabbit MQ]  Error while consuming the queue ==> ${error}`);
    }
  }
}
