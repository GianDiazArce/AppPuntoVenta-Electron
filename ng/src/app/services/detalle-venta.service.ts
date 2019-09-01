import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class DetalleVentaService {
    public url;
    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
     }


    save(detalleVenta, token):Observable<any>{
        let params = "json=" + JSON.stringify(detalleVenta);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization',token);

        return this._http.post(this.url + 'detalle-venta', params, {headers});
    }

    delete(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization',token);
        return this._http.delete(this.url + 'detalle-venta/' + id, {headers});
    }
    
}