import { IsString, IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export enum Type {
  'public',
  'private',
  'conversation',
}

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
  Title: string;

  @IsArray()
  @IsNotEmpty()
  members: string[];

  @IsString()
  @IsNotEmpty()
  @IsEnum(Type)
  type: string;

  @IsArray()
  @IsNotEmpty()
  badWords: string[];
}
