import { Component, OnInit } from '@angular/core';
import { VoliComponent } from 'src/app/model/voli-component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  componentList: VoliComponent[] = [
     {
      Name: "Teams",
      ShortDescription: "Chat application",
      ImgUrl: "https://media.tptg.co.uk/ignite_images/imagesource.php?image=6342.jpg&maxwidth=1303&maxheight=864",
      Description: "Chat application made by Microsoft",
      Active: true
    },
    {
      Name: "Acubiz",
      ShortDescription: "Expense management",
      ImgUrl: "https://www.forretningssystemer.dk/wp-content/uploads/2017/11/acubiz-500.png",
      Description: "Expenses, receipt handling, travel expenses, time registration and invoice management.",
      Active: true
    },
     {
      Name: "CLA REPLY",
      ShortDescription: "Hvidvaskloven",
      ImgUrl: "https://uploads-ssl.webflow.com/5e42c746489942680afe7d60/5e6605ad415f1e9aa54d78bf_openGraph.png",
      Description: "Vi har gjort det nemt at være hvidvask-compliant",
      Active: true
    },
     {
      Name: "Due Compliance",
      ShortDescription: "Fight money laundering",
      ImgUrl: "https://duecompliance.se/assets/banner_image-f9b8cec811edc2b20851452d8033250d66ae1b36ef14dab84404a68018a7e965.png",
      Description: "We are proud to have made it easy to be Compliant ",
      Active: true
    },
    {
      Name: "Salesforce",
      ShortDescription: "CRM",
      ImgUrl: "https://www.selligent.com/sites/default/files/images/laptop-salesforce.png",
      Description: "Connect to your customers in a whole new way with the world’s #1 CRM platform.",
      Active: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  tryLogin(){
    
  }

}
