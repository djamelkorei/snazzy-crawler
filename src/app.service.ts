import {Injectable} from '@nestjs/common';
import {map, Observable} from "rxjs";
import {HttpService} from "@nestjs/axios";
import {getTextFromHtml} from "./utils/parse";

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {
  }

  getHello(): Observable<string> {
    return this.httpService.get('https://djamelkorei.com')
        .pipe(map(response => response.data))
        .pipe(map(body => getTextFromHtml(body)))
  }

  test(): string {
    return
  }

}
