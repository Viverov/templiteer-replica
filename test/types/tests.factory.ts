import { INestApplication } from '@nestjs/common';

export type TestsFactory = (getApp: () => INestApplication) => void;
