import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../enums/status.enum';

@Schema({
  timestamps: true,
})
export class EmailLog {
  @Prop({
    required: true,
  })
  studentId!: number;

  @Prop({
    required: true,
  })
  resultId!: number;

  @Prop({
    required: true,
  })
  email!: string;

  @Prop({
    enum: Status,
    required: true,
  })
  status!: Status;

  @Prop()
  errorMessage?: string;
}

export const EmailLogSchema = SchemaFactory.createForClass(EmailLog);
