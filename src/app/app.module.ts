import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ManeuverComponent } from './maneuver/maneuver.component';
import { TalonComponent } from './talon/talon.component';
import { StockComponent } from './stock/stock.component';
import { FoundationComponent } from './foundation/foundation.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ManeuverComponent,
    TalonComponent,
    StockComponent,
    FoundationComponent,
   
   
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
