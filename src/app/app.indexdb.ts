import { Component, Inject, Injectable } from "@angular/core";
import { WindowRef } from './app.windowref';

@Injectable()
export class IndexDBModal{
    constructor(private w : WindowRef){
               //prefixes of implementation that we want to test
             //   this.w = this.w.nativeWindow;
    this.w.indexedDB = this.w.indexedDB ||  this.w.mozIndexedDB ||  this.w.webkitIndexedDB ||  this.w.msIndexedDB;
     
    //prefixes of window.IDB objects
    this.w.IDBTransaction = this.w.IDBTransaction || this.w.webkitIDBTransaction || this.w.msIDBTransaction;
    this.w.IDBKeyRange = this.w.IDBKeyRange || this.w.webkitIDBKeyRange || this.w.msIDBKeyRange
     
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")    }
    var request = window.indexedDB.open("budget", 1);
    request.onerror = (event) => {
      console.log("error: ");
    };
    request.onsuccess = (event) => {
      this.db = request.result;
      return this;
    };
    request.onupgradeneeded = (event) => {
       this.db = event.target.result;
      var objectStore = this.db.createObjectStore("budget", {keyPath: "id"});
    }
    }
   db: any;    
 ngOnInIt(){
console.log(this);
 

}
IntiateDb(){
                   //prefixes of implementation that we want to test
             //   this.w = this.w.nativeWindow;
    this.w.indexedDB = this.w.indexedDB ||  this.w.mozIndexedDB ||  this.w.webkitIndexedDB ||  this.w.msIndexedDB;
     
    //prefixes of window.IDB objects
    this.w.IDBTransaction = this.w.IDBTransaction || this.w.webkitIDBTransaction || this.w.msIDBTransaction;
    this.w.IDBKeyRange = this.w.IDBKeyRange || this.w.webkitIDBKeyRange || this.w.msIDBKeyRange
     
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")    }
    var request = window.indexedDB.open("budget", 1);
    request.onerror = (event) => {
      console.log("error: ");
    };
    request.onsuccess = (event) => {
      this.db = request.result;
      return this;
    };
    request.onupgradeneeded = (event) => {
       this.db = event.target.result;
      var objectStore = this.db.createObjectStore("budget", {keyPath: "id"});
    }
}
 add = function(data): any {
     return new Promise((resolve, reject) => {
        var request = this.db.transaction(["budget"], "readwrite")
         .objectStore("budget")
         .add(data);
         request.onsuccess = (event) => {
                resolve("data has been added to your database.");
         }
         request.onerror = function(event) {         
                reject("Unable to add data is aready exist in your database! ");       
        }
     })
    
         
}

 update = function(data) {     
      return new Promise((resolve, reject) => {
     var request = this.db.transaction(["budget"], "readwrite")
         .objectStore("budget").openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if(cursor) {
        if(cursor.value.id === data.id){
        var updateData = data;
        var request = cursor.update(updateData);
        request.onsuccess = () => {
         resolve("data has been updated to your database.");
        } 
          request.onerror = () => {
         reject("data has been not updated to your database.");
        } 
        };
         cursor.continue();
    }
   
         }
 });
         
}

 read = function(dt) {
     return new Promise((resolve, reject) => {
        var transaction = this.db.transaction(["budget"]);
        var objectStore = transaction.objectStore("budget");
        var request = objectStore.get(dt);        
        request.onerror = (event) => {
            console.log("okkErr")
            reject([]);
        };
        request.onsuccess = (event) => {
            console.log("okkSucc")
          if(request.result)
            resolve(request.result|| []);
          // Do something with the request.result!
         else 
             resolve([]);
          
        };
     });
}

 readAll = function() {
        var objectStore = this.db.transaction("budget").objectStore("budget");
   var temp = [];
        objectStore.openCursor().onsuccess = (event) => {
          var cursor = event.target.result;
         
          if (cursor) {
                console.log(cursor.value.data);
                for(var x in cursor.value.data)
                    temp.push(cursor.value.data[x]);
                //alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
                cursor.continue();
          }
          else {
             // var display = new Display();
              console.dir(temp)
              //disp.showData(temp);
              //  alert("No more entries!");
          }
        };     
}
}