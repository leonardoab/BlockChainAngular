import { Observable } from "rxjs/Rx";

export abstract class BaseService{

    protected handleError(error: Response | any) {
        return Observable.throw(error);
    }

}
