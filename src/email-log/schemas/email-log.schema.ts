import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    required: true,
  })
  status!: string;

  @Prop()
  errorMessage?: string;
}

export const EmailLogSchema = SchemaFactory.createForClass(EmailLog);
