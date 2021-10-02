import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError, delay } from "rxjs/operators";
import { BusyService } from "../services/busy.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private router: Router, private toastr: ToastrService,private busyService: BusyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!req.url.includes('emailexists')){
        this.busyService.busy();
        }
        return next.handle(req).pipe(
            catchError(error => {
                if(error){
                    if(error.status === 400){
                        if(error.error.errors){
                            throw error.error;
                        }else{
                            this.toastr.error(error.error.message, error.error.statusCode);
                        }
                        
                    }
                    if(error.status === 401){
                        this.toastr.error(error.error.message, error.error.statusCode);
                    }
                    if(error.status === 404){
                        this.router.navigateByUrl('/not-found');
                    }
                    if(error.status === 500){
                        const navigateExtras: NavigationExtras = {state: {error: error.error }};
                        this.router.navigateByUrl('/server-error', navigateExtras);
                    }
                }
                return  throwError(error);
            })
        );
    }

}