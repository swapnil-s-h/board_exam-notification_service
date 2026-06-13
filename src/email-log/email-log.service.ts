import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailLog } from './schemas/email-log.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmailLogService {
  constructor(
    @InjectModel(EmailLog.name)
    private readonly emailLogModel: Model<EmailLog>,
  ) {}

  async create(data: Partial<EmailLog>) {
    return this.emailLogModel.create(data);
  }

  async findByStudentId(id: number) {
    return this.emailLogModel.find({ studentId: id }).sort({ createdAt: -1 });
  }
}
