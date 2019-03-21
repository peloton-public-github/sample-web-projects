import { Component, OnInit } from '@angular/core';
import { finalize, retry, map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { isTemplateElement } from 'babel-types';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;
  dataSource:any;
  displayedColumns:string[];
  activeEntityId:string;
  pokemonControl = new FormControl();
  allWells:Well[] = [];
  activeEntity:Well;
  availableTables:any;
  activeTable:any;
  hasData:boolean=true;

  constructor(private apiService: ApiService, private oauthService:OAuthService) {    
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(data=>{
      if (!this.oauthService.hasValidIdToken()) {
        this.oauthService.initImplicitFlow();
      }
    });
  }

  ngOnInit() {
    this.availableTables = [
      {name:'Inspection',value:'wvinspect'},
      {name:'Cement',value:'wvcement'},
      {name:'Casing',value:'wvcas'},
      {name:'Jobs',value:'wvjob'} 
    ];

    this.isLoading = true;    
    this.apiService
      .getdata('appframewebapi','wellview','wvwellheader')
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )      
      .subscribe((dataResult:any) => 
      {              
        dataResult.forEach((item:any) => {
          this.allWells.push({idrec:item.idwell, displayname: `${item.area} - ${item.basin} - ${item.country} - ${item.currentwellstatus1}`});
        });  
        this.allWells = this.allWells
                        .sort(function(a:Well,b:Well){
                            if (a.displayname<b.displayname) 
                              return -1;
                            else if (a.displayname>b.displayname) 
                              return 1; 
                            else return 0}
                        );
      });
  }
  loadWell(well:Well, activeTable:any){
    this.hasData = false;
    try{
      this.apiService
      .getbyentity('appframewebapi','wellview', activeTable.value, well.idrec)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(dataResult => 
      {
        this.dataSource = [];
        this.displayedColumns = [];
        this.displayedColumns = Object.getOwnPropertyNames(dataResult[0]); //Get Column Headers
        this.hasData = true;
        this.dataSource = dataResult;        
      });
    }
    catch{
      
    }
  }
}
