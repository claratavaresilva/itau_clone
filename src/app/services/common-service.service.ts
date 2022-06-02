import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getDropDownId(id: any, object: any) {
    const selObj = _.filter(object, function (o) {
      return _.includes(id, o.id);
    });
    return selObj;
  }
}
