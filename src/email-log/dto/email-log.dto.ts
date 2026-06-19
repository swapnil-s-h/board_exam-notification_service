import { ApiProperty } from '@nestjs/swagger';
import type { ObjectId } from 'mongoose';

enum Status {
  success = 'SUCCESS',
  failed = 'FAILED',
}

export class EmailLogDto {
  @ApiProperty({
    description: 'A unique identifier generated automatically by MongoDB',
    example: '6a1fd14b1f395ce8d166f25c',
  })
  _id!: ObjectId;

  @ApiProperty({
    description: 'Student Id',
    type: Number,
    example: 1,
  })
  studentId!: number;

  @ApiProperty({
    description: 'Result Id',
    type: Number,
    example: 1,
  })
  resultId!: number;

  @ApiProperty({
    description: 'Email',
    example: 'example@text.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Status - if email was sent or not',
    enum: Status,
    example: Status.success,
  })
  status!: Status;

  @ApiProperty({
    description: 'Timestamp at which log is created',
    type: Date,
    example: '2026-06-03T07:01:31.085+00:00',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Timestamp at which log is updated',
    type: Date,
    example: '2026-06-03T07:01:31.085+00:00',
  })
  updatedAt!: Date;
}
