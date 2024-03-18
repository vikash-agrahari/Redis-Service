import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityModule } from 'src/entity/entity.module';
import { RabbitMQ } from './rabbitmq.service';
import { Consumer } from './rabbitmq.consumer';
@Module({
  imports: [
    ConfigModule.forRoot(),
    EntityModule,
  ],
  providers: [RabbitMQ, Consumer, ConfigService],
})
export class RabbitModule implements OnModuleInit {
  constructor(private readonly rabbitMQ: RabbitMQ) {}

  async onModuleInit() {
    await this.rabbitMQ.createConnection();
  }
}
