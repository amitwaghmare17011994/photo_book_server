import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Dummy {
    return ({name:'amit waghmaressssss'});
  }
}
