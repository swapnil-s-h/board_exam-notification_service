import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class EmailLog {
  @Prop()
  studentId!: number;

  @Prop()
  resultId!: number;

  @Prop()
  email!: string;

  @Prop()
  status!: string;

  @Prop()
  errorMessage?: string;

  @Prop()
  createdAt!: Date;
}
