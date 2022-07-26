import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getViewName(): string {
    return "index";
  }
  getHello(): string {
    return 'Hello World!';
  }
}
