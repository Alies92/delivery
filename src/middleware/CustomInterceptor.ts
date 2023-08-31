import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";

export interface Response<T> {
    data: T;
}

@Injectable()
export class CustomInterceptor<T> implements NestInterceptor<T, Response<T>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

        // return next.handle().pipe(
        //     map(data => {
        //         console.log(data.body);
        //         data: data.res;
        //         const response = {
        //             ...data,
        //             name: data.username
        //         }
        //         delete response.username;
        //         delete response.password;
        //         // console.log(response);


        //         return response;


        //     }));


        return next.handle().pipe(
            map((data) => {
                const response = {
                    ...data,
                    name: data.username
                }
                delete response.username;
                delete response.password;
                console.log(response.body);


                return response;

            })
        )
    }
}
