import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { SERVER_URLS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
    private url = environment.urlConf;

    constructor(private http: HttpClient) {
    }

    async saveConfig(config: any, uId: string) {
        return await this.deleteQuery(SERVER_URLS.fpnet.post_config + "/" + uId + ".json")
            .then(async (data: any) => {
                return await this.postQuery(SERVER_URLS.fpnet.post_config + "/" + uId + ".json", { "empresa": config })
                    .then((data: any) => {
                        return data;
                    }).catch(error => {
                        throw error;
                    });
            }).catch(error => {
                throw error;
            });        
    }

    async findConfigOf(uId: string) {
        return await this.getQuery(SERVER_URLS.fpnet.post_config + "/" + uId + ".json")
            .then(async (data: any) => {
                return data;
            }).catch(error => {
                throw error;
            });        
    }

    async getAllComments(){
      return await this.getQuery(SERVER_URLS.fpnet.post_comments + ".json")
            .then(async (data: any) => {
                return data;
            }).catch(error => {
                throw error;
            }); 
    }

    async postComment(comment){
      return await this.postQuery(SERVER_URLS.fpnet.post_comments + ".json", comment)
            .then(async (data: any) => {
              return await this.getQuery(SERVER_URLS.fpnet.post_comments + ".json")
                .then(async (data: any) => {
                    return data;
                }).catch(error => {
                    throw error;
                }); 
            }).catch(error => {
                throw error;
            }); 
    }

    async postQuery(url: string, body?: any) {
        // const user = UtilsService.readStorage("user");
        return new Promise((resolve, reject) => {
            this.http.post(url, body, { responseType: 'text'/*, headers: { 'authorization': user.token }*/}).subscribe((result) => {
                try {
                const json = JSON.parse(result);
                resolve(json);
                } catch (err) {
                resolve(result);
                }
            }, error => {
                reject(error);
            });
        });
    }

    async getQuery(url: string) {
        // const user = UtilsService.readStorage("user");
    
        return new Promise((resolve, reject) => {
            this.http.get(url, { responseType: 'text'}).subscribe((result) => {
              try {
                const json = JSON.parse(result);
                resolve(json);
              } catch (err) {
                resolve(result);
              }
            }, error => {
              if (error.status === 0) {
                throw error;
              } else {
                // throw error;
                reject(error);
              }
            });
        });
    }

    async deleteQuery(url: string) {
        // const user = UtilsService.readStorage("user");
    
        return new Promise((resolve, reject) => {
            this.http.delete(url, { responseType: 'text'}).subscribe((result) => {
              try {
                const json = JSON.parse(result);
                resolve(json);
              } catch (err) {
                resolve(result);
              }
            }, error => {
              if (error.status === 0) {
                throw error;
              } else {
                // throw error;
                reject(error);
              }
            });
        });
      }
    



}
