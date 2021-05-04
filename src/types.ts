import { InputType, Field } from "type-graphql";

import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Session } from "express-session";

export type MyContext = {
  req: Request & { session?: Session & { userId?: number } };
  redis: Redis;
  res: Response;
};

@InputType()
export class EmailPasswordInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

interface FolderContents {
  folders: Folder[];
  files: File[];
}

export interface Folder {
  id: string;
  title: string;
  order: number;
  open: boolean;
  contents: FolderContents;
  editable: boolean;
}

export interface File {
  id: string;
  title: string;
  order: number;
  xml: string;
}
