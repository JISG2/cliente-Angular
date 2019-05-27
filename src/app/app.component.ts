import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'campeones';
  campeon:FormGroup;
  campeones : any = []
  updateCampeon: FormGroup;
  idupdate:number;
  isEdit: boolean = false;

  constructor(private api: ApiService, private formBuilder : FormBuilder){
    this.actualizarCampeones()
    this.campeon = this.formBuilder.group({
      'nombre' : [''],
      'cantVida':[''],
      'cantArmadura':[''],
      'cantMR':[''],
      'carril':[''],
      'cantDamageI':['']
    });
    this.updateCampeon = this.formBuilder.group({
      'nombre' : [''],
      'cantVida':[''],
      'cantArmadura':[''],
      'cantMR':[''],
      'carril':[''],
      'cantDamageI':['']
    });
  }

  agregarCampeon(){
    console.log(JSON.stringify(this.campeon.value));
    this.api.createCampeon(this.campeon.value).subscribe(response =>{
      console.log(response);
      this.campeon.get("nombre").setValue("")
      this.campeon.get("cantVida").setValue("")
      this.campeon.get("cantArmadura").setValue("")
      this.campeon.get("cantMR").setValue("")
      this.campeon.get("carril").setValue("")
      this.campeon.get("cantDamageI").setValue("")
      this.actualizarCampeones()
    }, error =>{
      console.log(error)
    })

  }

  eliminarCampeon(id){
    this.api.deleteCampeon(id).subscribe(response =>{
      console.log(response)
      this.actualizarCampeones()
    }, error =>{
      console.log(error)
    })
  }

  updateChamp(campeon){
    this.idupdate = campeon.id
    this.updateCampeon.get("nombre").setValue(campeon.nombre)
    this.updateCampeon.get("cantVida").setValue(campeon.cantVida)
    this.updateCampeon.get("cantArmadura").setValue(campeon.cantArmadura)
    this.updateCampeon.get("cantMR").setValue(campeon.cantMR)
    this.updateCampeon.get("carril").setValue(campeon.carril)
    this.updateCampeon.get("cantDamageI").setValue(campeon.cantDamageI)
    this.isEdit=true;

  }

  actualizarCampeones(){
    this.api.getCampeones().subscribe(response =>{
      console.log(response);
      this.campeones = response
    }, error =>{
      console.log(error);
    })
  }
  actualizarCampeon(){
    this.api.updateChamp(this.updateCampeon.value,this.idupdate).subscribe(response =>{
      console.log(response)
      this.actualizarCampeones()
      this.isEdit=false;
    }, error =>{
      console.log(error)
    })
  }
}


