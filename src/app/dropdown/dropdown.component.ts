import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import {noop} from "rxjs/util/noop"
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',  
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
 open: boolean = false;
 settings: any = {};
 texts:any;
 externalEvents: any;
 searchFilter: any;
 selectedModel: Array<any> = [];
 singleSelection: boolean;
 options: any;
  constructor() { 
    this.searchFilter = this.searchFilter || '';    
  }

  ngOnInit() {
    
    this.options  = [{ "name": "hello"}, {"name": "hi"}];
    this.settings = {
                    dynamicTitle: true,
                    scrollable: false,
                    scrollableHeight: '300px',
                    closeOnBlur: true,
                    displayProp: 'label',
                    idProp: 'name',
                    externalIdProp: 'name',
                    enableSearch: true,
                    selectionLimit: 0,
                    showCheckAll: true,
                    showUncheckAll: true,
                    closeOnSelect: false,
                    buttonClasses: 'btn btn-default',
                    closeOnDeselect: false,
                    groupBy:  undefined,
                    groupByTextProvider: null,
                    smartButtonMaxItems: 0,
                    smartButtonTextConverter: ''
                };
    this.texts = {
                    checkAll: 'Check All',
                    uncheckAll: 'Uncheck All',
                    selectionCount: 'checked',
                    selectionOf: '/',
                    searchPlaceholder: 'Search...',
                    buttonDefaultText: 'Select',
                    dynamicButtonTextSuffix: 'checked'
                };
                console.log(noop);
                   this.externalEvents = {
                    onItemSelect: noop,
                    onItemDeselect: noop,
                    onSelectAll: noop,
                    onDeselectAll: noop,
                    onInitDone: noop,
                    onMaxSelectionReached: noop
                };
                this.singleSelection = this.settings.selectionLimit === 1;
  }
toggleDropdown(){
  this.open = !this.open;
}
  getPropertyForObject(object, property) {
         console.log("object", object)
         console.log("property", property)
                    if (object && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };
       getFindObj(id) {
                    var findObj = {};

                    if (this.settings.externalIdProp === '') {
                        findObj[this.settings.idProp] = id;
                    } else {
                        findObj[this.settings.externalIdProp] = id;
                    }

                    return findObj;
                }
                    clearObject(object) {
                    for (let prop in object) {
                        delete object[prop];
                    }
                }
    setSelectedItem(id, dontRemove) {  console.log(id)
                    if(id === "") return;
                    var findObj = this.getFindObj(id);
                    var finalObj = null;

                    if (this.settings.externalIdProp === '') {
                        finalObj = _.find(this.options, findObj);
                    } else {
                        finalObj = findObj;
                    }

                    if (this.singleSelection) {
                        this.clearObject(this.selectedModel);
                     //   angular.extend(this.selectedModel, finalObj);
                        //this.externalEvents.onItemSelect(finalObj);

                        return;
                    }

                    dontRemove = dontRemove || false;

                    var exists = _.findIndex(this.selectedModel, findObj) !== -1;

                    if (!dontRemove && exists) {
                        this.selectedModel.splice(_.findIndex(this.selectedModel, findObj), 1);
                    //    this.externalEvents.onItemDeselect(findObj);
                    } else if (!exists && (this.settings.selectionLimit === 0 || this.selectedModel.length < this.settings.selectionLimit)) {
                        this.selectedModel.push(finalObj);
                     //   this.externalEvents.onItemSelect(finalObj);
                    }
                }
        isChecked = function (id) {
                    if (this.singleSelection) {
                        return this.selectedModel !== null && this.selectedModel[this.settings.idProp] !== undefined && this.selectedModel[this.settings.idProp] === this.getFindObj(id)[this.settings.idProp];
                    }

                    return _.findIndex(this.selectedModel, this.getFindObj(id)) !== -1;
                };


}
