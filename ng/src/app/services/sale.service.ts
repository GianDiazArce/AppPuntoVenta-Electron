import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class SaleService {
    public url;
    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    getDetalleVentas(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'detalle-venta/venta/' + id, {headers})
    }
    saveVenta(venta, token): Observable<any>{
      let params = "json="+ JSON.stringify(venta);
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization',token);
      return this._http.post(this.url + 'venta' , params, {headers});
    }


    getVentas(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'venta', {headers});
    }
    getVentasByMes(mes, token): Observable <any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.get(this.url + 'venta/mes/' + mes, {headers});    
    }

    getVentasByDayAndMonth(day, month, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.get(this.url + 'venta/dia/' + day + '/' + month , {headers});
    }

    delete(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.delete(this.url + 'venta/' + id, {headers});
    }

    getVenta(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'venta/' + id, {headers});
    }
    
}