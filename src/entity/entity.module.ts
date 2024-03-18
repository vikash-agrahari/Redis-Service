import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
import { schemaProviders } from 'src/schema/schema.provider';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...schemaProviders,
  ],
  exports: [
  ],
})
export class EntityModule {}
