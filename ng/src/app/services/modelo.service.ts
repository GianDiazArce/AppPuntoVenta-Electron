import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class ModeloService {
    public url;
    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    getModelos():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'modelo', {headers});
    }
    getModelo(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'modelo/' + id, {headers});
    }
    save(modelo, token): Observable<any> {
        let params = "json=" + JSON.stringify(modelo);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.post(this.url + 'modelo', params, {headers});
    }
    update(id, modelo, token): Observable<any>{
        let params = "json=" + JSON.stringify(modelo);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.put(this.url + 'modelo/' + id, params, {headers});
    }
    delete(id, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.delete(this.url + 'modelo/' + id, {headers});
    }
    getModeloByMarca(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'modelo/marca/' + id, {headers});
    }

    updateStock(id, stock, token) : Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.get(this.url + 'modelo/' + id + '/' + stock, {headers});
    }

    
}