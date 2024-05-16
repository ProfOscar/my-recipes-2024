import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc, deleteDoc } from 'firebase/firestore/lite';
import { RecipeModel } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';

// Firebase configuration from https://console.firebase.google.com/project/profoscar-myrecipes-2024
const firebaseConfig = {
  apiKey: "AIzaSyAwDfw5q7_efcV2Ym-fGWlVojQGNi2IxXQ",
  authDomain: "profoscar-myrecipes-2024.firebaseapp.com",
  projectId: "profoscar-myrecipes-2024",
  storageBucket: "profoscar-myrecipes-2024.appspot.com",
  messagingSenderId: "342326676193",
  appId: "1:342326676193:web:29af0566582ff5071cc5a0"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BASE_URL = "https://profoscar-myrecipes-2024-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient) { }

  storeRecipes(recipes: RecipeModel[]) {
    return this.httpClient.put(BASE_URL, recipes);
  }

  fetchRecipes() {
    return this.httpClient.get(BASE_URL);
  }

  public async inviaRichiesta(method: string, resource: string, params: any = {}): Promise<any> {
    let aus = resource.split("/");
    resource = aus[1];
    let id = aus[2];
    switch (method.toLowerCase()) {
      case 'get':
        let data;
        if (id) {
          const snaphot = await getDoc(doc(db, resource, id));
          data = { ...snaphot.data(), "_id": id };
        } else {
          const myCollection = collection(db, resource);
          const snaphot = await getDocs(myCollection)
          data = snaphot.docs.map((doc => { return ({ ...doc.data(), "_id": doc.id }) }));
        }
        return data;
      case 'post':
        // Object.assign({}, params) converte l'oggetto tipizzato RecipeModel in un map semplice adatto a Firestore
        return addDoc(collection(db, resource), Object.assign({}, params));
      case 'patch':
        // structuredClone(params) funziona come Object.assign({}, params) ma è più recente e meno supportato da vecchi browser
        return setDoc(doc(db, resource, id), structuredClone(params), { merge: true });
      case 'put':
        return setDoc(doc(db, resource, id), structuredClone(params), { merge: false });
      case 'delete':
        return deleteDoc(doc(db, resource, id));
      default:
        return undefined;
    }
  }

}
