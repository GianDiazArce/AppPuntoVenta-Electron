import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable, Observer } from 'rxjs';
import { ShoppingCart } from '../models/shopping-car';
import { StorageService } from './storage.service';
import { Modelo } from '../models/modelo';
import { CartItem } from '../models/car_item';
import { ModeloService } from './modelo.service';

const CART_KEY = "shopcar";
@Injectable()
export class VentaService {

    public url;
    public carrito;
    public shopcar;
    public countModelsShopCar;
    private storage: Storage;
    private products: Modelo[];

    
    private subscriptionObservable: Observable<ShoppingCart>;
    private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();

    constructor(
        private _http: HttpClient,
        private storageService: StorageService,
        private _modeloService: ModeloService
        
    ) { 
        this.url = global.url;
        this.countModelsShopCar = 0;
        this.storage = this.storageService.get();
        this._modeloService.getModelos().subscribe((products) => this.products = products);
        this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
            this.subscribers.push(observer);
            observer.next(this.retrieve());
            return () => {
              this.subscribers = this.subscribers.filter((obs) => obs !== observer);
            };
          });
    }

    getVentas(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'venta', {headers});
    }

    getDetalleVentas(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'detalle-venta/venta/' + id, {headers})
    }

    // Indentando hacer el carrito
    public get(): Observable<ShoppingCart> {
        return this.subscriptionObservable;
    }

    /*
    addProduct(model, cant, price): void{
        let sc = {'modelo' : model, 'quantity': cant, 'price': price};
        localStorage.setItem('shopcar', JSON.stringify(sc));
    }
    getShopCar(){
        let shopcar = JSON.parse(localStorage.getItem('shopcar'));
        this.shopcar = shopcar;
        console.log(shopcar);
        console.log(this.shopcar);
        return this.shopcar;
    }*/

    public addItem(product: Modelo, quantity: number, price: number): void {        
        const cart = this.retrieve();
        let item = cart.items.find((p) => p.productId === product.id);
        if (item === undefined) {
          item = new CartItem();
          item.productId = product.id;
          item.modelo = product
          item.price = price;
          cart.items.push(item);
        }
    
        item.quantity += quantity;
        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);        
    
        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);
      }
    
      public empty(): void {
        const newCart = new ShoppingCart();
        this.save(newCart);
        this.dispatch(newCart);
      }
    
      

    
    private calculateCart(cart: ShoppingCart): void {
        cart.itemsTotal = cart.items
                              .map((item) => item.quantity * item.price)
                              .reduce((previous, current) => previous + current, 0);
        
        
      }
    
      private retrieve(): ShoppingCart {
        const cart = new ShoppingCart();
        const storedCart = this.storage.getItem(CART_KEY);
        if (storedCart) {
          cart.updateFrom(JSON.parse(storedCart));
        }
    
        return cart;
      }
    
      private save(cart: ShoppingCart): void {
        this.storage.setItem(CART_KEY, JSON.stringify(cart));
      }
    
      private dispatch(cart: ShoppingCart): void {
        this.subscribers
            .forEach((sub) => {
              try {
                sub.next(cart);
              } catch (e) {
                // we want all subscribers to get the update even if one errors.
              }
            });
      }
    
}