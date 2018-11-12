import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container">
      <div id="forbidden">
        <div class="forbidden">
          <div class="forbidden-403">
            <h1>Oops!</h1>
          </div>
          <h2>Acesso não permitido!</h2>
        </div>
      </div>
    </div>
  `,
  styles: [`
  * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
  }

  #forbidden {
    position: relative;
    height: 100vh;
  }

  #forbidden .forbidden {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }

  .forbidden {
    max-width: 410px;
    width: 100%;
    text-align: center;
  }

  .forbidden .forbidden-403 {
    height: 280px;
    position: relative;
    z-index: -1;
  }

  .forbidden .forbidden-403 h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 230px;
    margin: 0px;
    font-weight: 900;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
            transform: translateX(-50%);
    background: url('../assets/bg.jpg') no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: cover;
    background-position: center;
  }

  .forbidden h2 {
    font-family: 'Montserrat', sans-serif;
    color: #000;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 0;
  }

  .forbidden p {
    font-family: 'Montserrat', sans-serif;
    color: #000;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 20px;
    margin-top: 0px;
  }

  .forbidden a {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    background: #0046d5;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 40px;
    color: #fff;
    font-weight: 700;
    -webkit-box-shadow: 0px 4px 15px -5px #0046d5;
            box-shadow: 0px 4px 15px -5px #0046d5;
  }

  @media only screen and (max-width: 767px) {
      .forbidden .forbidden-403 {
        height: 142px;
      }
      .forbidden .forbidden-403 h1 {
        font-size: 112px;
      }
  }
  `]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
